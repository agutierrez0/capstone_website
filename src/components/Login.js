import React, { useState } from "react";
import users from '../config';

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function processLogin() {
        console.log({username, password})
        console.log({users})

        users.forEach(user => {
            if (password === "123" && user === username) {
                props.handler(true)
                return true
            }
        })
    }

    return <div className="global-container">
        <div className="input-section">
            <b>Welcome to RC Auto Mapper</b>
            <label>Username</label>
            <input onChange={(event) => setUsername(event.target.value)} />
            <label>Password</label>
            <input onChange={(event) => setPassword(event.target.value)} />
            <button onClick={processLogin}>Log in</button>
        </div>
        
    </div>
}