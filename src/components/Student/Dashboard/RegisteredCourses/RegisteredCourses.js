import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Send as SendIcon } from "@mui/icons-material";
import sendRequest from "../courseRequest";
import {
  Table,
  TableHead,
  FormControl,
  InputLabel,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
const RegisteredCourses = (children) => {
  const [CoursesDetails, setCoursesDetails] = useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const RegNo = user.StudentRegNo.split("-");
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const data = {
    batch: RegNo[0],
    department: RegNo[1],
    semester: user.CurrentSemester,
    course_type: "regular",
  };
  console.log(data);

  const getData = async () => {
    try {
      const student = await axios.get(
        `http://localhost:5000/student/request/Coursereg/get/registered/${user.StudentRegNo}/${user.CurrentSemester}`,
        config
      );
      console.log(student.data.data);
      setCoursesDetails(student.data.data);
      console.log(student);
    } catch (error) {
      toast.error("No data found");
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Dashboard>
      <section className="flex h-full w-full  justify-center items-center">
        {/* <div className="mb-4 lg:flex lg:items-center lg:justify-between p-4"> */}
        <div className="w-full lg:mr-4 mb-4" style={{ overflowX: "auto" }}>
          {CoursesDetails?.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>Course Code</TableCell>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Course Credit</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Course Type</TableCell>
                  <TableCell>Course Section</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-white divide-y divide-gray-200">
                {CoursesDetails.map((course, index) => (
                  <TableRow key={course.course_code}>
                    <TableCell>{course.course_code}</TableCell>
                    <TableCell>{course.course_title}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.teacher}</TableCell>
                    <TableCell>{course.course_type}</TableCell>
                    <TableCell>{course.class_section}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
              <p>No courses to Show.</p>
            </div>
          )}

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
        {/* </div> */}
      </section>
    </Dashboard>
  );
};
export default RegisteredCourses;
