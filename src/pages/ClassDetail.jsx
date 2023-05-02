import React, { useState } from "react";
import StudentCard from "../components/StudentCard";
import { useParams, useLoaderData, useSearchParams } from "react-router-dom";
import { requireAuth } from "../util";
import { getAuth } from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { BiFilter } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { BiFile } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";

export async function loader() {
  await requireAuth();
  // const auth = getAuth();
  // const user = auth.currentUser;
  // 获取教授信息
  const professorId = localStorage.getItem("uid");

  // 获取该教授的所有课程信息
  const classes = [];
  const clsq = query(
    collection(db, "classes"),
    where("professorId", "==", professorId)
  );
  const querySnapshot = await getDocs(clsq);
  querySnapshot.forEach((doc) => {
    let classInfo = doc.data();
    classInfo.classId = doc.id;
    classes.push(classInfo);
  });

  // 获取所有学生信息
  const students = [];
  const studentsSnapshot = await getDocs(collection(db, "students"));
  studentsSnapshot.forEach((doc) => {
    students.push(doc.data());
  });

  // 获取remarks（用于导出）
  const allRemarks = [];
  const allRemarksSnapshot = await getDocs(collection(db, "remarks"));
  allRemarksSnapshot.forEach((doc) => {
    allRemarks.push(doc.data());
  });

  return { classes, students, allRemarks };
}

