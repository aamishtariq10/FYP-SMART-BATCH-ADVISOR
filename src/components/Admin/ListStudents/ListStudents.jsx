import React from "react";
import { Admin_Layout } from "../../../layouts/Admin_Layout";
import Students from "./Students";
//import es from "../assets/keywords.jpg";
const ListStudents = () => {
  return (
    <Admin_Layout>
      <section class="flex flex-row w-full h-full justify-center items-center">
        <div className="mx-4 my-4 w-full w-full">
          <div className="rounded-lg bg-white text-center shadow md:items-center md:p-6 xl:p-8">
            <div className="bg-blue-900">
              <h2 className="text-2xl font-medium mb-4 text-white">
                Students List
              </h2>
            </div>
            <div>
              <Students />
            </div>
          </div>
        </div>
      </section>
    </Admin_Layout>
  );
};
export default ListStudents;
