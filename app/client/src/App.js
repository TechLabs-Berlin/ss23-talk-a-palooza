import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [currentFormEl, setCurrentFormEl] = useState("login");

  const switchFormEl = (formNameEl) => {
    setCurrentFormEl(formNameEl);
  };
  return (
    <div>
      {currentFormEl === "login" ? (
        <Login onFormSwitch={switchFormEl} />
      ) : (
        <Register onFormSwitch={switchFormEl} />
      )}
    </div>
  );
}

export default App;
