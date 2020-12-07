import React from "react";
import { NavLink } from "react-router-dom";
import "./Styles/NavBar.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavBar-links">
        <div className="NavBar-links-general">
          <div className="btn"></div>
          <NavLink exact to="/" className="nav-link">
            Landing
          </NavLink>
          <NavLink exact to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink exact to="/profile" className="nav-link">
            Profile
          </NavLink>
          <NavLink exact to="/register" className="nav-link">
            Register
          </NavLink>
          <NavLink exact to="/listings" className="nav-link">
            listings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
