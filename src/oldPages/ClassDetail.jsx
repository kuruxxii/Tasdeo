import React from "react";
import StudentList from "../components/StudentList";

export default function ClassDetail() {
  return (
    <div className="w-full h-full overflow-auto">
      <StudentList />
      <StudentList />
      <StudentList />
    </div>
  );
}
