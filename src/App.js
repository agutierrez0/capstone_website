import React from 'react';
import Dashboard from './components/Dashboard';
import Data from './components/Data';
import Settings from './components/Settings';
import About from './components/About';

import  { Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Landing from './components/landing';

export default function App() {
  return <Routes>
    <Route />
              <Route index element={<Landing />} />
              <Route path="/data" element={<Data />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<div>Not Found</div>} />
        </Routes>
}