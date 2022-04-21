import React, { useState } from 'react';
import { Button, LoadingOverlay, TextInput } from '@mantine/core';
import { useNotifications } from "@mantine/notifications";
import './css/landing.css';

export default function Register({navigate}) {
    const [visible, setVisible] = useState(false);
    const [inputDisable, setInputDisabled] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(null);
    const notifications = useNotifications();

    async function handleLogin() {
        if (username == "" || password == "") {
            notifications.showNotification({
                title: 'Invalid inputs.',
                message: 'Full Name / Title cannot be empty.',
                color: 'red'
            })
        } else {
            setVisible(true)
        }
    }

    return <div className="app-background">
        <div className="some-container">
            <LoadingOverlay visible={visible} radius={'lg'} />
            <div className="main-container">
                <div className='outer-container' style={{padding: '5%'}}>
                    <div className="text-container">
                    <h2>RC Auto Mapper</h2>
                    <h6>EECE Capstone 2021-2022</h6>
                        <div style={{marginTop: '5%'}}>
                            <h6>Username</h6>
                            <TextInput 
                                onChange={(event) => setUsername(event.target.value)}
                                disabled={inputDisable}
                                value={username}
                                style={{fontFamily:'RobotoSerif'}}
                                required={true} />
                        </div>
                        
                        <div style={{marginTop: '5%'}}>
                            <h6>Password</h6>
                            <TextInput 
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={inputDisable}
                                value={password}
                                style={{fontFamily:'RobotoSerif'}}
                                required />
                        </div>

                        <Button 
                            style={{marginTop: '5%', marginBottom: '5%', fontSize: '1vw', fontFamily: 'RobotoSerif'}}
                            disabled={inputDisable}
                            onClick={handleLogin}>Log in</Button>
                            <h6 style={{textAlign: 'center', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => window.location.href = "/register"}>Click here to register</h6>
                        {isValidUser === true ? <h5 style={{marginTop: "2%", color: 'green', textAlign: 'center'}}>Welcome!</h5> : null}
                    </div>
                </div>
            </div>
        </div>
    </div>
}