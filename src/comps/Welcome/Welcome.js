import React from "react";
import { Link } from "react-router-dom";
import "./welcome.scss";

function Welcome() {
  return (
    <div className="welcome-container">
      <h2 className="welcome-container__title">Welcome to my ToDo App</h2>
      <p className="welcome-container__text">
        This app is designed to help you manage your daily tasks effectively.
        Sign up now to start using the app and manage your tasks more
        efficiently.
      </p>
      <div className="welcome-buttons">
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
