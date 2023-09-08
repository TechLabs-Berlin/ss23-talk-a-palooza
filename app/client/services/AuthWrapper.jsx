import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import RenderRoutes from '../components/auth/RenderRoutes';
import axios from 'axios';

const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext, {});
const baseUrl = 'http://localhost:3001/api/auth/login/success';

export const AuthWrapper = () => {
  const [authUser, setAuthUser] = useState({
    user: {},
    isAuthenticated: false,
  });

  const getUser = async () => {
    try {
      const url = baseUrl;
      const { data } = await axios.get(url, { withCredentials: true });
      const user = data.user;
      setAuthUser({ ...user, isAuthenticated: true });
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const logout = useCallback(() => {
    setAuthUser({ ...authUser, isAuthenticated: false });
  }, [authUser]);

  // Memoize the value object using useMemo
  const authContextValue = useMemo(
    () => ({ authUser, logout }),
    [authUser, logout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
