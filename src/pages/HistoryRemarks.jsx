import React from "react";
import Remark from "../components/Remark";

export default function HistoryRemarks() {
  return (
    <div className="w-full h-full overflow-auto">
      <p className="font-extrabold text-3xl w-1/2 text-center mx-auto my-6">
        History Remarks of <span className="text-bright">Taha Ahamed</span>
      </p>
      <ol class="relative border-l border-bright w-3/4 mx-auto">
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
