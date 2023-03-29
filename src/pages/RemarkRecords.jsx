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
  const allProfessors = [];
  const professorsSnapshot = await getDocs(collection(db, "professors"));
  professorsSnapshot.forEach((doc) => {
    let professorInfo = {};
    professorInfo.professorId = doc.id;
    professorInfo.professorName = doc.data().name;
    allProfessors.push(professorInfo);
  });
  return { allRemarks, allProfessors };
}

export default function RemarkRecords() {
  const { allRemarks, allProfessors } = useLoaderData();
  const studentId = useParams().studentid;
  const remarksOfThisStudent = allRemarks.filter(
    (remark) => remark.studentId === studentId
  );
  remarksOfThisStudent.sort(
    (a, b) => b.timestamp.seconds - a.timestamp.seconds
  );
  const elements = remarksOfThisStudent.map((remark) => (
    <RemarkRecord
      key={remark.timestamp.seconds}
      time={remark.timestamp.seconds}
      professorName={
        allProfessors.filter((pf) => pf.professorId === remark.professorId)[0]
          .professorName
      }
      content={remark.content}
    />
  ));
  return (
    <div className="w-full h-full overflow-auto relative">
      <p className="font-extrabold text-3xl w-1/2 text-center mx-auto my-6">
        History Remarks
      </p>
      <Link className="flex items-center fixed bottom-16 right-12">
        <span className="text-2xl">Leave a Remark</span>
      </Link>
      <ol className="relative border-l border-bright w-3/5 mx-auto">
        {elements}
      </ol>
    </div>
  );
}
