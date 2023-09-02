import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import StartScreen from './pages/StartScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Main from './pages/Main';

const App = () => {
  const user = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={user ? <Navigate to='/main' /> : <StartScreen />}
        />
        <Route
          path='/login'
          element={user ? <Navigate to='/main' /> : <Login />}
        />
        <Route path='/main' element={!user ? <Navigate to='/' /> : <Main />} />
        <Route
          path='/dashboard'
          element={!user ? <Navigate to='/' /> : <Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
