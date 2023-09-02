import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import StartScreen from './pages/StartScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Main from './pages/Main';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartScreen />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
