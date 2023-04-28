import React from "react";
import RemarkRecord from "../components/RemarkRecord";
import { Link, useLoaderData, useParams, useLocation } from "react-router-dom";
import { requireAuth } from "../util";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { CSVLink } from "react-csv";
import { BiEditAlt } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import { BiExit } from "react-icons/bi";
import EmptyRemarkRecords from "../components/EmptyRemarkRecords.jsx";

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
  function toDateTime(secs) {
    let t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  function toMonthWord(month) {
    let word = "";
    switch (month) {
      case 0:
        word = "Jan.";
        break;
      case 1:
        word = "Feb.";
        break;
      case 2:
        word = "Mar.";
        break;
      case 3:
        word = "Apr.";
        break;
      case 4:
        word = "May.";
        break;
      case 5:
        word = "Jun.";
        break;
      case 6:
        word = "July";
        break;
      case 7:
        word = "Aug.";
        break;
      case 8:
        word = "Sept.";
        break;
      case 9:
        word = "Oct.";
        break;
      case 10:
        word = "Nov.";
        break;
      case 11:
        word = "Dec.";
        break;
      default:
        word = "There's no such month";
    }
    return word;
  }

  const location = useLocation();
  const search = location.state?.search || "";

  const { allRemarks, allProfessors } = useLoaderData();
  const classId = useParams().classid;
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
      time={`${toMonthWord(
        toDateTime(remark.timestamp.seconds).getMonth()
      )} ${toDateTime(remark.timestamp.seconds).getDate()}`}
      professorName={
        allProfessors.filter((pf) => pf.professorId === remark.professorId)[0]
          .professorName
      }
      type={remark.type}
      content={remark.content}
    />
  ));
  const remarkData = [];
  for (const remark of remarksOfThisStudent) {
    const r = {};
    r.time = `${toMonthWord(
      toDateTime(remark.timestamp.seconds).getMonth()
    )} ${toDateTime(remark.timestamp.seconds).getDate()}`;
    r.professorName = allProfessors.filter(
      (pf) => pf.professorId === remark.professorId
    )[0].professorName;
    r.type = remark.type;
    r.content = remark.content;
    remarkData.push(r);
  }

  if (elements.length === 0) {
    return <EmptyRemarkRecords classId={classId} studentId={studentId} />;
  } else {
    return (
      <div className="w-full h-screen overflow-auto relative">
        <div className="mt-4 text-sm lg:text-base">
          <button className="bg-[#dee1e7] hover:bg-[#9d98ad] active:bg-[#776c8b] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-4 py-2 rounded-full fixed right-4 lg:right-16 flex justify-center items-center">
            <BiExit className="mr-1" />
            <Link to={`/overview/${classId}?${search}`}>RETURN</Link>
          </button>
          <button className="bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-6 py-2 rounded-full ml-4 flex justify-center items-center">
            <BiDownload className="mr-1" />
            <CSVLink data={remarkData} filename={`${studentId}.csv`}>
              DOWNLOAD
            </CSVLink>
          </button>
        </div>
        <p className="font-extrabold text-3xl text-center mx-auto my-6">
          History Remarks
        </p>
        <button className="bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-6 py-2 rounded-full flex justify-center items-center fixed bottom-24 right-4 lg:right-16">
          <BiEditAlt className="mr-1" />
          <Link to={`/overview/${classId}/${studentId}/remarkform`}>
            REMARK
          </Link>
        </button>
        <ol className="relative border-l border-[#d7bb5b] w-3/5 mx-auto">
          {elements}
        </ol>
      </div>
    );
  }
}
