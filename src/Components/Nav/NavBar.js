import React from "react";
import { NavLink } from "react-router-dom";
import "../../Styles/NavBar.css";

import { login, logout, register, isLoggedIn } from "../../Utils/requests";


export class NavBar extends React.Component {

  render() {
    return (
      <nav className="NavBar">
        <div className="NavBar-links">
          <div className="NavBar-links-general">
            <div className="btn"></div>
            <NavLink exact to="/" className="nav-link">
              Landing
            </NavLink>
            { !isLoggedIn() ?
            <>
              <NavLink exact to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink exact to="/register" className="nav-link">
                Register
              </NavLink>
            </>
            :
            <>
              <NavLink exact to="/profile/-1" className="nav-link">
                Profile
              </NavLink>
              <NavLink exact to="/listings" className="nav-link">
                Listings
              </NavLink>
              <NavLink exact to="/logout" className="nav-link">
                Logout
              </NavLink>
            </>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
