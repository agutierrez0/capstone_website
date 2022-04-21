import React, { useState, useEffect } from 'react';
import { Button, TextInput } from '@mantine/core';
import { useNotifications } from "@mantine/notifications";
import './css/settings.css';

export default function Settings() {
    const [newName, setNewName] = useState("")
    const [oldName, setOldName] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [oldTitle, setOldTitle] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const [contract, setContract] = useState()
    const [account, setAccount] = useState(null);
    const notifications = useNotifications();

    async function updateUsername() {

    }

    async function updateTitle() {

    }

    return <div>
        <div>
            <div>Settings</div>
        </div>
        <div>
            <div className="settings-container">
                <div className="settngs-input-section">
                    <div>
                        <h6>Current Full Name</h6>
                        <TextInput 
                            disabled
                            value={oldName}
                            style={{fontFamily:'RobotoSerif'}}
                            required={true} />

                        <h6 style={{marginTop: '2.5%'}} >New Full Name</h6>
                        <TextInput 
                            onChange={(event) => setNewName(event.target.value)}
                            value={newName}
                            style={{fontFamily:'RobotoSerif'}}
                            placeholder='John Smith'
                            required={true} />
                    </div>
                    
                    <Button style={{marginTop: '5%', marginBottom: '5%', fontSize: '1vw', fontFamily: 'RobotoSerif'}} onClick={updateUsername}>
                        Submit
                    </Button>

                    <div>
                        <h6>Current Title</h6>
                        <TextInput 
                            disabled
                            value={oldTitle}
                            style={{fontFamily:'RobotoSerif'}}
                            required={true} />
                        
                        <h6 style={{marginTop: '2.5%'}}>New Title</h6>
                        <TextInput 
                            onChange={(event) => setNewTitle(event.target.value)}
                            value={newTitle}
                            style={{fontFamily:'RobotoSerif'}}
                            placeholder='Doctor'
                            required={true} />
                    </div>
                    <Button style={{marginTop: '5%', fontSize: '1vw', fontFamily: 'RobotoSerif'}} onClick={updateTitle}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    </div>
}