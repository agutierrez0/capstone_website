import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import MapCard from './card';
import './css/map.css';

export default function AltMaps({opened}) {
  const theme = useMantineTheme();
  const f = [1,2,3,4,5]

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

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