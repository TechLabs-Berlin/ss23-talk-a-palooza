import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import RenderRoutes from './RenderRoutes';
import Loader from '../components/layouts/Loader';
import axios from 'axios';

const AuthContext = createContext();
const ChildContext = createContext();

export const AuthData = () => useContext(AuthContext, {});
export const ChildData = () => useContext(ChildContext, {});
const loginURL = 'http://localhost:3001/api/auth/login/success';
const childURL = `http://localhost:3001/api/children/`;

export const AuthWrapper = () => {
  const [authUser, setAuthUser] = useState({
    user: {},
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false when the operation is complete
    }, 100);
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(loginURL, { withCredentials: true });
    const user = data.user;

    console.log('User is authenticated:', user);

    const childId = user.children[0];

    if (childId) {
      const { data: childData } = await axios.get(`${childURL}/${childId}`);
      setChild({ ...childData });
      console.log('Child is registered:', childData);
    } else {
      setChild(null);
      console.log('Child is not registered');
    }
    setAuthUser({ ...user, isAuthenticated: true });
    setLoading(false); // Set loading to false when the operation is complete
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = useCallback(() => {
    setAuthUser({ ...authUser, isAuthenticated: false });
  }, [authUser]);

  // Memoize the value object using useMemo
  const authContextValue = useMemo(
    () => ({ authUser, logout }),
    [authUser, logout]
  );

  const childContextValue = useMemo(() => ({ child }), [child]);

  return loading ? (
    <Loader />
  ) : (
    <AuthContext.Provider value={authContextValue}>
      <ChildContext.Provider value={childContextValue}>
        <>
          <RenderRoutes />
        </>
      </ChildContext.Provider>
    </AuthContext.Provider>
  );
};
