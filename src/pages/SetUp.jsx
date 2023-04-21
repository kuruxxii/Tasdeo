import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useLoaderData, Form, redirect } from "react-router-dom";
import { requireAuth } from "../util";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

export async function loader() {
  await requireAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;
  // 获取所有学生信息
  const students = [];
  const studentsSnapshot = await getDocs(collection(db, "students"));
  studentsSnapshot.forEach((doc) => {
    students.push(doc.data());
  });

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
  return { students, classes };
}

export async function action({ request }) {
  const auth = getAuth();
  const user = auth.currentUser;
  // 获取教授信息
  const professorId = user.uid;

  const formData = await request.formData();
  const courseName = formData.get("courseName");
  const year = Number(formData.get("year"));
  const semester = formData.get("semester");
  const section = formData.get("section");

  const classesjson = formData.get("classesjson");
  const classes = JSON.parse(classesjson);

  if (
    classes.filter(
      (cls) =>
        cls.courseName === courseName &&
        cls.year === year &&
        cls.semester === semester &&
        cls.section === section
    ).length === 1
  ) {
    alert("class section already exists!");
  } else {
    let classCount =
      classes.filter(
        (cls) => cls.year === Number(year) && cls.semester === semester
      ).length + 1;

    let sectionCode;
    switch (section) {
      case "none":
        sectionCode = 5;
        break;
      case "a":
        sectionCode = 4;
        break;
      case "b":
        sectionCode = 3;
        break;
      case "c":
        sectionCode = 2;
        break;
      case "d":
        sectionCode = 1;
        break;
    }

    const orderCode = Number(
      year.toString() + classCount.toString() + sectionCode.toString()
    );
    const docRef = await addDoc(collection(db, "classes"), {
      courseName,
      orderCode,
      professorId,
      section,
      semester,
      year,
      studentIds: [],
    });
    toast.success("Class Added!");
  }

  return null;
}

export default function SetUp() {
  const { students, classes } = useLoaderData();
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
            toast.success("Student List Uploaded!");
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
        <label htmlFor="students">Upload Student List(.csv only):</label>
        <input
          type="file"
          id="students"
          name="students"
          accept=".csv"
          onChange={handleFileUpload}></input>
        <button onClick={handleStudentsSubmit}>Confirm</button>
      </div>
      <div>
        <Form replace method="post" className="w-64 flex flex-col space-y-3">
          <input
            type="hidden"
            name="classesjson"
            value={JSON.stringify(classes)}
          />
          <label htmlFor="courseName" maxLength="40">
            Course Name
          </label>
          <input type="text" id="courseName" name="courseName" required />
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            step="1"
            min={`${new Date().getFullYear()}`}
            max="2099"
            placeholder={`${new Date().getFullYear()}`}
            required
          />
          <label htmlFor="semester-select">Choose semester:</label>

          <select name="semester" id="semester-select" required>
            <option value="">--Please choose a semester--</option>
            <option value="spring">spring</option>
            <option value="fall">fall</option>
            <option value="virtual">virtual</option>
          </select>

          <label htmlFor="semester-select">Choose section:</label>

          <select name="section" id="section-select" required>
            <option value="">--Please choose a section--</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="virtual">none</option>
          </select>

          <button type="submit">Add Class</button>
        </Form>
      </div>
    </div>
  );
}
