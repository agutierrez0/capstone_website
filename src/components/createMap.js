import React, { useState } from 'react';
import Map from './map';
import './css/data.css';

export default function CreateMap() {
    const [distanceInput, setDistanceInput] = useState('')
    const [angleInput, setAngleInput] = useState('')

    const [data, setData] = useState([{x: 10, y: 20}])

    function handleNewData() {
        const previousPoints = data[data.length - 1]
        const radians = angleInput * (Math.PI / 180)
        const x = Math.cos(radians)
        const y = (-1) * Math.sin(radians)
        const z = { x: previousPoints.x + (x * distanceInput), y: previousPoints.y + (y * distanceInput)}
        setData(d => [...d, z])
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

        <div id="map-container-1" className="map-section">
            {data.length > 1 ? <Map inputData={data} /> : null}
        </div>
    </div>
}