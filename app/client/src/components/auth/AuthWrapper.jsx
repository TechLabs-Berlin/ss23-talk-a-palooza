import { createContext, useContext, useState, useEffect } from 'react';
import RenderRoutes from './RenderRoutes';
import axios from 'axios';

const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [authUser, setAuthUser] = useState({
    displayName: '',
    isAuthenticated: false,
  });

  const getUser = async () => {
    try {
      const url = `http://localhost:3001/api/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setAuthUser({ ...data.user, isAuthenticated: true });
      console.log(data.user);
      console.log(data.user.children);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    setAuthUser({ ...authUser, isAuthenticated: false });
  };
  return (
    <AuthContext.Provider value={{ authUser, getUser, logout }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};