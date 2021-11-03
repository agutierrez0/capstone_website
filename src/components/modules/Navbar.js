import React from 'react'
import './navbar.css';

export default function Navbar() {
    return <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">News</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#">About</a></li>
    <li style={{float: 'right'}}><a className="active" href="#">About</a></li>
  </ul>
}