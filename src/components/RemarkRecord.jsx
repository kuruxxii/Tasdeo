import React from "react";
import { BiHappy } from "react-icons/bi";
import { BiSad } from "react-icons/bi";

export default function RemarkRecord({ time, professorName, type, content }) {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-[#d7bb5b] rounded-full mt-1.5 -left-1.5 border border-[#d7bb5b]"></div>
      <time className="mb-1 text-sm font-normal leading-none">{time}</time>
      <h3 className="text-base flex items-center">
        <div className="mr-2">
          {type === "positive" ? <BiHappy /> : <BiSad />}
        </div>
        <span className="font-semibold">{`by ${professorName}`}</span>
      </h3>
      <p className="font-normal italic">{content}</p>
    </li>
  );
}
