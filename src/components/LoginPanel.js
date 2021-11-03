import './App.css';
import React, { useState } from 'react';
const usernames = ['angel', 'jose',  'pedro', 'tiffany', , 'rachel']

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="content-container">
      <div className="App">
        <div className="input-section">
          <div className="title-section">
            <div>CAPSTONE</div>
            <div>
              PROJECT 2021
            </div>
          </div>
          <div>
          <div className="input-title">
            username
            <input className="specific-input" onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="input-title">
            password
            <input className="specific-input" type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
            </div>

          
          
        
        <div className="button-area">
          <button style={{width: "100%"}} onClick={() => console.log({ username, password })}>
            SUBMIT
          </button>

        </div>
        
        </div>
      </div>

      
      


    </div>
    
  );
}

export default App;
