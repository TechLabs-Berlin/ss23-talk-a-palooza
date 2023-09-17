import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthData } from '../../services/AuthWrapper';

import StartScreen from '../../pages/StartScreen';
import Main from '../../pages/Main';
import Dashboard from '../../pages/Dashboard';
import Exercises from '../../pages/Exercises';

const userPath = [
  {
    path: '/',
    component: 'Main',
    element: <Main />,
    isRestricted: true,
    navigate: <Navigate replace to='/start' />,
  },
  {
    path: '/start',
    component: 'StartScreen',
    element: <StartScreen />,
    isRestricted: false,
    navigate: <Navigate replace to='/' />,
  },
  {
    path: '/practice',
    component: 'Exercises',
    element: <Exercises />,
    isRestricted: true,
    navigate: <Navigate replace to='/start' />,
  },
  {
    path: '/dashboard',
    component: 'Dashboard',
    element: <Dashboard />,
    isRestricted: true,
    navigate: <Navigate replace to='/start' />,
  },
];

const RenderRoutes = () => {
  const { authUser } = AuthData();

  return (
    <Routes>
      {userPath.map((route) => {
        if (route.isRestricted) {
          return (
            <Route
              key={route.component}
              path={route.path}
              element={
                authUser.isAuthenticated ? route.element : route.navigate
              }
            />
          );
        } else if (!route.isRestricted) {
          return (
            <Route
              key={route.component}
              path={route.path}
              element={
                authUser.isAuthenticated ? route.navigate : route.element
              }
            />
          );
        } else return null;
      })}
    </Routes>
  );
};

export default RenderRoutes;
