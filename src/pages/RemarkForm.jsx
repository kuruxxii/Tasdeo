import React from "react";
import { requireAuth } from "../util";
import { Link, Form, redirect, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export async function loader() {
  await requireAuth();
  return null;
}

export async function action({ request }) {
  const formData = await request.formData();
  const type = formData.get("type");
  const content = formData.get("content");
  const studentId = formData.get("studentId");
  const classId = formData.get("classId");

  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;

  const docRef = await addDoc(collection(db, "remarks"), {
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
  return (
    <div className="h-full flex justify-center items-center">
      <Link to={`/overview/${classId}`}>《= go back</Link>
      <Form replace method="post" className="flex flex-col space-y-3">
        <input type="hidden" name="classId" value={classId} />
        <input type="hidden" name="studentId" value={studentId} />
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
