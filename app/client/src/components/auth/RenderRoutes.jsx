import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthData } from './AuthWrapper';

import StartScreen from '../../pages/StartScreen';
import Dashboard from '../../pages/Dashboard';

const userPath = [
  {
    path: '/',
    component: 'StartScreen',
    element: <StartScreen />,
    isRestricted: false,
  },
  {
    path: '/dashboard',
    component: 'Dashboard',
    element: <Dashboard />,
    isRestricted: true,
    navigate: <Navigate replace to='/' />,
  },
];

const RenderRoutes = () => {
  const { authUser } = AuthData();

  return (
    <Routes>
      {userPath.map((route, i) => {
        if (route.isRestricted && authUser.isAuthenticated) {
          // <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />
          return (
            <Route
              key={i}
              path={route.path}
              element={
                authUser.children.length === 0 ? route.navigate : route.element
              }
            />
          );
        } else if (!route.isRestricted) {
          return <Route key={i} path={route.path} element={route.element} />;
        } else return false;
      })}
    </Routes>
  );
};

export default RenderRoutes;
