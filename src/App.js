import React from 'react';
import Dashboard from './components/dashboard';
import Register from './components/register';
import Landing from './components/landing';
import  { Routes, Route } from 'react-router-dom';
import CreateMap from './components/createMap';

export default function App() {
  return <Routes>
      <Route index element={<Landing />} />
      <Route path="register" element={<Register />} />
      <Route path="createmap" element={<CreateMap />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
}