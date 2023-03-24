import React from "react";
import { Link } from "react-router-dom";

export default function Class() {
  return (
    <div className="bg-nav h-44 rounded-xl px-6 py-6 mb-4 relative flex flex-col justify-around items-left">
      <p className="text-4xl">Introduction to Social Computing</p>
      <p className="text-2xl">Section A</p>
      <p className="text-lg">6 enrolled</p>
      <Link
        to="/class-detail"
        className="bg-bright absolute bottom-4 right-4 px-4 py-4 rounded-md">
        Go to class =》
      </Link>
    </div>
  );
}
