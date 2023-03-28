import React from "react";
import Student from "../components/Student";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { requireAuth } from "../util";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function loader() {
  await requireAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;

  // 获取该教授的所有课程信息
  const classes = [];
  const q = query(
    collection(db, "classes"),
    where("professorId", "==", professorId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let classInfo = doc.data();
    classInfo.classId = doc.id;
    classes.push(classInfo);
  });

  return classes;
}

export default function ClassDetail() {
  let { classid } = useParams();
  const thisClass = useLoaderData().filter((cls) => cls.classId === classid)[0];
  console.log(thisClass);
  const studentIds = thisClass.studentIds;
  console.log(studentIds);

  return (
    <div className="h-full overflow-auto">
      {`this is classdetail ${classid}`}
      {/* <StudentList />
      <StudentList />
      <StudentList /> */}
    </div>
  );
}
