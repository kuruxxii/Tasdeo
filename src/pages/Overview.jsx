import React from "react";
import { useLoaderData } from "react-router-dom";
import { requireAuth } from "../util";
import { getAuth } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import Class from "../components/Class";
import EmptyOverview from "../components/emptyOverview";

export async function loader() {
  await requireAuth();
  // const auth = getAuth();
  // const user = auth.currentUser;
  // 获取教授信息
  const professorId = localStorage.getItem("uid");

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
  classes.sort((a, b) => b.orderCode - a.orderCode);
  const classElements = classes.map((cls) => {
    return (
      <Class
        key={cls.classId}
        year={cls.year}
        semester={cls.semester}
        courseName={cls.courseName}
        section={cls.section}
        studentIds={cls.studentIds}
        id={cls.classId}
      />
    );
  });

  if (classElements.length === 0) {
    return <EmptyOverview />;
  } else {
    return (
      <div className="overflow-auto">
        <div className="flex flex-col items-center">
          <div className="w-11/12 py-4">{classElements}</div>
        </div>
      </div>
    );
  }
}
