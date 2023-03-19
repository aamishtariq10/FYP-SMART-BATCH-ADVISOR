import React from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import es from "../../../assets/keywords.jpg";

const Profile_New = () => {
  return (
    <AdminLayout>
      <section className="flex w-full h-full justify-center items-center">
        <div className="flex flex-row justify-center space-x-10 px-10 items-center">
          <div className="w-1/2">
            <h1 className="text-4xl font-bold text-center my-4">About Us</h1>
            <p className="text-justify">
              make any necessary adjustments to your strategy
            </p>
          </div>
          <div className="w-1/2">
            <img
              // src="https://optinmonster.com/wp-content/uploads/2018/04/ultimate-seo-guide.jpg"
              src={es}
              alt="about us"
              className="w-full h-full shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Profile_New;
