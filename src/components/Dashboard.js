import React, { useState } from 'react'
import './styles.css';
import Navbar from './modules/Navbar'

const serviceName = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'

const uuids = ['beb5483e-36e1-4688-b7f5-ea07361b26a8', '5d0faa6a-5086-11ec-bf63-0242ac130002']
/*
const uuidToWord = {
    'beb5483e-36e1-4688-b7f5-ea07361b26a8' : 'topic',
    '5d0faa6a-5086-11ec-bf63-0242ac130002' : 'data'
}
*/
export default function Dashboard() {
    const [myDevice, setMyDevice] = useState(null)
    const [myServer, setMyServer] = useState(false)

    function readCharacteristicValue(uuid) {
        if (myServer) {
            myServer.getPrimaryService(serviceName)
            .then(service => service.getCharacteristic(uuid))
            .then(characteristic => characteristic.readValue())
            .then(value => {
                if (value) {
                    var decoder = new TextDecoder()
                    const message = decoder.decode(value)
                
                    if (message.length === 4) {
                        console.log(`message isn't string: ${value.getUint8(0)}`)
                        const dataElement = document.getElementById('data-value')
                        dataElement.innerText = `data: ${value.getUint8(0)} cm`

                    } else {
                        console.log(`message is string: ${message}`)
                        const topicElement = document.getElementById('topic-value')
                        topicElement.innerText = `topic: ${message}`
                        return message
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

    function getCharacteristics() {
        myServer.getPrimaryService(serviceName)
        .then(service => {
            console.log('service accessed')
            return service.getCharacteristics();
        })
        .then(_ => {
            var count = 0;
            var myInterval = setInterval(() => {
                readCharacteristicValue(uuids[0])
                readCharacteristicValue(uuids[1])
                if (count === 100) { clearInterval(myInterval) }
                count = count + 1;
            }, 1000)
        })
        .catch(error => { return console.error(error); });
        return;
    }

    function connectToGattServer() {
        console.log('here')
        if (myDevice) {
            console.log('here1')
            myDevice.gatt.connect()
            .then(server => {
                console.log('here2')
                if (server) {
                    setMyServer(server)
                }
                return;
            })
            .catch(error => { return console.error(error); });
            console.log('here3')
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
                    {myDevice ? <div>{myDevice.name} is connected <button onClick={connectToGattServer}>connect to gatt server</button> </div> : <button onClick={getBluetoothDevice}>connect device</button>}
                    {myServer && myDevice ? <div>
                        <div>connected to gatt server </div>
                        <button onClick={getCharacteristics}>read characteristics</button>
                        <div id="topic-value"></div>
                        <div id="data-value"></div>
                    </div> : null}

                </div>
            </div>
}