import React, { useState } from 'react'
import Navbar from './modules/Navbar'
import './styles.css';

const serviceName = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const uuids = ['beb5483e-36e1-4688-b7f5-ea07361b26a8', '5d0faa6a-5086-11ec-bf63-0242ac130002', '8fa2e117-e431-4dab-ab5a-24ba2067983d', 'e4085858-2331-4b31-af03-f485127f2e29']

export default function Dashboard() {
    const [myDevice, setMyDevice] = useState(null)
    const [myServer, setMyServer] = useState(false)
    const [switchToggle, setSwitchToggle] = useState(false)
    const [myInterval, setMyInterval] = useState(null)
    const [active, setActive] = useState(false)

    function handleReading() { 
        writeCharacteristicValue(uuids[3])

    }

    function handleToggleSwitch() { 
        if (!switchToggle) {
            console.log('start reading characteristics')
            setMyInterval(setInterval(() => {
                readCharacteristicValue(uuids[0], 'ultrasonic-sensor')
                readCharacteristicValue(uuids[1], 'movement-status')
                readCharacteristicValue(uuids[2], 'manometer-reading')
            }, 1000))
        } else {            
            console.log('stop reading characteristics')
            console.log(myInterval)
            clearInterval(myInterval)
            setMyInterval(null)
        }
        setSwitchToggle(!switchToggle)
    }

    function writeCharacteristicValue(uuid) {
        let buffer = new ArrayBuffer(16); // create a buffer of length 16
        let view = new Uint16Array (buffer);

        view[0] = active ? 97 : 98
        if (myServer) {
            myServer.getPrimaryService(serviceName)
            .then(service => service.getCharacteristic(uuid))
            .then(characteristic => characteristic.writeValueWithResponse(view))
            .then(res => console.log(res))
            .catch(error => { return console.error(error); });
        }
        setActive(!active);
        return;
    }

    function readCharacteristicValue(uuid, elementId) {
        if (myServer) {
            myServer.getPrimaryService(serviceName)
            .then(service => service.getCharacteristic(uuid))
            .then(characteristic => characteristic.readValue())
            .then(value => {
                if (value) {
                    var decoder = new TextDecoder()
                    const message = decoder.decode(value)
                    const thisElement = document.getElementById(elementId)
                    if (message.length === 4) {
                        console.log(`message isn't string: ${value.getUint8(0)}`)
                        thisElement.innerText = `${value.getUint8(0)} ${elementId === 'manometer-reading' ? '°' : 'cm'}`
                    } else {
                        console.log(`message is string: ${message}`)
                        thisElement.innerText = message
                    }
                } else {
                    alert('error reading value')
                }
                return;
            })
            .catch(error => { return console.error(error); });
            return;
        }
    }

    function connectToGattServer() {
        if (myDevice) {
            myDevice.gatt.connect()
            .then(server => {
                if (server) {
                    setMyServer(server)
                }
                return;
            })
            .catch(error => { return console.error(error); });
            return;
        } else {
            console.log('here4')
            return alert('device is invalid')
        }
    }

    function getBluetoothDevice() {
        let config = { filters: [{ name: 'Long name works now' }], optionalServices: [serviceName]}
        navigator.bluetooth.requestDevice(config)
        .then(device => {
            if (device) {
                setMyDevice(device)
            }
            return;
        })
        .catch(error => { return console.error(error); });
        return;
    }

    return <div>
                <Navbar />
                <div id="myContainer" className="dash-container">
                    <h2> Welcome to RC Automapper </h2>

                    <div>
                    {myDevice ? 
                        <div className="connect-device-section">
                            <div className="connected-section"><h4>"{myDevice.name}" connected</h4>&nbsp;✅</div>
                            {myServer ? 
                            <div className="connect-device-section">
                                <div className="connected-section"><h4>GATT Server connected</h4>&nbsp;✅</div>

                                <h4>START / STOP reading characteristics</h4>
                                <label className="switch">
                                    <input onClick={handleReading} type="checkbox" />
                                    <span className="slider round"></span>
                                </label> 
                                <h4>SHOW VALUES</h4>
                                <label className="switch">
                                    <input onClick={handleToggleSwitch} type="checkbox" />
                                    <span className="slider round"></span>
                                </label> 

                                {switchToggle ? <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Ultrasonic Sensor Reading</td>
                                            <td id="ultrasonic-sensor"></td>
                                        </tr>
                                        <tr>
                                            <td>Movement Status</td>
                                            <td id="movement-status"></td>
                                        </tr>
                                        <tr>
                                            <td>Manometer Reading</td>
                                            <td id="manometer-reading"></td>
                                        </tr>
                                    </tbody>
                                </table> : null}
                                <div id="topic-value"></div>
                                <div id="data-value"></div>
                            </div> 
                            : 
                            <div className="connect-device-section">
                                <h4>Please connect to the GATT server</h4>
                                <button onClick={connectToGattServer}>Connect to GATT server</button>
                            </div>}
                        </div> 
                        :
                        <div className="connect-device-section">
                            <h4>Please connect the device</h4>
                            <button onClick={getBluetoothDevice}>Search for bluetooth device</button>
                        </div>}
                    </div>
                </div>
            </div>
}