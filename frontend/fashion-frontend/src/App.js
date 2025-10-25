import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../src/pages/home'

import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <Routes>
          <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
