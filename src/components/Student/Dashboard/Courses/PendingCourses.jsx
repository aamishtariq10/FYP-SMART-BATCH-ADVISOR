import React, { useState, useEffect } from "react";
//import { MainLayout } from "../../../../layouts/MainLayout";
// import es from "../../../assets/keywords.jpg";
import Dashboard from "../Dashboard";
import CourseList from "./Courses";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const PendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const getData = async () => {
    try {
      const student = await axios.get(
        `http://localhost:5000/student/pendingcourses/${user.StudentRegNo}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(student.data.data);
      setCourses(student.data.data);

      console.log(student);
    } catch (error) {
      toast.error("No data found");
    }
  };

  console.log(courses);
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Dashboard>
      <section className="flex h-full w-full  justify-center items-center">
        <CourseList courses={courses} />
      </section>
    </Dashboard>
  );
};

export default PendingCourses;
