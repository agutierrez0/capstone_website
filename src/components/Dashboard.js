import React from 'react'
import './styles.css';
import Navbar from './modules/Navbar'

export default function Dashboard() {
    function getBluetoothDevice() {
        let config = { filters: [{
            name: 'Long name works now'
          }], }
        navigator.bluetooth.requestDevice(config)
        .then(device => {
            console.log(device)
            console.log(device.name)
            return device.gatt.connect()
        })
        .then(server => {
            console.log(server)
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