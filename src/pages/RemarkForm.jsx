import React from "react";
import { requireAuth } from "../util";
import { useLoaderData, Form, redirect, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

export async function loader() {
  await requireAuth();
  return null;
}

export async function action({ request }) {
  const formData = await request.formData();
  formData.append("studentId", stdId);
  console.log(formData.values());
  const type = formData.get("type");
  const content = formData.get("content");
  // const studentId = formData.get("studentId");
  // console.log(studentId);

  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;

  // return redirect("/");
  return null;
}

export default function RemarkForm() {
  return (
    <div className="h-full flex justify-center items-center">
      <Form replace method="post" className="flex flex-col space-y-3">
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
