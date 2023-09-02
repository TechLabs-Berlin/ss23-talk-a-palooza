import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [currentFormEl, setCurrentFormEl] = useState('login');

  const switchFormEl = (formNameEl) => {
    setCurrentFormEl(formNameEl);
  };

  const google = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <>
      <h2>Sign In with Google</h2>
      <button onClick={google}>Sign in with Google</button>
      {currentFormEl === 'login' ? (
        <LoginForm onFormSwitch={switchFormEl} />
      ) : (
        <RegisterForm onFormSwitch={switchFormEl} />
      )}
    </>
  );
};

export default Login;
