import React from "react";
//import { MainLayout } from "../../../../layouts/MainLayout";
// import es from "../../../assets/keywords.jpg";
import Dashboard from "../Dashboard";
import CourseList from "./Courses";
const PendingCourses = () => {
  return (
    <Dashboard>
      <section className="flex w-full h-full justify-center items-center">
        <div className="flex flex-row justify-center space-x-10 px-10 items-center">
          <div className="my-4 w-full">
            <CourseList />
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

export default PendingCourses;
