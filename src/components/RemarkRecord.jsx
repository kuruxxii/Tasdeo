import React from "react";

export default function RemarkRecord({ time, professorName, content }) {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-bright rounded-full mt-1.5 -left-1.5 border border-bright"></div>
      <time className="mb-1 text-sm font-normal leading-none">{time}</time>
      <h3 className="text-lg font-semibold">by {professorName}</h3>
      <p className="font-normal">{content}</p>
    </li>
  );
}
