import React from "react";
import RemarkRecord from "../components/RemarkRecord";
import { MdCommentBank } from "react-icons/Md";
import { Link } from "react-router-dom";
import { requireAuth } from "../util";

export async function loader() {
  await requireAuth();
  return null;
}

export default function RemarkRecords() {
  return (
    <div className="w-full h-full overflow-auto relative">
      <p className="font-extrabold text-3xl w-1/2 text-center mx-auto my-6">
        History Remarks of <span className="text-bright">Taha Ahamed</span>
      </p>
      <Link className="flex items-center fixed bottom-16 right-12">
        <MdCommentBank className="text-5xl mr-1" />
        <span className="text-2xl">Leave a Remark</span>
      </Link>
      <ol class="relative border-l border-bright w-3/5 mx-auto">
        <RemarkRecord />
        <RemarkRecord />
      </ol>
    </div>
  );
}
