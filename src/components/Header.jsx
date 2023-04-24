import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import logoUrl from "../images/logo.png";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    color: "#FF8C38",
    borderBottomWidth: "2px",
    borderColor: "#FF8C38",
  };

  return (
    <header className="h-12 flex justify-around items-center text-sm bg-white text-gray-400">
      <Link to="/">
        {/* <img src={logoUrl} alt="Tasdeo Logo" className="object-cover w-48" /> */}
        <span>LOGO(TBD)</span>
      </Link>
      <nav className="flex justify-between items-center space-x-4">
        <NavLink
          to="overview"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          OVERVIEW
        </NavLink>
        <NavLink
          to="setup"
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          SETUP
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
