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
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <div className="z-0 absolute top-0 w-full h-screen  bg-welcome-image bg-center bg-cover"></div>
      <div className="z-0 absolute top-0 w-full h-screen  bg-black/75 bg-center bg-cover"></div>
      <div className="z-10 flex px items-start justify-between flex-col space-y-10 absolute top-3/4 w-full min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center space-y-10 w-full h-full">
          <h1 className="text-5xl text-white font-bold">
            Your story starts with us
          </h1>
          <p className="text-xl text-white w-1/2">
            This is a simple example of a Landing Page you can build using
            Material Tailwind. It features multiple components based on the
            Tailwind CSS and Material Design by Google.
          </p>
          <div className="w-full bg-white h-auto">
            <section className="flex w-full px-20">
              <div className="w-1/2">
                <UserCircleIcon className="h-20 mt-10" />
                <p className="mt-10 text-2xl font-bold">
                  Working with us is a pleasure
                </p>
                <p className="mt-10 text-lg text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae, soluta. Laudantium ab nemo aliquid accusantium
                  nulla totam fugit, maiores quos eius velit deleniti impedit
                  voluptate? Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Commodi, qui laboriosam! Vel necessitatibus voluptate
                  optio ducimus doloribus! Provident asperiores enim molestiae
                  ratione ea ipsam ducimus nostrum ut id dolor blanditiis odit
                  doloremque reprehenderit, cum, quod expedita. Beatae a enim
                  labore voluptas non odio sed repellendus accusamus sapiente
                  facilis officiis deleniti, et, neque dolorem nam iste, odit
                  perferendis animi maiores exercitationem atque doloremque
                  dicta magni facere. Molestias maxime voluptatem a natus sunt
                  ipsa, mollitia ratione ea sed dolores facilis, deleniti
                  cupiditate est reiciendis, hic beatae saepe! Reiciendis quos
                  repellat corrupti id, ut animi sapiente iure quae dolores.
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
              <p className="text-4xl font-bold">Build something</p>
              <p className="w-1/2 text-xl">
                Put the potentially record low maximum sea ice extent tihs year
                down to low ice. According to the National Oceanic and
                Atmospheric Administration, Ted, Scambos.
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
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput id="name" sizing="sm" type="text" />
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
