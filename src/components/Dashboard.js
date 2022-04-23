import React, { useState, useEffect } from 'react';
import { AppShell, Navbar, Header, Text, useMantineTheme, Burger, MediaQuery } from '@mantine/core';
import SidebarOption from './sidebarOption';
import Operate from './operate';
//import Maps from './maps';
import AltMaps from './altMaps';
import './css/dashboard.css';

export default function Dashboard() {
  const [opened, setOpened] = useState(true)
  const [isOperate, setIsOperate] = useState(true)
  const [isMaps, setIsMaps] = useState(false)
  const theme = useMantineTheme();

  function handleNewPage(page) {
    if (page === 'operate') {
      setIsOperate(true)
      setIsMaps(false)
    } else if (page === 'maps') {
      setIsOperate(false)
      setIsMaps(true)
    }
  }

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

  return <div className='app-background'><div className='outer-container'>
      <div className='dashboard-container'>
          <AppShell
              padding="md"
              navbarOffsetBreakpoint="sm"
              navbar={<Navbar
                  padding="md"
                  hiddenBreakpoint="sm"
                  hidden={!opened}
                  width={{ sm: 300, lg: 400 }}
                  height={'80vh'} >
                  <SidebarOption onClick={() => handleNewPage('operate')} txt={"Operate"} />
                  <SidebarOption onClick={() => handleNewPage('maps')} txt={"Maps"} />
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
              <div>
                {isMaps ? <AltMaps opened={opened} /> : null}
                {isOperate ? <Operate /> : null}  
              </div>
          </AppShell>
      </div>
  </div></div>
}