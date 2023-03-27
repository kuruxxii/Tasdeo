import React from "react";
import { Link } from "react-router-dom";

export default function StudentListItem() {
  return (
    <div className="bg-nav w-80 h-40 rounded-xl px-6 py-6 mb-4 flex flex-col justify-around items-left relative">
      <p className="text-bright text-2xl">Taha Ahamed</p>
      <p className="text-xl">20 Positive Remarks</p>
      <p className="text-lg">41 Constructive Remarks</p>
      <Link to="/history-remarks" className="absolute top-8 right-4">
        Check =》
      </Link>
    </div>
  );
}
