import React, { useState } from 'react';
import './css/data.css';
import Map from './Map';

export default function Data() {
    const [distanceInput, setDistanceInput] = useState('')
    const [angleInput, setAngleInput] = useState('')
    const [data, setData] = useState([{x: 10, y: 20}, {x: 30, y: 50}, {x: 50, y: 140}])

    function handleNewData() {
        const previousPoints = data[data.length - 1]
        console.log(angleInput)
        console.log(distanceInput)
        const radians = angleInput * (Math.PI / 180)
        const x = Math.cos(radians)
        const y = (-1) * Math.sin(radians)


        const z = { x: previousPoints.x + (x * distanceInput), y: previousPoints.y + (y * distanceInput)}
        setData([...data, z])
    }

    return <div className="data-container">
        <div className="data-input-section">
            <div>
                <label>Distance</label>
                <input onChange={(event) => setDistanceInput(event.target.value)}></input>
            </div>

            <div>
                <label>Angles</label>
                <input onChange={(event) => setAngleInput(event.target.value)}></input>
            </div>
            
            <button onClick={handleNewData}>Add point</button>
        </div>
        [<ul>
            {data.map(d => <li>{d.x},{d.y}</li>)}
        </ul>]
        

        <div id="map-container-1" className="map-section">
        
            <Map inputData={data} />
        </div>
    </div>
}