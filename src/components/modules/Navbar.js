import React from 'react'
import './navbar.css';

export default function Navbar() {
    return <ul>
    <li><a className="active" href="/">Operate</a></li>
    <li><a href="/">Settings</a></li>
    <li><a href="/">Data</a></li>
    <li><a href="/">About</a></li>
  </ul>
}