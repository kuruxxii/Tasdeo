import React from "react";
import StudentList from "../components/StudentList";
import { useParams } from "react-router-dom";

export default function ClassDetail() {
  let { classid } = useParams();

  return (
    <div className="h-full overflow-auto">
      {`this is classdetail ${classid}`}
      {/* <StudentList />
      <StudentList />
      <StudentList /> */}
    </div>
  );
}
