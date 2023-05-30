import React from "react";
//import { MainLayout } from "../../../../layouts/MainLayout";
import Dashboard from "../Dashboard";
//import es from "../assets/keywords.jpg";

const registeredCourses = (children) => {
  return (
    //<MainLayout>
    <Dashboard>
      <section className="flex w-full h-full justify-center items-center">
        <div className="flex flex-row justify-center space-x-10 px-10 items-center">
          <div className="">
            <h1 className="text-4xl font-bold text-center my-4">
              This page is Under Development
            </h1>
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

export default registeredCourses;
