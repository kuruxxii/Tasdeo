import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { BiUserX } from "react-icons/bi";

export default function StudentCard({
  studentId,
  name,
  tag,
  numOfRemarks,
  positiveRate,
  deleteStudent,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="text-sm lg:text-base mb-4 lg:mb-8 flex justify-between items-center lg:flex-col lg:space-y-4 lg:items-start relative">
      <Link
        to={`${studentId}/remarkrecords`}
        state={{ search: searchParams.toString() }}
        className="flex flex-col space-y-2">
        <p className="text-base lg:text-lg font-bold">{name}</p>
        <p>{studentId}</p>
        <p className="hidden lg:block">
          {tag != null ? `Status: ${tag}` : null}
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
        className="text-sm bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-4 py-2 rounded-full flex justify-center items-center lg:self-start">
        <BiPencil className="mr-1" />
        LEAVE A REMARK
      </Link>
      <BiUserX
        className="absolute hidden lg:block text-2xl right-4 -top-3 text-slate-300 hover:text-slate-600 active:text-slate-900"
        onClick={() => deleteStudent(studentId)}
      />
    </div>
  );
}
