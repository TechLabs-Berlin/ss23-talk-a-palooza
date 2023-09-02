import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import axios from 'axios';

import StartScreen from './pages/StartScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Main from './pages/Main';

const App = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `http://localhost:3001/api/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      console.log(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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

        {/* <Route path='/' element={<StartScreen />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/dashboard' element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
