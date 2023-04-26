import React from "react";
import { Link } from "react-router-dom";
import homebg from "../images/homebg.jpg";

export default function Home() {
  return (
    <div
      className="h-screen bg-cover flex flex-col justify-center"
      style={{ backgroundImage: `url(${homebg})` }}>
      <div className="flex flex-col items-center space-y-16">
        <h1 className="text-xl lg:text-3xl text-white">
          Teachers and students develop each other.
        </h1>
        <p className="w-3/5 lg:w-1/2 text-base lg:text-lg text-white text-center">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas
          porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,
          purus lectus malesuada libero, sit amet commodo magna eros quis urna.
          Nunc viverra imperdiet enim. Fusce est.
        </p>
        <button className="bg-amber-400 px-6 py-2 rounded-full text-xl flex items-center">
          <Link to="sign-in">Explore</Link>
        </button>
      </div>
    </div>
  );
}
