import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GoPencil } from "react-icons/go";

export default function StudentCard({
  studentId,
  name,
  tag,
  numOfRemarks,
  positiveRate,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="w-80 h-48 border border-gray mb-6 relative">
      <Link
        to={`${studentId}/remarkrecords`}
        state={{ search: searchParams.toString() }}>
        <p className="text-bright text-2xl">{name}</p>
        <p>{studentId}</p>
        <p>{tag}</p>
        <p>History Remarks: {numOfRemarks}</p>
        <p>Positive tag rate: {`${(positiveRate * 100).toFixed(2)}%`}</p>
      </Link>
      <Link
        to={`${studentId}/remarkform`}
        state={{ search: searchParams.toString() }}
        className="absolute bottom-2 right-2">
        <GoPencil />
        leave a remark
      </Link>
    </div>
  );
}
