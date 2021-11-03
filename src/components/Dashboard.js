import React from 'react'
import './styles.css';
import Navbar from './modules/Navbar'

export default function Dashboard() {
    return <div>
            <Navbar />
            <div className="dash-container">
                <h2> Welcome to RC Automapper </h2>

                <div className="button-section-dash">
                    <button>DATA</button>
                    <button>SETTINGS</button>
                    <button>OPERATE</button>
                </div>
            </div>
        </div>
}