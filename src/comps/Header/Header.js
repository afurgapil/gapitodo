import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./header.scss";
import ProfilePicture from "../../hooks/ProfilePicture";
function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);
  return (
    <div className="header">
      <h1>ToDo</h1>
      <nav>
        {user ? (
          <div id="onLogin">
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <ProfilePicture></ProfilePicture>
          </div>
        ) : null}
        {user ? (
          <button onClick={() => auth.signOut()}>Sign Out</button>
        ) : (
          <div id="onNotLogin">
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
