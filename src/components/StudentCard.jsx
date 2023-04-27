import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";

export default function StudentCard({
  studentId,
  name,
  tag,
  numOfRemarks,
  positiveRate,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="mb-4 lg:mb-8 flex justify-between items-center lg:flex-col lg:space-y-4 lg:items-center">
      <Link
        to={`${studentId}/remarkrecords`}
        state={{ search: searchParams.toString() }}
        className="flex flex-col space-y-2">
        <p className="text-lg font-bold">{name}</p>
        <p>{studentId}</p>
        <p className="hidden lg:block">
          {tag != null ? `status: ${tag}` : null}
        </p>
        <p className="hidden lg:block">
          <span className="font-bold">{numOfRemarks}</span> History Remark(s)
        </p>
        <p className="hidden lg:block">
          <span className="font-bold mr-2">
            {!isNaN(positiveRate)
              ? `${(positiveRate * 100).toFixed(2)}% Positive Remark Rate`
              : null}
          </span>
        </p>
      </Link>
      <Link
        to={`${studentId}/remarkform`}
        state={{ search: searchParams.toString() }}
        className="text-sm bg-[#d7bb5b] px-4 py-2 rounded-full flex justify-center items-center">
        <BiPencil className="mr-1" />
        Leave a Remark
      </Link>
    </div>
  );
}
