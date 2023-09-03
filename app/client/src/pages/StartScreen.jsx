import { Link } from 'react-router-dom';
import { AuthData } from '../components/auth/AuthWrapper';

const StartScreen = () => {
  const { user } = AuthData();
  return (
    <>
      <h1>Talk aPalooza</h1>
      <h2>StartScreen ({user.email ? 'logged In' : 'Not logged In'})</h2>
      <Link to='/assessment'>Get Started</Link>
      <Link to='/login'>I have an account</Link>

      <hr></hr>
      <div>
        (shortcuts):
        <Link to='/'>StartScreen</Link>
        <Link to='/login'>Login</Link>
        <Link to='/main'>Main (private)</Link>
        <Link to='/dashboard'>Dashboard (private)</Link>
      </div>
    </>
  );
};

export default StartScreen;
