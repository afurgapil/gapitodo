import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import ProfilePicture from "../../hooks/ProfilePicture";
import SignOutButton from "../../hooks/SignOutButton";

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
      <NavLink to="/mainpage">
        <h1 id="header-title">GaPiToDo</h1>
      </NavLink>
      <nav>
        {user ? (
          <div id="onLogin">
            <Link to="/profile">
              <ProfilePicture />
            </Link>
            <SignOutButton />
          </div>
        ) : null}
        {!user ? (
          <div id="onNotLogin">
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export default Header;
