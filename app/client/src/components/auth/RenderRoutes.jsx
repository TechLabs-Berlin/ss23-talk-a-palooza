import { Route, Routes } from 'react-router-dom';
import { AuthData } from './AuthWrapper';

import StartScreen from '../../pages/StartScreen';
import Login from '../../pages/Login';
import InitialAssessment from '../../pages/InitialAssessment';
import Main from '../../pages/Main';
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
  },
];

const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      {userPath.map((route, i) => {
        if (route.isRestricted && user.isAuthenticated) {
          return <Route key={i} path={route.path} element={route.element} />;
        } else if (!route.isRestricted) {
          return <Route key={i} path={route.path} element={route.element} />;
        } else return false;
      })}
    </Routes>
  );
};

export default RenderRoutes;
