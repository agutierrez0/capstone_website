import React, { useEffect } from 'react'
import './styles.css';
import Navbar from './modules/Navbar'

const serviceName = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const characteristicName = 'beb5483e-36e1-4688-b7f5-ea07361b26a8'

export default function Dashboard() {

    useEffect(() => {
        var modal = document.getElementById('myModal');
        var container = document.getElementById('myContainer');
        if (modal && container) {
            modal.className = "Modal is-visuallyHidden";
            setTimeout(function() {
                container.className = "MainContainer is-blurred";
                modal.className = "Modal";
            }, 100);
            container.parentElement.className = "ModalOpen";
        }
    }, [])

    function getBluetoothDevice() {
        let config = { filters: [{ name: 'Long name works now' }], optionalServices: [serviceName]}
        navigator.bluetooth.requestDevice(config)
        .then(device => {
            console.log(device)
            console.log(device.name)
            return device.gatt.connect()

        })
        .then(server => server.getPrimaryService(serviceName))
        .then(service => {
            console.log('service accessed')
            return service.getCharacteristic(characteristicName);
        })
        .then(characteristic => {
            console.log('characteristic accessed')
            return characteristic.readValue();
        })
        .then(value => {
            console.log('value accessed')
            console.log(`Message raw: ${value}`);
            console.log(`Message: ${value.getUint8(0)}`);
          })
        .catch(error => { console.error(error); });
    }

    return <div>
                <Navbar />
                <div id="myContainer" className="dash-container">
                    <h2> Welcome to RC Automapper </h2>

                    <div id="myModal" class="Modal is-hidden is-visuallyHidden">
                        <div class="Modal-content">
                            <span id="closeModal" class="Close">&times;</span>
                            <p>Simple Modal</p>
                        </div>
                    </div>

                    <div className="button-section-dash">
                        <button onClick={getBluetoothDevice}>Connect RC Car</button>
                    </div>
                </div>
            </div>
}