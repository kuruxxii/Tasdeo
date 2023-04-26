import React from "react";
import homebg from "../images/homebg.jpg";

export default function About() {
  return (
    <div
      className="h-screen bg-cover flex flex-col justify-center"
      style={{ backgroundImage: `url(${homebg})` }}>
      <div className="flex flex-col items-center space-y-16">
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit
        </p>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit
        </p>
      </div>
    </div>
  );
}
