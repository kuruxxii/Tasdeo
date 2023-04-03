import React from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export default function Class({
  id,
  year,
  semester,
  courseName,
  section,
  studentIds,
}) {
  return (
    <div className="border h-44 rounded-xl px-6 py-6 mb-4 relative flex flex-col justify-around items-left">
      <p className="text-4xl">{courseName}</p>
      <p className="text-2xl">{year}</p>
      <p className="text-2xl">{semester}</p>
      <p className="text-2xl">section: {section}</p>
      <p className="text-lg">{studentIds.length} enrolled</p>
      <Link
        to={id}
        className="bg-bright absolute bottom-4 right-4 px-4 py-4 rounded-md">
        Go to class <GoArrowRight />
      </Link>
    </div>
  );
}
