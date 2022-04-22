import React, { useState } from 'react';
import Map from './map';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import './css/data.css';

console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Maps() {
    const [mapName, setMapName] = useState("")
    const [distanceInput, setDistanceInput] = useState('')
    const [angleInput, setAngleInput] = useState('')
    const [data, setData] = useState([{x: 10, y: 20}, {x: 30, y: 50}])

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

    async function handleSaveMap() {
        await addDoc(collection(db, "capstone_points"), { createdBy: 'angel', points: data, mapName });
    }

    return <div className="data-container">
         <div className="data-input-section">
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Map Name</label>
                <input onChange={(event) => setMapName(event.target.value)}></input>
            </div>
        </div>
        <div className="data-input-section">
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Distance</label>
                <input onChange={(event) => setDistanceInput(event.target.value)}></input>
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Angles</label>
                <input onChange={(event) => setAngleInput(event.target.value)}></input>
            </div>
            
            <button onClick={handleNewData}>Add point</button>
             <button onClick={handleSaveMap} disabled={data.length > 3 ? false : true}>Save map</button>
        </div>
        {/* <ul>
            {data.map((d,i) => <li key={i} >{d.x},{d.y}</li>)}
        </ul> */}

        <div id="map-container-1" className="map-section">
        
            <Map inputData={data} />
        </div>
    </div>
}