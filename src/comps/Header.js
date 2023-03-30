import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <ul>
        <NavLink to="/signin">signin</NavLink>
        <NavLink to="/signup">signup</NavLink>
        <NavLink to="/profile">profile</NavLink>
      </ul>
    </div>
  );
}

export default Header;
