import React from 'react'
import './navbar.css';

export default function Navbar() {
    return <ul>
    <li><a className="active" href="/">Operate</a></li>
    <li><a href="/settings">Settings</a></li>
    <li><a href="/data">Data</a></li>
    <li><a href="/about">About</a></li>
  </ul>
}