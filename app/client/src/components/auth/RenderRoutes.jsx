import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthData } from './AuthWrapper';

import StartScreen from '../../pages/StartScreen';
import Login from '../Login';
import InitialAssessment from '../InitialAssessment';
import Main from '../Main';
import Dashboard from '../../pages/Dashboard';

const userPath = [
  {
    path: '/',
    component: 'StartScreen',
    element: <StartScreen />,
    isRestricted: false,
  },
  {
    path: '/login',
    component: 'Login',
    element: <Login />,
    isRestricted: false,
  },
  {
    path: '/assessment',
    component: 'InitialAssessment',
    element: <InitialAssessment />,
    isRestricted: false,
  },
  { path: '/main', component: 'Main', element: <Main />, isRestricted: true },
  {
    path: '/dashboard',
    component: 'Dashboard',
    element: <Dashboard />,
    isRestricted: true,
    navigate: <Navigate replace to='/assessment' />,
  },
  // OK! no child ? assessment
  // not user ? startscreen
];

// On all routes (- startscreen): not user ? startscreen

const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      {userPath.map((route, i) => {
        if (route.isRestricted && user.isAuthenticated) {
          // <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />
          return <Route key={i} path={route.path} element={route.element} />;
        } else if (!route.isRestricted && user.isAuthenticated) {
          return (
            <Route
              key={i}
              path={route.path}
              element={route.element}
              // element={user.children.length ? route.navigate : route.element}
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
