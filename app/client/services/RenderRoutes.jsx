import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthData } from './AuthWrapper';

import StartScreen from '../screens/StartScreen';
import Main from '../screens/Main';
import DashboardScreen from '../screens/DashboardScreen';
import ExerciseScreen from '../screens/ExerciseScreen';

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
    component: 'ExerciseScreen',
    element: <ExerciseScreen />,
    isRestricted: true,
    navigate: <Navigate replace to='/start' />,
  },
  {
    path: '/dashboard',
    component: 'DashboardScreen',
    element: <DashboardScreen />,
    isRestricted: true,
    // navigate: <Navigate replace to='/start' />,
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
