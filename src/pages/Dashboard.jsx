import React from "react";
import Semester from "../components/Semester";

export default function Dashboard() {
  return (
    <div className="w-full h-full overflow-auto">
      <Semester />
      <Semester />
      <Semester />
    </div>
  );
}
