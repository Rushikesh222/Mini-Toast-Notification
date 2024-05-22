import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-name">
        <h1>Header</h1>
      </div>
      <div className="navbar-content">
        <NavLink to="/">
          <h2>First Timer</h2>
        </NavLink>
        <NavLink to="/second">
          <h2>Second Timer</h2>
        </NavLink>
        <NavLink to="/third">
          <h2>Third Timer</h2>
        </NavLink>
      </div>
    </div>
  );
};
