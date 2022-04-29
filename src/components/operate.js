import React, { useState } from 'react'
import { useEffect } from 'react';
import './css/styles.css';
import Map from './map';
import './css/data.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const serviceName = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const uuids = ['beb5483e-36e1-4688-b7f5-ea07361b26a8', 
                '5d0faa6a-5086-11ec-bf63-0242ac130002', 
                '8fa2e117-e431-4dab-ab5a-24ba2067983d', 
                'e4085858-2331-4b31-af03-f485127f2e29',
                '7d51feca-c876-4482-9a66-f0ccb953e732',
                'efad2c23-a434-44c5-b232-82bbf9d12eb6',
                '5b5b6f6d-c0da-45dc-ac12-afdb4e5a944e']

export default function Operate() {
    const [myDevice, setMyDevice] = useState(null)
    const [myServer, setMyServer] = useState(false)
    const [switchToggle, setSwitchToggle] = useState(false)
    const [myInterval, setMyInterval] = useState(null)
    const [active, setActive] = useState(false)

    const [status, setStatus] = useState()
    const [distance, setDistance] = useState()
    const [angle, setAngle] = useState()

    const [data, setData] = useState([{x: 0, y: 0}])

    async function handleSaveMap() {
        await addDoc(collection(db, "capstone_points"), { createdBy: 'angel', points: data, mapName: 'testing123' });
    }

    useEffect(() => {
        function handleNewData(angle, distance) {
            const previousPoints = data[data.length - 1]
            const radians = angle * (Math.PI / 180)
            const x = Math.cos(radians)
            const y = (-1) * Math.sin(radians)
            const z = { x: previousPoints.x + (x * distance * .2), y: previousPoints.y + (y * distance * .2)}
            setData(d => [...d, z])
        }

        if (status && distance && angle) {
            if (status === 'stopping') {
                console.log({status, distance, angle})
                handleNewData(angle, distance)
            }            
        }
    }, [status, distance, angle])
    function handleReading() { 
        writeCharacteristicValue(uuids[3])
    }    

    function handleToggleSwitch() { 
        if (!switchToggle) {
            setMyInterval(setInterval(() => {
                /* 
                readCharacteristicValue(uuids[0], 'ultrasonic-sensor')
                readCharacteristicValue(uuids[1], 'movement-status')
                readCharacteristicValue(uuids[2], 'manometer-reading')*/
                readCharacteristicValue(uuids[0], 'status-reading') // status
                readCharacteristicValue(uuids[1], 'front-reading') // distance
                readCharacteristicValue(uuids[6], 'right-reading') // angle
            }, 1000))
        } else {            
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
            .then(res => res ? console.log(res) : null)
            .catch(error => { return console.log(error); });
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

                    if (uuid === uuids[0]) {
                        setStatus(message)
                    } else if (uuid === uuids[1]) { // front reading = distance
                        setDistance(value.getUint8(0))
                    } else if (uuid === uuids[6]) { // right reading = angle
                        setAngle(value.getUint8(0))
                    }
                    if (message.length === 4) {
                        thisElement.innerText = `${value.getUint8(0)} ${elementId === 'manometer-reading' ? '°' : 'cm'}`
                    } else {
                        thisElement.innerText = message
                    }
                } else {
                    alert('error reading value')
                }
                return;
            })
            .catch(error => { return console.log(error); });
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
                                <h4>SAVE MAP</h4>
                                <button onClick={handleSaveMap}>SAVE MAP</button>

                                {switchToggle ? <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Car Status</td>
                                            <td id="status-reading"></td>
                                        </tr>
                                        <tr>
                                            <td>Front Reading</td>
                                            <td id="front-reading"></td>
                                        </tr>
                                        <tr>
                                            <td>Right Reading</td>
                                            <td id="right-reading"></td>
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

                        <div id="map-container-1" className="map-section">
                            {data.length > 1 ? <Map inputData={data} /> : null}
                        </div>
                    </div>
                </div>
            </div>
}