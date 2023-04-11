import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ImportCSV() {
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
      console.log(jsonData);
      for (const std of JSON.parse(jsonData)) {
        console.log(std);
        try {
          const docRef = await addDoc(collection(db, "students"), {
            name: std.name,
            studentId: std.studentId,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    } else {
      alert("no file input received");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="students">
          Import or Update Student List(.csv only):
        </label>
        <input
          type="file"
          id="students"
          name="students"
          accept=".csv"
          onChange={handleFileUpload}></input>
        <button onClick={handleStudentsSubmit}>Confirm</button>
      </div>
      <br />
      <div>
        <button>Import or Update Course</button>
      </div>
    </div>
  );
}
