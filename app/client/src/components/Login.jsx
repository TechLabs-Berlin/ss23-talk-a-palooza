import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const Login = () => {
  const [currentFormEl, setCurrentFormEl] = useState('login');

  const switchFormEl = (formNameEl) => {
    setCurrentFormEl(formNameEl);
  };

  const googleAuth = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <>
      <h2>Sign In with Google</h2>
      <button onClick={googleAuth}>Sign in with Google</button>
      {currentFormEl === 'login' ? (
        <LoginForm onFormSwitch={switchFormEl} />
      ) : (
        <RegisterForm onFormSwitch={switchFormEl} />
      )}
    </>
  );
};

export default Login;


const Login = () => {
  // const [currentFormEl, setCurrentFormEl] = useState('login');

  // const switchFormEl = (formNameEl) => {
  //   setCurrentFormEl(formNameEl);
  // };

  const googleAuth = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <>
      <button onClick={googleAuth}>Get Started</button>
      {/* {currentFormEl === 'login' ? (
        <LoginForm onFormSwitch={switchFormEl} />
      ) : (
        <RegisterForm onFormSwitch={switchFormEl} />
      )} */}
    </>
  );
};

export default Login;
