import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full border-4">
      <h1>Home Page</h1>
      <p>some words...</p>
      <button className="bg-amber-400 px-6 py-2 rounded-full text-xl flex items-center">
        <Link to="sign-in">Explore</Link>
      </button>
    </div>
  );
}
