import React from "react";
import { Link } from "react-router-dom";

export default function Class({ id, courseName, section, studentIds }) {
  return (
    <div className="bg-nav h-44 rounded-xl px-6 py-6 mb-4 relative flex flex-col justify-around items-left">
      <p className="text-4xl">{courseName}</p>
      <p className="text-2xl">{section}</p>
      <p className="text-lg">{studentIds.length} enrolled</p>
      <Link
        to={id}
        className="bg-bright absolute bottom-4 right-4 px-4 py-4 rounded-md">
        Go to class =》
      </Link>
    </div>
  );
}
