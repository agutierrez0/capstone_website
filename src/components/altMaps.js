import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import { useState } from 'react';
import './css/map.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AltMaps() {
  const [maps, setMaps] = useState([])
  
  useEffect(() => {
    async function getMaps() {
      const querySnapshot = await getDocs(collection(db, "capstone_points"))
      querySnapshot.forEach((item) => {
          const actualItem = item.data();
          actualItem['dbId'] = item.id;
          setMaps(x => [...x, actualItem])
      })
    }

    getMaps();
  }, [])

  return (
        <div className="map-grid">
            {maps.map((i,keyId) => 
            <Card key={keyId} shadow="sm" style={{width: '18vw', margin: '5%'}}  >
              <Group position="apart" >
                <Text weight={500} width={'100%'}>{i.mapName ? i.mapName : 'No Name'}</Text>
                <Badge color="pink" variant="light">
                  {i.dbId}
                </Badge>
              </Group>

              <Button onClick={() => window.location.href = `/dashboard/map/${i.dbId}`} variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                View
              </Button>
            </Card> )}
        </div>
  );
}