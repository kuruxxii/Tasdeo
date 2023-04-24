import React from "react";
import { requireAuth } from "../util";
import {
  Link,
  Form,
  redirect,
  useParams,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { GoArrowLeft } from "react-icons/go";

export async function loader() {
  await requireAuth();
  const allRemarks = [];
  const allRemarksSnapshot = await getDocs(collection(db, "remarks"));
  allRemarksSnapshot.forEach((doc) => {
    allRemarks.push(doc.data());
  });
  return allRemarks;
}

export async function action({ request }) {
  const formData = await request.formData();
  const type = formData.get("type");
  const content = formData.get("content");
  const studentId = formData.get("studentId");
  const classId = formData.get("classId");
  const tag = formData.get("tag");

  // const auth = getAuth();
  // const user = auth.currentUser;
  // 获取教授信息
  const professorId = localStorage.getItem("uid");

  // 给学生添加tag
  const querySnapshot = await getDocs(collection(db, "students"));
  let studentDocId;
  querySnapshot.forEach((doc) => {
    if (doc.data().studentId == studentId) {
      studentDocId = doc.id;
    }
  });
  const studentRef = doc(db, "students", studentDocId);
  await updateDoc(studentRef, {
    tag,
  });

  // 添加remark
  const remarkDocRef = await addDoc(collection(db, "remarks"), {
    studentId,
    professorId,
    type,
    content,
    timestamp: serverTimestamp(),
  });

  return redirect(`/overview/${classId}/${studentId}/remarkrecords`);
}

export default function RemarkForm() {
  const location = useLocation();
  const search = location.state?.search || "";
  let classId = useParams().classid;
  let studentId = useParams().studentid;
  const allRemarks = useLoaderData();
  const remarksOfThisStudent = allRemarks.filter(
    (remark) => remark.studentId === studentId
  );
  const positveRate =
    remarksOfThisStudent.filter((remark) => remark.type === "positive").length /
    remarksOfThisStudent.length;
  let tag = "";
  if (positveRate <= 0.1) {
    tag = "bad";
  } else if (positveRate >= 0.85) {
    tag = "good";
  } else {
    tag = "average";
  }
  return (
    <div className="w-full h-screen relative">
      <Link
        to={`/overview/${classId}?${search}`}
        className="text-sm bg-slate-400 bg-bright px-4 py-2 rounded-full absolute right-4 bottom-1/3">
        RETURN
      </Link>
      <p className="mt-4 mb-4 w-11/12 mx-auto text-center">
        !! Your remark has great significance to the student.
      </p>
      <div className="w-11/12 mx-auto flex justify-center items-center bg-white rounded-xl px-6 py-6 mb-4">
        <Form
          replace
          method="post"
          className="flex flex-col items-left space-y-3">
          <input type="hidden" name="classId" value={classId} />
          <input type="hidden" name="studentId" value={studentId} />
          <input type="hidden" name="tag" value={tag} />
          <div className="space-x-2">
            <input
              required
              type="radio"
              name="type"
              id="positive"
              value="positive"
              defaultChecked
            />
            <label htmlFor="positive">Positive</label>
            <input
              required
              type="radio"
              name="type"
              id="negative"
              value="negative"
            />
            <label htmlFor="negative">Negative</label>
          </div>
          <textarea
            className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            required
            name="content"
            placeholder=" please be kind and friendly..."
            rows="5"
            cols="33"
            maxLength={100}></textarea>
          <button
            type="submit"
            className="self-center text-sm w-28 bg-amber-400 bg-bright px-4 py-2 rounded-full">
            CONFIRM
          </button>
        </Form>
      </div>
    </div>
  );
}
