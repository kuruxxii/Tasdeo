import React from "react";
import { Link } from "react-router-dom";
import homebg from "../images/homebg.jpg";

export default function Home() {
  return (
    <div
      className="h-screen bg-cover flex flex-col justify-center"
      style={{ backgroundImage: `url(${homebg})` }}>
      <div className="flex flex-col items-center space-y-16">
        <h1 className="text-xl lg:text-4xl text-white">
          Teachers and students develop each other.
        </h1>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas
          porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,
          purus lectus malesuada libero, sit amet commodo magna eros quis urna.
          Nunc viverra imperdiet enim. Fusce est.
        </p>
        <button className="bg-[#d7bb5b] px-8 py-2 lg:px-12 lg:py-4 rounded-full text-base lg:text-xl flex items-center">
          <Link to="sign-in">Explore</Link>
        </button>
      </div>
    </div>
  );
}
