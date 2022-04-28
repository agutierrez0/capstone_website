import React, { useState } from 'react';
import { Button, LoadingOverlay, TextInput } from '@mantine/core';
import { useNotifications } from "@mantine/notifications";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import './css/landing.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Register({navigate}) {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(null);
    const notifications = useNotifications();

    async function handleLogin() {
        var userFound = false
        setVisible(true)
        if (username === "" || password === "") {
            notifications.showNotification({
                title: 'Invalid inputs.',
                message: 'Username / Password cannot be empty.',
                color: 'red'
            })
            setVisible(false)
            return
        } else {
            const querySnapshot = await getDocs(collection(db, "capstone_users"))
            querySnapshot.forEach((item) => {
                const actualItem = item.data();

                if (actualItem.username === username && actualItem.password === password) {
                    userFound = true
                    setIsValidUser(true)
                }
            })
        }

        if (userFound) {
            setTimeout(() => {
                window.location.href = "/dashboard"
            }, 1500)
            sessionStorage.setItem('username', username)
        } else {
            alert('invalid username/password')
            setVisible(false)
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
                                disabled={visible}
                                value={username}
                                style={{fontFamily:'RobotoSerif'}}
                                onKeyDown={(event) => event.key === 'Enter' ? handleLogin() : null}
                                required={true} />
                        </div>
                        
                        <div style={{marginTop: '5%'}}>
                            <h6>Password</h6>
                            <TextInput 
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={visible}
                                value={password}
                                type="password"
                                style={{fontFamily:'RobotoSerif'}}
                                onKeyDown={(event) => event.key === 'Enter' ? handleLogin() : null}
                                required />
                        </div>

                        <Button 
                            style={{marginTop: '5%', marginBottom: '5%', fontSize: '1vw', fontFamily: 'RobotoSerif'}}
                            disabled={visible}
                            onClick={handleLogin}>Log in</Button>
                            <h6 style={{textAlign: 'center', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => window.location.href = "/register"}>Click here to register</h6>
                        {isValidUser === true ? <h5 style={{marginTop: "2%", color: 'green', textAlign: 'center'}}>Welcome!</h5> : null}
                    </div>
                </div>
            </div>
        </div>
    </div>
}