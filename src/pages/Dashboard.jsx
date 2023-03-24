import React from "react";
import ClassTime from "../components/ClassTime";

export default function Dashboard() {
  return (
    <div className="w-full h-full overflow-auto">
      <ClassTime />
      <ClassTime />
      <ClassTime />
    </div>
  );
}
