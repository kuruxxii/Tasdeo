import React from "react";
import RemarkRecord from "../components/RemarkRecord";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { requireAuth } from "../util";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export async function loader() {
  await requireAuth();
  const allRemarks = [];
  const allRemarksSnapshot = await getDocs(collection(db, "remarks"));
  allRemarksSnapshot.forEach((doc) => {
    allRemarks.push(doc.data());
  });
  return allRemarks;
}

export default function RemarkRecords() {
  const allRemarks = useLoaderData();
  const studentId = useParams().studentid;
  const remarksOfThisStudent = allRemarks.filter(
    (remark) => remark.studentId === studentId
  );
  remarksOfThisStudent.sort(
    (a, b) => b.timestamp.seconds - a.timestamp.seconds
  );
  return (
    <div className="w-full h-full overflow-auto relative">
      <p className="font-extrabold text-3xl w-1/2 text-center mx-auto my-6">
        History Remarks
      </p>
      <Link className="flex items-center fixed bottom-16 right-12">
        <span className="text-2xl">Leave a Remark</span>
      </Link>
      <ol className="relative border-l border-bright w-3/5 mx-auto">
        <RemarkRecord />
        <RemarkRecord />
      </ol>
    </div>
  );
}
