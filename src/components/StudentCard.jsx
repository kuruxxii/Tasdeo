import React from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";

export default function StudentCard({ studentId, name }) {
  return (
    <div className="w-80 h-48 border border-gray mb-6 relative">
      <Link to={`${studentId}/remarkrecords`}>
        <p className="text-bright text-2xl">{name}</p>
        <p>{studentId}</p>
      </Link>
      <Link
        to={`${studentId}/remarkform`}
        state={{ studentId, name }}
        className="absolute bottom-2 right-2">
        <GoPencil />
        leave a remark
      </Link>
    </div>
  );
}
