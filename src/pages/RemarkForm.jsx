import React from "react";
import { requireAuth } from "../util";
import {
  Link,
  Form,
  redirect,
  useParams,
  useLoaderData,
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

  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;

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
  let classId = useParams().classid;
  let studentId = useParams().studentid;
  const allRemarks = useLoaderData();
  const remarksOfThisStudent = allRemarks.filter(
    (remark) => remark.studentId === studentId
  );
  const negativeRemarks = remarksOfThisStudent.filter(
    (remark) => remark.type === "negative"
  );
  let tag = "";
  if (negativeRemarks.length * 2 > remarksOfThisStudent.length) {
    tag = "bad";
  } else if (negativeRemarks.length / remarksOfThisStudent.length <= 0.1) {
    tag = "good";
  } else {
    tag = "average";
  }
  return (
    <div className="h-full flex justify-center items-center">
      <Link to={`/overview/${classId}`}>
        <GoArrowLeft /> go back
      </Link>
      <Form replace method="post" className="flex flex-col space-y-3">
        <input type="hidden" name="classId" value={classId} />
        <input type="hidden" name="studentId" value={studentId} />
        <input type="hidden" name="tag" value={tag} />
        <div>
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
          required
          name="content"
          placeholder=" please be kind and friendly..."
          rows="5"
          cols="33"
          maxLength={70}></textarea>
        <button type="submit">confirm</button>
      </Form>
    </div>
  );
}
