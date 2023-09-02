import React, { useState } from 'react';

const RegisterForm = ({ onFormSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>full name</label>
        <input
          type='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='full name'
          id='name'
          name='name'
        />
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
        <button type='submit'>Continue</button>
      </form>
      <small>Already have an account?</small>
      <button onClick={() => onFormSwitch('login')}>Login</button>
    </>
  );
};

export default RegisterForm;