export default function ClassDetail() {
  let { classid } = useParams();
  const { classes, students, allRemarks } = useLoaderData();
  const thisClass = classes.filter((cls) => cls.classId === classid)[0];
  const studentsOfThisClass = [];
  for (const studentId of thisClass.studentIds) {
    for (const student of students) {
      if (student.studentId === studentId) {
        studentsOfThisClass.push(student);
      }
    }
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  const displayed = tagFilter
    ? studentsOfThisClass.filter((std) => std.tag === tagFilter)
    : studentsOfThisClass;

  const csvData = [];
  for (const std of displayed) {
    const data = {};
    data.name = std.name;
    data.studentId = std.studentId;
    data.tag = std.tag;
    const remarksOfThisStudent = allRemarks.filter(
      (remark) => remark.studentId == std.studentId
    );
    data.numberOfRemarks = remarksOfThisStudent.length;
    data.positiveRemarkRate = `${(
      (remarksOfThisStudent.filter((remark) => remark.type === "positive")
        .length /
        remarksOfThisStudent.length) *
      100
    ).toFixed(2)}%`;
    csvData.unshift(data);
  }

  displayed.sort((a, b) => b.studentId - a.studentId);

  const studentCardElements = displayed.map((std) => {
    const remarksOfThisStudent = allRemarks.filter(
      (remark) => remark.studentId == std.studentId
    );
    return (
      <StudentCard
        key={std.studentId}
        name={std.name}
        studentId={std.studentId}
        tag={std.tag}
        numOfRemarks={remarksOfThisStudent.length}
        positiveRate={
          remarksOfThisStudent.filter((remark) => remark.type === "positive")
            .length / remarksOfThisStudent.length
        }
        deleteStudent={deleteStudent}
      />
    );
  });

  const [jsonData, setJsonData] = useState(null);

  const studentIds = [];
  for (const std of studentsOfThisClass) {
    studentIds.unshift(std.studentId);
  }

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

  const confirmAddition = async (event) => {
    event.currentTarget.disabled = true;
    if (jsonData) {
      const duplicatedStudentIds = [];
      const invalidStudentIds = [];

      const allStudentIds = [];
      for (const std of students) {
        allStudentIds.unshift(std.studentId);
      }

      for (const std of JSON.parse(jsonData)) {
        if (studentIds.includes(Number(std.studentId))) {
          duplicatedStudentIds.push(Number(std.studentId));
        }
        if (!allStudentIds.includes(Number(std.studentId))) {
          invalidStudentIds.unshift(Number(std.studentId));
        }
      }

      if (duplicatedStudentIds.length === 0 && invalidStudentIds.length === 0) {
        const prevStudentIds = thisClass.studentIds;
        for (const std of JSON.parse(jsonData)) {
          prevStudentIds.unshift(Number(std.studentId));
        }
        const stdListRef = doc(db, "classes", thisClass.classId);
        await updateDoc(stdListRef, {
          studentIds: prevStudentIds,
        });
        toast.success("Students Added!");
        window.location.reload();
      } else if (duplicatedStudentIds.length !== 0) {
        alert(`Duplicated StudentIds: ${duplicatedStudentIds}`);
      } else {
        alert(`Invalid StudentIds: ${invalidStudentIds}`);
      }
    } else {
      alert("no file input received");
    }
    setTimeout(() => (event.currentTarget.disabled = false), 5000);
  };

  async function deleteStudent(studentId) {
    let decision = confirm(
      "This deletion cannot be recovered. Are you sure to proceed?"
    );
    if (decision) {
      let afterDeletion = thisClass.studentIds.filter((id) => id !== studentId);
      const clsRef = doc(db, "classes", classid);
      await updateDoc(clsRef, {
        studentIds: afterDeletion,
      });
      window.location.reload();
      toast.success("Deletion Completed!");
    }
  }

  return (
    <div className="shadow-lg bg-white h-screen mt-4 rounded-xl overflow-auto w-11/12 mx-auto py-4 flex flex-col">
      <p className="text-xl lg:text-2xl font-bold text-center mb-4">
        {thisClass.courseName}
      </p>
      <div className="text-base lg:text-lg mt-2 mb-4 px-4 flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <BiFile className="mr-2 text-lg lg:text-xl" />
            <label
              htmlFor="register"
              className="text-lg lg:text-xl font-bold self-start">
              Add Students (.csv only)
            </label>
          </div>
          <input
            type="file"
            id="register"
            accept=".csv"
            className="text-sm file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-600
          hover:file:bg-violet-100"
            onChange={handleFileUpload}></input>
          <button
            onClick={confirmAddition}
            className="text-sm lg:text-base bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 w-1/3 lg:w-1/4 mx-auto px-4 py-2 rounded-full flex items-center justify-center space-x-2">
            <BiUpload className="mr-1" />
            UPLOAD
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <BiFilter className="text-lg lg:text-xl" />
            <p className="ml-2 font-bold text-lg lg:text-xl">Tag Filters</p>
          </div>
          <div className="flex space-x-4 text-sm lg:text-base">
            <button
              className="bg-[#c4b6b2] hover:bg-[#eec195] active:bg-[#5d4d2b] transition duration-150 ease-in-out hover:shadow-lg text-white px-4 py-1 lg:py-2 rounded-full"
              onClick={() => setSearchParams({ tag: "good" })}>
              GOOD
            </button>
            <button
              className="bg-[#c4b6b2] hover:bg-[#eec195] active:bg-[#5d4d2b] transition duration-150 ease-in-out hover:shadow-lg text-white px-4 py-1 g:py-2 rounded-full"
              onClick={() => setSearchParams({ tag: "bad" })}>
              BAD
            </button>
            <button
              className="bg-[#c4b6b2] hover:bg-[#eec195] active:bg-[#5d4d2b] transition duration-150 ease-in-out hover:shadow-lg text-white px-4 py-1 lg:py-2 rounded-full"
              onClick={() => setSearchParams({ tag: "average" })}>
              AVERAGE
            </button>
            <button onClick={() => setSearchParams({})}>Reset</button>
          </div>
          <button className="text-sm lg:text-base bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 lg:w-1/4 mx-auto px-4 py-2 rounded-full flex items-center justify-center space-x-2">
            <BiDownload />
            <CSVLink
              data={csvData}
              filename={
                tagFilter
                  ? `${thisClass.courseName} (${tagFilter}).csv`
                  : `${thisClass.courseName}.csv`
              }>
              {tagFilter
                ? `DOWNLOAD with tag filter "${tagFilter}"`
                : "DOWNLOAD"}
            </CSVLink>
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="font-bold flex items-center ml-1 text-lg lg:text-xl">
            <BiGroup className="mr-2 text-lg lg:text-xl" />
            Students in This Class
          </div>
          <div className="px-1 lg:grid lg:grid-cols-5">
            {studentCardElements}
          </div>
        </div>
      </div>
    </div>
  );
}
