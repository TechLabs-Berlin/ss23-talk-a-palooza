// import { useState } from 'react';

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
