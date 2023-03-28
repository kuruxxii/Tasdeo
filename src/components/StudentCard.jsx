import React from "react";

export default function StudentCard({ studentId, name }) {
  return (
    <div className="w-32 h-32 border ">
      <p className="text-bright text-2xl">{name}</p>
      <p>{studentId}</p>
      {/* <p className="text-xl">20 Positive Remarks</p> */}
      {/* <p className="text-lg">41 Constructive Remarks</p> */}
      {/* <Link to="/history-remarks" className="absolute top-8 right-4">
        Check =》
      </Link> */}
    </div>
  );
}
