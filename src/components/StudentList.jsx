import React from "react";

export default function StudentList() {
  return (
    <div className="w-11/12 mx-auto">
      <p className="text-4xl font-bold my-6">Doing-Well List</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-nav w-80 h-40 rounded-xl px-6 py-6 mb-4 flex flex-col justify-around items-left relative">
          <p className="text-bright text-2xl">Taha Ahamed</p>
          <p className="text-xl">20 Positive Remarks</p>
          <p className="text-lg">41 Constructive Remarks</p>
          <Link to="/history-remarks" className="absolute top-8 right-4">
            Check =》
          </Link>
        </div>
      </div>
    </div>
  );
}
