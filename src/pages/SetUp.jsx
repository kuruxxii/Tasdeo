import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { requireAuth } from "../util";

export async function loader() {
  await requireAuth();
  // 获取所有学生信息
  const students = [];
  const studentsSnapshot = await getDocs(collection(db, "students"));
  studentsSnapshot.forEach((doc) => {
    students.push(doc.data());
  });
  return students;
}

export default function SetUp() {
  const students = useLoaderData();
  const studentIds = [];
  for (const std of students) {
    studentIds.unshift(std.studentId);
  }

  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const jsonData = JSON.stringify(results.data);
        setJsonData(jsonData);
      },
    });
  };

  const handleStudentsSubmit = async (event) => {
    if (jsonData) {
      const duplicatedStudentIds = [];
      for (const std of JSON.parse(jsonData)) {
        if (studentIds.includes(Number(std.studentId))) {
          duplicatedStudentIds.push(Number(std.studentId));
        }
      }
      if (duplicatedStudentIds.length === 0) {
        for (const std of JSON.parse(jsonData)) {
          try {
            const docRef = await addDoc(collection(db, "students"), {
              name: std.name,
              studentId: Number(std.studentId),
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      } else {
        alert(`Duplicated StudentIds: ${duplicatedStudentIds}`);
      }
    } else {
      alert("no file input received");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="students">Import or Add Student List(.csv only):</label>
        <input
          type="file"
          id="students"
          name="students"
          accept=".csv"
          onChange={handleFileUpload}></input>
        <button onClick={handleStudentsSubmit}>Confirm</button>
      </div>
    </div>
  );
}
