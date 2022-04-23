import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { useEffect } from 'react';
import './css/map.css';

export default function AltMaps({opened}) {
  const f = [1,2,3,4,5]
  //const [maps, setMaps] = useState()

  useEffect(() => {
    
  }, [])

  return (
        <div className={opened ? 'map-grid-mq' : 'map-grid'}>
            {f.map(i => <div>
            <Card shadow="sm" style={{width: '18vw', margin: '5%'}}  >
              <Group position="apart" >
                <Text weight={500}>Map Name</Text>
                <Badge color="pink" variant="light">
                  Map Address
                </Badge>
              </Group>

              <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                View
              </Button>
            </Card>
                </div>)}
        </div>
  );
}