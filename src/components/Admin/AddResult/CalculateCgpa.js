import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  FormControl,
  TextField,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const calculate = (filteredData) => {
  const { gpaSum, creditSum } = filteredData.reduce(
    (result, item) => {
      const credit = item.CourseCredit
        ? parseInt(item.CourseCredit.split("(")[0])
        : 0;
      const parsedCredit = isNaN(credit) ? 0 : credit;
    //  console.log(item.GPA);
      result.gpaSum += item.GPA * parsedCredit;
      result.creditSum += parsedCredit;
      return result;
    },
    { gpaSum: 0, creditSum: 0 }
  );

  if (creditSum === 0) {
    return 0;
  }

  const gpaAverage = gpaSum / creditSum;

//   console.log("Sum of multiplied GPAs:", gpaSum);
//   console.log("Sum of course credits:", creditSum);
//   console.log("GPA Average:", gpaAverage);

  return gpaAverage;
};

const CalculateCgpa = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const {
    session,
    gpa,
    selectedRegNo,
    courseCredit,
    StudentStatus,
    onCgpapaUpdate,
    courseCode,
    ResultID,
    lg,
  } = props;
  const isDataMissing =
    !session ||
    gpa == null ||
    !selectedRegNo ||
    !courseCredit ||
    !StudentStatus ||
    !courseCode;
  useEffect(() => {
    setDisabled(isDataMissing);
    setErrorMsg("please select all the fields");
  }, [isDataMissing]);
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
//   console.log(session);
//   console.log(gpa);
//   console.log(selectedRegNo);
//   console.log(courseCredit);
//   console.log(StudentStatus);

  const StudentRegNo = selectedRegNo;
  const handleCalculateCgpa = async (e) => {
    const newData = {
      Grade_LG: lg,
      ResultID,
      SessionYear: session,
      CourseCode: courseCode,
      GPA: gpa,
      CourseCredit: courseCredit,
      CourseStatus: StudentStatus,
    };
    // try {
    const res = await axios.get(
      `http://localhost:5000/admin/results/get/allresults?selectedRegNo=${StudentRegNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
   // console.log(res);
    if (res.status !== "200") {
      setErrorMsg(res.data.message);
    }
    if (!res.data.data) {
      onCgpapaUpdate(gpa);
    } else {
      const data = res.data.data;
      console.log(data);
      console.log(ResultID);
      const sameResultID = ResultID
        ? [...data.filter((item) => item.ResultID != newData.ResultID), newData]
        : [...data,newData];
      console.log("filtered", sameResultID);
      const filteredData = sameResultID.filter(
        (item) =>
          !(item.CourseStatus === "withdraw" && item.Grade_LG === "withdraw")
      );
     console.log(filteredData);
     
      const highestGPACourseRecord = filteredData
        .filter((record) => record.CourseCode === courseCode)
        .reduce(
          (highestRecord, record) =>
            record.GPA >= highestRecord.GPA ? record : highestRecord,
          { GPA: 0 }
        );
     console.log(".............", highestGPACourseRecord.GPA);
      let ResultantData;
      if (highestGPACourseRecord.GPA === 0) {
        ResultantData = filteredData;
      } else {
        ResultantData = highestGPACourseRecord
          ? [
              ...filteredData.filter(
                (item) => item.CourseCode != highestGPACourseRecord.CourseCode
              ),
              highestGPACourseRecord,
            ]
          : filteredData;
      }
   console.log(ResultantData);
      if (!ResultantData) {
        onCgpapaUpdate(gpa);
      } else {
        const semesterGpa = calculate(ResultantData);
      console.log(semesterGpa);
        onCgpapaUpdate(semesterGpa);
      }
    }
  };
  return (
    <>
      <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
        <Button
          type="button"
          onClick={handleCalculateCgpa}
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Calculate CGpa
        </Button>
      </div>
    </>
  );
};

export default CalculateCgpa;
