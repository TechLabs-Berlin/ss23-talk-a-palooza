import { Link } from 'react-router-dom';
import { AuthData } from '../components/auth/AuthWrapper';

import Login from '../components/Login';
import InitialAssessment from '../components/InitialAssessment';
import Main from '../components/Main';

//  Startscreen:
// If user not logged, login Component,
// else if user no children : InitialAssessment,
// else main

const StartScreen = () => {
  const { user } = AuthData();

  return (
    <>
      <h1>Talk aPalooza</h1>
      <h2>StartScreen ({user.email ? 'logged In' : 'Not logged In'})</h2>

      <Login user={user} />
      <InitialAssessment />
      <Main />

      <hr></hr>
      <div>
        (shortcuts):
        <Link to='/'>StartScreen</Link>
        <Link to='/assessment'>Initial Assessment</Link>
        <Link to='/main'>Main (private)</Link>
        <Link to='/dashboard'>Dashboard (private)</Link>
      </div>
    </>
  );
};

export default StartScreen;
