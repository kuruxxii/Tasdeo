import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GoPerson } from "react-icons/go";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header className="border h-28 flex justify-around items-center">
      <Link to="/">#Tasdeo.O</Link>
      <nav className="flex justify-between items-center space-x-4">
        <NavLink
          to="overview"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          OVERVIEW
        </NavLink>
        <NavLink
          to="interview"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          INTERVIEW
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          ABOUT
        </NavLink>
        <Link to="sign-in">
          <GoPerson />
        </Link>
      </nav>
    </header>
  );
}
