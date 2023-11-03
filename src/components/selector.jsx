import React, { Component } from 'react';


export default class Selector extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        cameraList: [],
        selectedCameraId: '',
      };

    }
  
    componentDidMount() {
      // Verifique se o navegador suporta a API de mídia
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices()
          .then(devices => {
            const cameraList = devices.filter(device => device.kind === 'videoinput');
            this.setState({ cameraList });
          })
          .catch(error => {
            console.error('Erro ao enumerar dispositivos: ' + error);
          });
      }
    }

    render() {
        
        return (
           <div>
                <select onChange={e => this.setState({ selectedCameraId: e.target.value })}>
                    <option value="">Selecione uma Câmera</option>
                    {this.state.cameraList.map(camera => (
                        <option key={camera.deviceId} value={camera.deviceId}>{camera.label || 'Câmera ' + (this.state.cameraList.length + 1)}</option>
                        
                    ))} 
                </select>
                <button>gravar</button>
            </div>    
          
        );
      }
    }