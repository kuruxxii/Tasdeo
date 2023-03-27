import React from "react";
import StudentList from "../components/StudentList";

export default function ClassDetail() {
  return (
    <div className="h-full overflow-auto">
      <StudentList />
      <StudentList />
      <StudentList />
    </div>
  );
}
