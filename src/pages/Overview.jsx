import React from "react";
import Semester from "../components/Semester";
import { useLoaderData } from "react-router-dom";
import { requireAuth } from "../util";

export async function loader() {
  await requireAuth();
  return "this is a huge step";
}

export default function Overview() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="h-full overflow-auto">
      <Semester />
      <Semester />
      <Semester />
    </div>
  );
}
