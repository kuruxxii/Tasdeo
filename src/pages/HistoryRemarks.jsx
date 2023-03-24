import React from "react";
import Remark from "../components/Remark";
import { MdCommentBank } from "react-icons/Md";
import { Link } from "react-router-dom";

export default function HistoryRemarks() {
  return (
    <div className="w-full h-full overflow-auto relative">
      <p className="font-extrabold text-3xl w-1/2 text-center mx-auto my-6">
        History Remarks of <span className="text-bright">Taha Ahamed</span>
      </p>
      <Link
        to="/remark-form"
        className="flex items-center fixed bottom-16 right-12">
        <MdCommentBank className="text-5xl mr-1" />
        <span className="text-2xl">Leave a Remark</span>
      </Link>
      <ol class="relative border-l border-bright w-3/5 mx-auto">
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
        <Remark />
      </ol>
    </div>
  );
}
