import React from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import Students from "./Students";
//import es from "../assets/keywords.jpg";
const AddResult = () => {
  return (
    <AdminLayout>
      <section class="flex flex-row w-full h-full justify-center items-center">
        <div className="mx-4 my-4 w-full w-full">
          <div className="rounded-lg bg-white text-center shadow md:items-center md:p-6 xl:p-8">
            <div className="bg-blue-900">
              <h2 className="text-2xl font-medium mb-4 text-white">
                Add result for Student
              </h2>
            </div>
            <div>
              <Students />
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};
export default AddResult;
