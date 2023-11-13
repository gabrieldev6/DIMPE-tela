import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import { non_max_suppression } from './nonMaxSuppression'
import labels from '../assets/labels.json'

/** LIMIAR de acerto */
const THRESHOLD = 0.8

/**
 * Representa um objeto detectado
 */
export class BoundingBox {
  /** Posição do objeto na imagem*/
  x
  /** Posição do objeto na imagem*/
  y
  /** Largura do objeto */
  width
  /** Altura do objeto */
  height
  /** Nome do objeto */
  label
  /** Cor do objeto */
  color
  /** Probabilidade de acerto */
  score

  constructor(x, y, width, height, label, color, score) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.label = label
    this.color = color
    this.score = score
  }
}

/**
 * Detector de objetos
 */
export class Detector {
  static yolov7

  /**
   * Carrega o modelo
   * @param model Modelo a ser carregado
   * @param onProgress Callback de progresso
   */
  static async loadModel(model) {
    const yolov7 = await tf.loadGraphModel(model, {
      onProgress: (fraction) => {
        onProgress(fraction)
      }
    })

    const dummyInput = tf.ones(yolov7.inputs[0].shape ?? []);
    const warmupResult = yolov7.execute(dummyInput);

    tf.dispose(warmupResult);
    tf.dispose(dummyInput);

    this.yolov7 = yolov7

    await tf.ready()
  }

  /**
   * Detecta objetos em um frame
   * @param frame Frame a ser processado
   * @param threshold Limiar de acerto
   */
  static async detect(frame, threshold = THRESHOLD)  {
    if (!this.yolov7) {
      throw new Error('Model not loaded')
    }

    const model_dim = [640, 640]

    tf.engine().startScope()

    const [frame_height, frame_width] = frame.shape

    const ratio_x = frame_width / model_dim[1]
    const ratio_y = frame_height / model_dim[0]

    const input = tf.tidy(() => tf.image
      .resizeBilinear(frame, model_dim)
      .div(255)
      .transpose([2, 0, 1])
      .expandDims(0)
    )

    let result = this.yolov7.execute(input)

    let res = result.arraySync()[0]

    result.dispose()

    const detections = non_max_suppression(res)

    return detections.map(([x, y, w, h, score, classe]) => {
      const width = w * ratio_x
      const height = h * ratio_y
      return {
        color: getColor(classe),
        x: (x * ratio_x) - (width / 2),
        y: (y * ratio_y) - (height / 2),
        width,
        height,
        score,
        label: labels[classe]
      }
    }).filter((detection) => detection.score >= threshold)
  }
}

/**
 * Retorna uma cor para a classe
 * @param classe Número da classe
 * @returns Uma cor em HSL
 */
function getColor(classe) {
  const hue = ((1 + Math.sin(classe)) / 2) * 360
  return `hsl(${hue}deg, 100%, 40%)`
}