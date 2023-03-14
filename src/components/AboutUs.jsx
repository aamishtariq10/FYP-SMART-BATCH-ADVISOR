import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import es from "../assets/keywords.jpg";

const AboutUs = () => {
  return (
    <MainLayout>
      <section class="flex w-full h-full justify-center items-center">
        <div class="flex flex-row justify-center space-x-10 px-10 items-center">
          <div class="w-1/2">
            <h1 class="text-4xl font-bold text-center my-4">About Us</h1>
            <p class="text-justify">
              make any necessary adjustments to your strategy
            </p>
          </div>
          <div class="w-1/2">
            <img
              // src="https://optinmonster.com/wp-content/uploads/2018/04/ultimate-seo-guide.jpg"
              src={es}
              alt="about us"
              class="w-full h-full shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;
