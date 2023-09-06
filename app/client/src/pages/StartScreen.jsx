import { AuthData } from '../components/auth/AuthWrapper';
// import usersService from '../services/usersService';

import Login from '../components/Login';

//  Startscreen:
// Shows only if user not logged:
// - as start page when entering the App
// - as redirection page when entering from another page
//  login Component.

const StartScreen = () => {
  const { authUser } = AuthData();
  console.log('Is user logged in?', authUser.isAuthenticated);

  return (
    <div>
      <h1>Talk aPalooza</h1>
      <h2>StartScreen</h2>
      <Login />
    </div>
  );
};

export default StartScreen;
