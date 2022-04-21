import React, { useState } from 'react';
import { Button, LoadingOverlay, TextInput } from '@mantine/core';
import { useNotifications } from "@mantine/notifications";
import './css/landing.css';

export default function Register({navigate}) {
    const [visible, setVisible] = useState(false);
    const [inputDisable, setInputDisabled] = useState(false)
    const [fullName, setFullName] = useState('');
    const [title, setTitle] = useState('');
    const [isValidUser, setIsValidUser] = useState(null);
    const notifications = useNotifications();

    async function handleRegister() {
        if (fullName == "" || title == "") {
            notifications.showNotification({
                title: 'Invalid inputs.',
                message: 'Full Name / Title cannot be empty.',
                color: 'red'
            })
        } else {
            setVisible(true)
            setTimeout(() => console.log('test'), 3000)
            setVisible(false)
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
                            <h6>Full Name</h6>
                            <TextInput 
                                onChange={(event) => setFullName(event.target.value)}
                                disabled={inputDisable}
                                value={fullName}
                                style={{fontFamily:'RobotoSerif'}}
                                placeholder='John Smith'
                                required={true} />
                        </div>
                        
                        <div style={{marginTop: '5%'}}>
                            <h6>Title</h6>
                            <TextInput 
                                onChange={(event) => setTitle(event.target.value)}
                                disabled={inputDisable}
                                value={title}
                                style={{fontFamily:'RobotoSerif'}}
                                placeholder='Engineer'
                                required />
                        </div>

                        <Button 
                            style={{marginTop: '5%', fontSize: '1vw', fontFamily: 'RobotoSerif'}}
                            disabled={inputDisable}
                            onClick={handleRegister}>Submit</Button>
                        {isValidUser === false ? <h5 style={{marginTop: "2%", color: 'red', textAlign: 'center'}}>Account already registered!</h5> : null}
                        {isValidUser === true ? <h5 style={{marginTop: "2%", color: 'green', textAlign: 'center'}}>Welcome! Redirecting you...</h5> : null}
                    </div>
                </div>
            </div>
        </div>
    </div>
}