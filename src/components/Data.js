import React, { useState } from 'react';
import './data.css';
import Map from './Map';

export default function Data() {
    const [distanceInput, setDistanceInput] = useState('')
    const [angleInput, setAngleInput] = useState('')
    const [data, setData] = useState([{x: 0, y: 20}, {x: 150, y: 700}, {x: 300, y: 100}, {x: 450, y: 20}, {x: 600, y: 130}])

    function handleNewData() {
        const z = {x1: distanceInput, x2: Math.sin(angleInput)}
        setData([...data, z])
        setDistanceInput(null)
        setAngleInput(null)
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
            <Map inputData={data} />
        </div>
    </div>
}