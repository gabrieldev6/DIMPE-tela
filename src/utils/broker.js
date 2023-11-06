import mqtt from "mqtt"


    
//função para conectar ao broker mqtt
function conection() {
    
    try {
        const client = mqtt.connect("mqtt://test.mosquitto.org");

        return client
    } catch (error) {
        console.log(`erro ao conectar: ${error}`)
    }
}