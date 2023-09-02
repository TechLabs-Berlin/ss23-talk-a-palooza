import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [currentFormEl, setCurrentFormEl] = useState('login');

  const switchFormEl = (formNameEl) => {
    setCurrentFormEl(formNameEl);
  };
  return (
    <>
      <h2>Sign In with Google</h2>
      <button>Sign in with Google</button>
      {currentFormEl === 'login' ? (
        <LoginForm onFormSwitch={switchFormEl} />
      ) : (
        <RegisterForm onFormSwitch={switchFormEl} />
      )}
    </>
  );
};

export default Login;
