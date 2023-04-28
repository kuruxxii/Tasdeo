import React from "react";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ReactComponent as Addnote } from "../images/addnote.svg";

export default function EmptyRemarkRecords({ classId, studentId }) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-8">
      <Addnote className="w-1/2 h-auto lg:w-1/4" />
      <p className="lg:text-xl">
        There are no remarks given to this student yet!
      </p>
      <button className="bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-4 py-2 rounded-full flex justify-center items-center w-1/2 lg:w-1/6">
        <BiPencil className="mr-1" />
        <Link to={`/overview/${classId}/${studentId}/remarkform`}>
          LEAVE A REMARK
        </Link>
      </button>
    </div>
  );
}
