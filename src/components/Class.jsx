import React from "react";
import { Link } from "react-router-dom";

export default function Class({
  id,
  year,
  semester,
  courseName,
  section,
  studentIds,
}) {
  return (
    <div className="bg-white h-40 rounded-xl px-6 py-6 mb-4 relative flex flex-col justify-around items-left">
      <p className="text-lg font-bold">{courseName}</p>
      <span className="text-base capitalize">{`${year} ${semester}`}</span>
      <p className="text-base capitalize">section {section}</p>
      <p className="text-base capitalize">
        <span className="font-bold">{studentIds.length}</span> enrolled
      </p>
      <button className="bg-amber-400 bg-bright absolute bottom-4 right-4 px-4 py-2 rounded-full">
        <Link to={id}>Go to class</Link>
      </button>
    </div>
  );
}
