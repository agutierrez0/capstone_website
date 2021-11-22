import React, { useEffect, useState } from 'react'
import './styles.css';
import Navbar from './modules/Navbar'

const serviceName = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const characteristicName = 'beb5483e-36e1-4688-b7f5-ea07361b26a8'

export default function Dashboard() {
    const [myChar, setMyChar] = useState(null)

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

    function beginProcess(event) {
        var myInterval = setInterval(() => {
            event.readValue()
            .then(value => {
                console.log({value})

                console.log('uint8 check: ')
                console.log(value.getUint8(0))
                console.log('this is in handleSensorValueChanged')
                var encoder = new TextDecoder();
                const infoFromESP32 = encoder.decode(value)
                console.log(infoFromESP32)

                if (value.getUint8(0) === 10) {
                    clearInterval(myInterval)
                }
            })   
        }, 1000)
    }

    function getBluetoothDevice() {
        let config = { filters: [{ name: 'Long name works now' }], optionalServices: [serviceName]}
        navigator.bluetooth.requestDevice(config)
        .then(device => device.gatt.connect())
        .then(server => server.getPrimaryService(serviceName))
        .then(service => {
            console.log('service accessed')
            return service.getCharacteristic(characteristicName);
            //return service.getCharacteristics()
        })
        .then(characteristic => {
            console.log(characteristic)
            //characteristic.startNotifications();
            setMyChar(characteristic)
            //characteristic.addEventListener('characteristicvaluechanged', handleSensorValueChange);
            // Reading Battery Level…

            return characteristic.readValue();
            //characteristic.oncharacteristicvaluechanged = handleSensorValueChange
            //characteristic.startNotifications()
            //return characteristic.readValue();
        })
        .then(value => {
            if (myChar) {
                myChar.readValue()
                .then(value => {
                    console.log('testingggggg')
                    console.log(value)
                })
                setTimeout(() => console.log('sleep'), 3000)
            }
            
            //var z = new TextDecoder()
            //console.log('value accessed')
            console.log(`Message raw: ${value}`);
            //console.log({value})
            //console.log(`Message: ${value.getUint8(0)}`);
            //var something = z.decode(value)
            //console.log(something)
            //console.log('value accessed')
            //console.log(`Message raw: ${value}`);
            //value.setUint8(1, 255)
            //console.log(`Message: ${value.getUint8(0)}`);
            return;
          })
        .catch(error => { return console.error(error); });

        
        
    }

    return <div>
                <Navbar />
                <div id="myContainer" className="dash-container">
                    <h2> Welcome to RC Automapper </h2>

                    {myChar ? <div> 


                        <button onClick={() => beginProcess(myChar)}>
                            check char
                        </button>
                         </div> : null }

                    <div className="button-section-dash">
                        <button onClick={getBluetoothDevice}>Connect RC Car</button>
                    </div>
                </div>
            </div>
}