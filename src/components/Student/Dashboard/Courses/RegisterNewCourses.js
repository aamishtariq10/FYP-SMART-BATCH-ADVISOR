import React, { useState, Fragment, useEffect } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Send as SendIcon } from "@mui/icons-material";
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

const RegisterNewCourses = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [CoursesDetails, setCoursesDetails] = useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const RegNo = user.StudentRegNo.split("-");
  const data = {
    batch: RegNo[0],
    department: RegNo[1],
    semester: user.CurrentSemester,
    course_type: "regular",
  };
  console.log(data);

  const getData = async () => {
    try {
      const student = await axios.post(
        "http://localhost:5000/student/addedcourses/get",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(student.data.data);
      setCoursesDetails(student.data.data);
      // setRows(student.data.data);
      console.log(student);
    } catch (error) {
      // toast.error("No data found");
    }
  };

  console.log(CoursesDetails);
  React.useEffect(() => {
    getData();
  }, []);

  const handleAddCourse = (course_code) => {
    const selectedCourse = CoursesDetails.find(
      (course) => course.course_code === course_code
    );
    if (selectedCourse) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
  };
  
  const handleRemove = (courseCode) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course.course_code !== courseCode)
    );
  };
  const handleSubmit = () => {
    // Send the selected courses via axios request
    console.log("Selected Courses:", selectedCourses);
  };
  return (
    <Dashboard>
      <section className="flex h-full w-full  justify-center items-center">
        {/* <div className="mb-4 lg:flex lg:items-center lg:justify-between p-4"> */}
        <div className="w-full lg:mr-4 mb-4" style={{ overflowX: "auto" }}>
          {CoursesDetails.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>Course Code</TableCell>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Course Credit</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Course Type</TableCell>
                  <TableCell>Action</TableCell>
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
               
                    <TableCell>
                      {selectedCourses.some(
                        (selectedCourse) =>
                          selectedCourse.course_code === course.course_code
                      ) ? (
                        <Button
                          className="bg-red-500 text-white px-4 py-2 rounded px-10"
                          onClick={() => handleRemove(course.course_code)}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => handleAddCourse(course.course_code)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mr-2"
                        >
                          Add
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No courses to Show.</p>
          )}
          {CoursesDetails.length > 0 ? (
            <div className="   flex justify-end mt-4">
              <div
                className={`w-18 rounded-md ${
                  selectedCourses.length > 0 ? "bg-blue-400" : "bg-gray-400"
                } `}
              >
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!selectedCourses.length}
                  className="flex items-center justify-center space-x-1 h-12 px-4 mx-4 text-sm font-medium rounded-full shadow-lg sm:text-base sm:px-6 bg-orange-900 text-white"
                >
                  <span className="sm:inline-block text-white">
                    Send Request
                  </span>
                  <SendIcon
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          ) : null}
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

export default RegisterNewCourses;
