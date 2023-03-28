import React from "react";
import Class from "../components/Class";

export default function ClassTime() {
  return (
    <div className="flex flex-col items-center">
      <p className="my-1.5 text-xl">2022 Fall</p>
      <div className="w-11/12 border border-gray"></div>
      <div className="w-11/12 py-5">
        <Class />
        <Class />
        <Class />
      </div>
    </div>
  );
}
