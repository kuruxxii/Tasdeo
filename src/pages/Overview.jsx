import React from "react";
import { useLoaderData } from "react-router-dom";
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
import Class from "../components/Class";

export async function loader() {
  await requireAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;
  // const professorDocRef = doc(db, "professors", professorId);
  // const professorDocSnap = await getDoc(professorDocRef);
  // if (professorDocSnap.exists()) {
  //   console.log(professorDocSnap.data());
  // } else {
  //   console.log("no such document");
  // }

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

export default function Overview() {
  const classes = useLoaderData();
  const classElements = classes.map((cls) => {
    return (
      <Class
        key={cls.classId}
        courseName={cls.courseName}
        section={cls.section}
        studentIds={cls.studentIds}
        id={cls.classId}
      />
    );
  });
  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col items-center">
        <p className="my-1.5 text-xl">2022 Fall</p>
        <div className="w-11/12 border border-gray"></div>
        <div className="w-11/12 py-5">{classElements}</div>
      </div>
    </div>
  );
}
