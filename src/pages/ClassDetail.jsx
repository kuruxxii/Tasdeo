import React from "react";
import StudentCard from "../components/StudentCard";
import { useParams, useLoaderData, useSearchParams } from "react-router-dom";
import { requireAuth } from "../util";
import { getAuth } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { CSVLink } from "react-csv";

export async function loader() {
  await requireAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;

  // 获取该教授的所有课程信息
  const classes = [];
  const clsq = query(
    collection(db, "classes"),
    where("professorId", "==", professorId)
  );
  const querySnapshot = await getDocs(clsq);
  querySnapshot.forEach((doc) => {
    let classInfo = doc.data();
    classInfo.classId = doc.id;
    classes.push(classInfo);
  });

  // 获取所有学生信息
  const students = [];
  const studentsSnapshot = await getDocs(collection(db, "students"));
  studentsSnapshot.forEach((doc) => {
    students.push(doc.data());
  });

  return { classes, students };
}

export default function ClassDetail() {
  let { classid } = useParams();
  const { classes, students } = useLoaderData();
  const thisClass = classes.filter((cls) => cls.classId === classid)[0];
  const studentsOfThisClass = [];
  for (const studentId of thisClass.studentIds) {
    for (const student of students) {
      if (student.studentId === studentId) {
        studentsOfThisClass.push(student);
      }
    }
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  const displayed = tagFilter
    ? studentsOfThisClass.filter((std) => std.tag === tagFilter)
    : studentsOfThisClass;
  const studentCardElements = displayed.map((std) => {
    return (
      <StudentCard
        key={std.studentId}
        name={std.name}
        studentId={std.studentId}
        tag={std.tag}
      />
    );
  });

  return (
    <div className="h-full overflow-auto p-5">
      <div className="space-x-3 flex">
        <p>Filters: </p>
        <button onClick={() => setSearchParams({ tag: "good" })}>GOOD</button>
        <button onClick={() => setSearchParams({ tag: "bad" })}>BAD</button>
        <button onClick={() => setSearchParams({ tag: "average" })}>
          AVERAGE
        </button>
        <button onClick={() => setSearchParams({})}>Clear Filter</button>
      </div>
      <div className="p-5 border border-gray w-11/12 grid grid-cols-4 justify-items-center content-start">
        {studentCardElements}
      </div>
      <button className="w-40 h-16 border rounded-lg">
        <CSVLink data={studentsOfThisClass}>Download CSV</CSVLink>
      </button>
    </div>
  );
}
