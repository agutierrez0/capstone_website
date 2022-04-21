import React, { useState } from 'react';
import { Button, LoadingOverlay, TextInput } from '@mantine/core';
import { useNotifications } from "@mantine/notifications";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; 
import { firebaseConfig } from './firebaseConfig';
import './css/landing.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Register({navigate}) {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(null);
    const notifications = useNotifications();

    async function handleRegister() {
        setVisible(true)
        if (username === "" || password === "") {
            notifications.showNotification({
                title: 'Invalid inputs.',
                message: 'Username / Password cannot be empty.',
                color: 'red'
            })
            setVisible(false)
        } else {
            try {
                var foundDuplicate = false
                const querySnapshot = await getDocs(collection(db, "capstone_users"))
                querySnapshot.forEach((item) => {
                    const actualItem = item.data();

                    if (actualItem.username === username) {
                        foundDuplicate = true
                        setIsValidUser(false)
                        setVisible(false)
                    }
                })
                if (!foundDuplicate) {
                    await addDoc(collection(db, "capstone_users"), { username, password });
                    setIsValidUser(true)
                    sessionStorage.setItem('username', username)
                    setTimeout(() => {
                        window.location.href = "/dashboard"
                    }, 1500)
                }
            } catch (e) {
                alert("error registering user");
                setVisible(false)
            }
        }
    }

    return <div className="app-background">
        <div className="some-container">
            <LoadingOverlay visible={visible} radius={'lg'} />
            <div className="main-container">
                <div className='outer-container' style={{padding: '5%'}}>
                    <div className="text-container">
                        <h2>Register</h2>
                        <div style={{marginTop: '5%'}}>
                            <h6>Username</h6>
                            <TextInput 
                                onChange={(event) => setUsername(event.target.value)}
                                disabled={visible}
                                value={username}
                                style={{fontFamily:'RobotoSerif'}}
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
                                required />
                        </div>

                        <Button 
                            style={{marginTop: '5%', fontSize: '1vw', fontFamily: 'RobotoSerif'}}
                            disabled={visible}
                            onClick={handleRegister}>Submit</Button>
                        {isValidUser === false ? <h5 style={{marginTop: "2%", color: 'red', textAlign: 'center'}}>Account already registered!</h5> : null}
                        {isValidUser === true ? <h5 style={{marginTop: "2%", color: 'green', textAlign: 'center'}}>Welcome! Redirecting you...</h5> : null}
                    </div>
                </div>
            </div>
        </div>
    </div>
}