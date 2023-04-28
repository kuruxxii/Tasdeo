import React from "react";
import { Link } from "react-router-dom";
import homebg from "../images/homebg.jpg";

export default function Home() {
  // throw new Error("check error page");
  return (
    <div
      className="h-screen bg-cover flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${homebg})` }}>
      <div className="flex flex-col items-center space-y-16">
        <h1 className="text-xl lg:text-4xl text-white">
          Teachers and students develop each other.
        </h1>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          Welcome to Tasdeo, an online platform where professors can leave
          remarks for students and view history remarks given by other
          professors. Our mission is to provide evaluation criteria other than
          academic records to help teachers and students connect, share ideas,
          and inspire each other to reach their full potential.
        </p>
        <button className="bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-8 py-2 lg:px-12 lg:py-4 rounded-full text-base lg:text-xl flex items-center">
          <Link to="sign-in">EXPLORE</Link>
        </button>
      </div>
    </div>
  );
}
