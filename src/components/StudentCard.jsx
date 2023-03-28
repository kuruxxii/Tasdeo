import React from "react";
import { Link } from "react-router-dom";

export default function StudentCard({ studentId, name }) {
  return (
    <div className="w-32 h-32 border ">
      <Link to={`${studentId}/remarkrecords`}>
        <p className="text-bright text-2xl">{name}</p>
        <p>{studentId}</p>
      </Link>
      <Link to={`${studentId}/remarkform`} state={{ studentId, name }}>
        leave a remark
      </Link>
    </div>
  );
}
