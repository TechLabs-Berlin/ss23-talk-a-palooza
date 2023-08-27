import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

import TestConnect from './TestConnect';

function App() {
  const [currentFormEl, setCurrentFormEl] = useState('login');

  const switchFormEl = (formNameEl) => {
    setCurrentFormEl(formNameEl);
  };
  return (
    <div>
      {currentFormEl === 'login' ? (
        <Login onFormSwitch={switchFormEl} />
      ) : (
        <Register onFormSwitch={switchFormEl} />
      )}
      {/* Test connection DB */}
      <TestConnect />
    </div>
  );
}

export default App;
