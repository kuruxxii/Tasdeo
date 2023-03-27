import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link to="/">#Tasdeo.O</Link>
      <nav>
        <NavLink
          to="dashboard"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          DASHBOARD
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          INTERVIEW
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          ABOUT
        </NavLink>
        <Link to="login">
          {/* <img src="../assets/images/avatar-icon.png" className="login-icon" /> */}
          log in
        </Link>
      </nav>
    </header>
  );
}
