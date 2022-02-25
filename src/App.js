import React from 'react';
import Dashboard from './components/Dashboard';
import Data from './components/Data';
import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/modules/Navbar';

export default function App() {
  return <div>
    <Navbar />
        <BrowserRouter>

          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/data" element={<Data />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
          
        </div>
}