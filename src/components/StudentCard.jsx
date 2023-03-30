import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GoPencil } from "react-icons/go";

export default function StudentCard({ studentId, name, tag }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="w-80 h-48 border border-gray mb-6 relative">
      <Link
        to={`${studentId}/remarkrecords`}
        // state={{ search: `?${searchParams.toString()}` }}>
        state={{ search: searchParams.toString() }}>
        <p className="text-bright text-2xl">{name}</p>
        <p>{studentId}</p>
        <p>{tag}</p>
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
