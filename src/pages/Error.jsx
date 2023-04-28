import React from "react";
import { useRouteError } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ReactComponent as Road } from "../images/road.svg";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-8">
      <Road className="w-1/2 h-auto lg:w-1/4" />
      <p className="lg:text-xl">
        Oops! There's an error. Developer is on his way...
      </p>
      <button className="bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-4 py-2 rounded-full flex justify-center items-center w-1/2 lg:w-1/6">
        <BiArrowBack className="mr-1" />
        <Link to="/">GO BACK</Link>
      </button>
    </div>
  );
}
