import React from "react";
import { requireAuth } from "../util";
import { useLoaderData } from "react-router-dom";
import { getAuth } from "firebase/auth";

export async function loader() {
  await requireAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;

  return "msg";
}

export default function RemarkForm() {
  return <div>RemarkForm</div>;
}
