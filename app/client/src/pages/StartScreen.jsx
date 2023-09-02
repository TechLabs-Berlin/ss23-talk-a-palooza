import { Link } from 'react-router-dom';

const StartScreen = () => {
  return (
    <>
      <h1>Talk aPalooza</h1>
      <h2>StartScreen</h2>
      <Link to='/register'>Get Started</Link>
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
