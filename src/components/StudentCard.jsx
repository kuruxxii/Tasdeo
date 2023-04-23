import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function StudentCard({
  studentId,
  name,
  tag,
  numOfRemarks,
  positiveRate,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="my-4 flex justify-between items-center">
      <Link
        to={`${studentId}/remarkrecords`}
        state={{ search: searchParams.toString() }}>
        <p className="text-lg font-bold">{name}</p>
        <p>{studentId}</p>
        <p className="hidden">status: {tag}</p>
        <p className="hidden">History Remarks: {numOfRemarks}</p>
        <p className="hidden">
          Positive tag rate: {`${(positiveRate * 100).toFixed(2)}%`}
        </p>
      </Link>
      <Link
        to={`${studentId}/remarkform`}
        state={{ search: searchParams.toString() }}
        className="text-sm bg-amber-400 bg-bright px-4 py-2 rounded-full">
        leave a remark
      </Link>
    </div>
  );
}
