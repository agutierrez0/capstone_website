import React from 'react';
import Dashboard from './components/altDashboard';

import Register from './components/register';
import Landing from './components/landing';
import  { Routes, Route } from 'react-router-dom';

export default function App() {
  return <Routes>
    <Route />
              <Route index element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<div>Not Found</div>} />
        </Routes>
}