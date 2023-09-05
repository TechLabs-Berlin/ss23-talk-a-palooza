import { AuthData } from '../components/auth/AuthWrapper';
// import usersService from '../services/usersService';

import Login from '../components/Login';
import InitialAssessment from '../components/InitialAssessment';
import Main from '../components/Main';

//  Startscreen:
// If user not logged, login Component,
// else if user no children : InitialAssessment,
// else main

const StartScreen = () => {
  const { authUser } = AuthData();
  console.log('user child Id:', authUser.children);

  if (!authUser.email) {
    return (
      <div>
        <h1>Talk aPalooza</h1>
        <h2>StartScreen ({authUser.email ? 'logged In' : 'Not logged In'})</h2>
        <Login authUser={authUser} />
      </div>
    );
  } else if (authUser.children.length === 0) {
    return <InitialAssessment authUser={authUser} />;
  } else if (authUser) {
    return <Main authUser={authUser} />;
  }
};

export default StartScreen;
