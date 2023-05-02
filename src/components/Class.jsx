import React from "react";
import { Link } from "react-router-dom";
import { BiDoorOpen } from "react-icons/bi";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Class({
  id,
  year,
  semester,
  courseName,
  section,
  studentIds,
  db,
}) {
  async function deleteClass() {
    let decision = confirm(
      "This deletion cannot be recovered. Are you sure to proceed?"
    );
    if (decision) {
      await deleteDoc(doc(db, "classes", id));
      toast.success("Deletion Completed!");
      window.location.reload();
    }
  }
  return (
    <div className="shadow-lg bg-white h-48 rounded-xl space-y-4 px-6 py-6 mb-4 relative flex flex-col justify-around items-left relative">
      <p className="text-lg font-bold">{courseName}</p>
      <span className="text-base capitalize">{`${year} ${semester}`}</span>
      <p className="text-base capitalize">section {section}</p>
      <p className="text-base capitalize">
        <span className="font-bold">{studentIds.length}</span> enrolled
      </p>
      <button className="bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 absolute bottom-4 right-4 px-4 py-2 rounded-full flex justify-center items-center w-1/2 lg:w-1/6">
        <BiDoorOpen className="mr-1" />
        <Link to={id}>GO TO CLASS</Link>
      </button>
      <button
        className="absolute hidden lg:block right-4 top-4 text-slate-300 hover:text-slate-600 active:text-slate-900"
        onClick={deleteClass}>
        DELETE CLASS
      </button>
    </div>
  );
}
