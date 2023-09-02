import { useState } from 'react';
import loginService from '../services/loginService';

const LoginForm = ({ onFormSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        email,
        password,
      });
      setUser(user);
      setEmail('');
      setPassword('');
    } catch (exception) {
      console.log('Error: ' + exception);
    }
  };
  return (
    <>
      <h2>Sign in with Email</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='email'>email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='example@example.com'
          id='email'
          name='email'
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='*****'
          id='password'
          name='password'
        />
        <button type='submit'>Login</button>
      </form>
      <small>Don't have an account?</small>
      <button onClick={() => onFormSwitch('register')}>Register</button>
    </>
  );
};
export default LoginForm;
