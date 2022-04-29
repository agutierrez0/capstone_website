import React, { useState, useEffect } from 'react';
import Map from './map';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import './css/data.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SingleMap() {
    const [mapName, setMapName] = useState('')
    const [creator, setCreator] = useState('')
    const [distanceInput, setDistanceInput] = useState('')
    const [angleInput, setAngleInput] = useState('')
    const [data, setData] = useState([])
    const { id } = useParams()

    function handleNewData() {
        const previousPoints = data[data.length - 1]
        console.log(angleInput)
        console.log(distanceInput)
        const radians = angleInput * (Math.PI / 180)
        const x = Math.cos(radians)
        const y = (-1) * Math.sin(radians)


        const z = { x: previousPoints.x + (x * distanceInput), y: previousPoints.y + (y * distanceInput)}
        setData(d => [...d, z])
    }

    useEffect(() => {
        async function getMap() {
            const docRef = doc(db, 'capstone_points', id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const entity = docSnap.data()
                setData(entity.points)
                setMapName(entity.mapName)
                setCreator(entity.createdBy)
            } else {
                alert('map not found!')
            }
        }

        if (id) getMap();
    }, [id])

    return <div className="data-container">
         <div className="data-input-section">
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Map Name</label>
                <div>{mapName}</div>
                <label>Created by</label>
                <div>{creator}</div>
            </div>
        </div>

        <div id="map-container-1" className="map-section">
            {data.length > 1 ? <Map inputData={data} /> : null}
        </div>
    </div>
}