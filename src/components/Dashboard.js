import React from 'react'
import './styles.css';
import Navbar from './modules/Navbar'

const serviceName = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const characteristicName = 'beb5483e-36e1-4688-b7f5-ea07361b26a8'
export default function Dashboard() {
    function getBluetoothDevice() {
        let config = { filters: [{
            name: 'Long name works now',
            
          }],
          optionalServices: [serviceName]}
        navigator.bluetooth.requestDevice(config)
        .then(device => device.gatt.connect())
        .then(server => server.getPrimaryService(serviceName))
        .then(service => {
            console.log('service accessed')
            return service.getCharacteristic(characteristicName);
            //return service.getCharacteristics()
        })
        .then(characteristic => {
            console.log('characteristic accessed')
            //console.log(characteristics)
            
            return characteristic.readValue();
            //return
        })
        .then(value => {
            var z = new TextDecoder()
            console.log('value accessed')
            console.log(`Message raw: ${value}`);
            console.log({value})
            console.log(`Message: ${value.getUint8(0)}`);
            var something = z.decode(value)
            console.log(something)
            //console.log('value accessed')
            //console.log(`Message raw: ${value}`);
            //value.setUint8(1, 255)
            //console.log(`Message: ${value.getUint8(0)}`);
            
          })
        .catch(error => { console.error(error); });
    }

    return <div>
            <Navbar />
            <div className="dash-container">
                <h2> Welcome to RC Automapper </h2>

                <div className="button-section-dash">
                    <button onClick={getBluetoothDevice}>Connect RC Car</button>
                </div>
            </div>
        </div>
}