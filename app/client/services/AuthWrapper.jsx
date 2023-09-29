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
const ChildContext = createContext();

export const AuthData = () => useContext(AuthContext, {});
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
    setAuthUser({ ...user, isAuthenticated: true });
    console.log('User is authenticated:', user);

    // Assuming your user object has a property like childId that represents the child's ID
    const childId = user.children[0];

    // Fetch the child data based on the childId
    const { data: childData } = await axios.get(`${childURL}/${childId}`);
    setChild({ ...childData });
    console.log('Child is registered:', childData);

    // setLoading(false); // Set loading to false when the operation is complete
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
    <div>Loading...</div>
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
