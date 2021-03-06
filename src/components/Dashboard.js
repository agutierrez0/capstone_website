import React, { useState, useEffect } from 'react';
import { AppShell, Navbar, Header, Text, useMantineTheme, Burger, MediaQuery } from '@mantine/core';
import SidebarOption from './sidebarOption';
import Operate from './operate';
import SingleMap from './singleMap';
import AltMaps from './maps';
import { Route, Routes } from 'react-router-dom';
import './css/dashboard.css';

export default function Dashboard() {
  const [opened, setOpened] = useState(true)
  const theme = useMantineTheme();

  function handleLogOut() {
    sessionStorage.clear()
    window.location.href = "/"
  }

  useEffect(() => { 
    if (!sessionStorage.getItem('username')) {
      alert('please log in.')
      window.location.href = "/"
    }
  }, [])

  return <div className='app-background'><div className='outer-container' style={{borderRadius: '15%'}}>
      <div className='dashboard-container'>
          <AppShell
          style={{overflow: 'hidden'}}
              padding="md"
              navbarOffsetBreakpoint="sm"
              navbar={<Navbar
                  padding="md"
                  hiddenBreakpoint="sm"
                  hidden={!opened}
                  width={{ sm: 300, lg: 400 }}
                  height={'80vh'} >
                  <SidebarOption onClick={() => window.location.href = '/dashboard/operate'} txt={"Operate"} />
                  <SidebarOption onClick={() => window.location.href = '/dashboard/maps'} txt={"Maps"} />
                  <SidebarOption onClick={handleLogOut} txt={"Log Out"} />
                  </Navbar>}
              header={ <Header height={70} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text>Hot Wheelz RC Auto Mapper</Text>
              </div>
            </Header>}
              styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
              })}>
                
                <Routes>
                  <Route>
                    <Route path=''>
                      <Route path='' element={<Operate />} />
                      <Route path='operate' element={<Operate />} />
                      <Route path='maps' element={<AltMaps />} />
                      <Route path='map/create' element={<SingleMap />} />
                      <Route path='map/:id' element={<SingleMap />} />
                    </Route>
                  </Route>
                </Routes>
          </AppShell>
      </div>
  </div></div>
}