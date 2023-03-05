import React from "react";
//    import { MainLayout } from "../../../layouts/MainLayout";
//import es from "../assets/keywords.jpg";
import { Link } from "react-router-dom";

const Students = () => {
  const students_data = [
    {
      name: "Umair",
      departement: "CS",
      rollNo: "1",
      semester: "2",
      cgpa: "3.5",
    },
    {
      name: "Aamsih",
      departement: "SE",
      rollNo: "2",
      semester: "2",
      cgpa: "3.5",
    },
    {
      name: "Saad",
      departement: "SE",
      rollNo: "2",
      semester: "2",
      cgpa: "3.5",
    },
    {
      name: "Hamza",
      departement: "SE",
      rollNo: "2",
      semester: "2",
      cgpa: "3.5",
    },
  ];

  return (
    <section class="flex flex-row w-full h-full justify-center items-center">
      <div className=" my-4 w-full w-full ">
        <div className=" my-4 text-center md:items-center ">
          <div className="bg-gray-700">
            <h2 className="text-2xl font-medium mb-4 text-white"></h2>
          </div>
          <div className="flex  overflow-x-auto  bg-gray-100 ">
            <table className="min-w-full divide-y table-auto  divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    C.G.P.A
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students_data.map((index) => (
                  <tr key={index.name}>
                    <td className=" px-6 py-3 text-left text-xs whitespace-nowrap">
                      {index.name}
                    </td>
                    <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                      {index.departement}{" "}
                    </td>
                    <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                      {index.rollNo}{" "}
                    </td>
                    <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                      {index.semester}{" "}
                    </td>
                    <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                      {index.cgpa}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Students;
