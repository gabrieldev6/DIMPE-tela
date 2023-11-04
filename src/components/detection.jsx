import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./loader";
import { Webcam } from "../utils/webcam";
import { renderBoxes } from "../utils/renderBox";
import { non_max_suppression } from "../utils/nonMaxSuppression";
import styles from "../style/detection.module.css";


/**
 * Function to detect image.
 * @param {HTMLCanvasElement} canvasRef canvas reference
 */

function shortenedCol(arrayofarray, indexlist) {
  return arrayofarray.map(function (array) {
      return indexlist.map(function (idx) {
          return array[idx];
      });
  });
}

const Detection = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcam = new Webcam();
  
  // configs
  const modelName = "yolov7";
  const threshold = 0.80;
  /**
   * Function to detect every frame loaded from webcam in video tag.
   * @param {tf.GraphModel} model loaded YOLOv7 tensorflow.js model
   */

  
  const detectFrame = async (model) => { //cria a funcao que faz a configuracao do modelo
    const model_dim = [640, 640]; //redimenciona a imagem para 640x640
    tf.engine().startScope(); //inicia
    // input ]e a imagem ja tratado pelo modelo
    const input = tf.tidy(() => {
      const img = tf.image
                  .resizeBilinear(tf.browser.fromPixels(videoRef.current), model_dim)
                  .div(255.0)
                  .transpose([2, 0, 1])
                  .expandDims(0);
                  
      return img
    });
    
    await model.executeAsync(input).then((res) => {

      res = res.arraySync()[0];

      var detections = non_max_suppression(res);
      const boxes =  shortenedCol(detections, [0,1,2,3]);
      const scores = shortenedCol(detections, [4]);
      const class_detect = shortenedCol(detections, [5]);

      renderBoxes(canvasRef, threshold, boxes, scores, class_detect);
      tf.dispose(res);
    });

    requestAnimationFrame(() => detectFrame(model)); // get another frame
    tf.engine().endScope();
  };

  useEffect(() => {
    tf.loadGraphModel(`${window.location.origin}/${modelName}_web_model/model.json`, {
      onProgress: (fractions) => {
        // seta para que a tela de carregamento fique na frente
        setLoading({ loading: true, progress: fractions });
      },
    }).then(async (yolov7) => {
      // Warmup the model before using real data.
      const dummyInput = tf.ones(yolov7.inputs[0].shape);
      await yolov7.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);
        // despois de carregado, a tela recebe false e ela some
        setLoading({ loading: false, progress: 1 });
        // alterando o videoRef [e possivel alterar a camera que esta sendo mostrada
        webcam.open(videoRef, () => detectFrame(yolov7));
      });
    });
  }, []);
  console.warn = () => {};

  return (
    <div className={styles.App}>
      
      {loading.loading ? (
        <Loader>Carregando modelo... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <p> </p>
      )}

      <div className={styles.content}>
        <video autoPlay playsInline muted ref={videoRef} id="frame"/>
        <canvas width={640} height={640} ref={canvasRef} />

        
      </div>
    </div>
  );
};

export default Detection;
