import React from "react";
import Semester from "../components/Semester";

export default function Overview() {
  return (
    <div className="h-full overflow-auto">
      <Semester />
      <Semester />
      <Semester />
    </div>
  );
}
