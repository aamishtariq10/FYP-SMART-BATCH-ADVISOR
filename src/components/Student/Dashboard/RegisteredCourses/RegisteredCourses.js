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
            <h1 className="text-4xl font-bold text-center my-4">About Us</h1>
            <p className="text-justify">
              At <i>APSS</i>, we understand the importance of a strong online
              presence in today's digital world. That's why we're dedicated to
              and algorithm updates to ensure that your website is always at the
              forefront of search engine rankings. We also provide regular
              reporting and analysis to keep you informed of your progress and
              make any necessary adjustments to your strategy.{" "}
            </p>
          </div>
          <div className="">
            <img
              // src="https://optinmonster.com/wp-content/uploads/2018/04/ultimate-seo-guide.jpg"
              // src={es}
              alt="about us"
              className="w-full h-full shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

export default registeredCourses;
