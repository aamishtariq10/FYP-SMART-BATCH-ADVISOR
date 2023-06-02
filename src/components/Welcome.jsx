import React from "react";
import "../assets/Header.css";
import sc from "../assets/space.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "./Welcome/Navbar";
import FooterWelcome from "./Welcome/Footer";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button, Card, Label, TextInput } from "flowbite-react";
import Services from "./Welcome/Services";
const Welcome = () => {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <div className="z-0 absolute top-0 w-full h-screen  bg-welcome-image bg-center bg-cover"></div>
      <div className="z-0 absolute top-0 w-full h-screen  bg-black/75 bg-center bg-cover"></div>
      <div className="z-10 flex px items-start justify-between flex-col space-y-10 absolute top-3/4 w-full min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center space-y-10 w-full h-full">
          <h1 className="text-5xl text-white font-bold">
            Smart Batch Advisor
          </h1>

          <div className="w-full bg-white h-auto">
            <section className="flex w-full px-20">
              <div className="w-1/2">
                <UserCircleIcon className="h-20 mt-10" />
                <p className="mt-10 text-2xl font-bold">
                  Main Goal
                </p>
                <p className="mt-10 text-lg text-justify">
                  The application we aim to design will provide the students with a smart platform that collects the student’s data and guides them accordingly to improve their grades and get out of prob status. The application uses smart techniques and algorithms to collect the data provided by the students and, keeping in view the data, advise them on the Electives or courses they should pick that might help them improve their grades
                </p>
              </div>
              <div className="p-5">
                <Card>
                  <img
                    src="https://demos.creative-tim.com/material-tailwind-kit-react/img/teamwork.jpeg"
                    alt="demo"
                    className="w-auto h-auto"
                  />
                </Card>
              </div>
            </section>
            {/* Build something */}
            <section
              id="aboutus"
              className="w-full h-full flex flex-col items-center space-y-10 p-10 bg-gray-100"
            >
              <p className="text-4xl font-bold">Easing things Up</p>
              <p className="w-1/2 text-xl">
                This project aims to provide a facility for students and batch advisors so that their workload can be reduced, and the registration process can be made less hectic and time taking
              </p>
              <Services />
            </section>
            <section
              id="contactus"
              className="w-full h-full flex flex-col items-center space-y-10 px-20 pb-10 bg-gray-100"
            >
              <p className="text-4xl font-bold">Contact Us</p>
              <div className="flex flex-col gap-4 w-1/2">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Email" value="Email" />
                  </div>
                  <TextInput id="Email" sizing="sm" type="text" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="subject" value="Subject" />
                  </div>
                  <TextInput id="subject" sizing="md" type="text" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="message" value="Message" />
                  </div>
                  <TextInput id="message" sizing="lg" type="text" />
                </div>
                <div>
                  <Button>Submit</Button>
                </div>
              </div>
            </section>

          </div>
        </div>
        <FooterWelcome />
      </div>
    </div>
  );
};
export default Welcome;
