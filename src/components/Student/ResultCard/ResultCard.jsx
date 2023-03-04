import React from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import SemesterResults from "./SemesterResults";
//import es from "../assets/keywords.jpg";
const ResultCard = () => {
  return (
    <MainLayout>
      <section class="flex flex-row w-full h-full justify-center items-center">
        <div className="mx-4 my-4 w-full w-full">
          <div className="rounded-lg bg-white text-center shadow md:items-center md:p-6 xl:p-8">
            <div className="bg-blue-900">
              <h2 className="text-2xl font-medium mb-4 text-white">
                Result Card
              </h2>
            </div>
            <table className=" rounded-lg divide-y divide-gray-600">
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-medium text-start">Name:</td>
                  <td className="px-4 py-2 text-start">Aamish Tariq</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-start">RegNo:</td>
                  <td className="px-4 py-2">FA19-BCS-087</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-start">Batch:</td>
                  <td className="px-4 py-2 text-start">FA19</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-start">Program:</td>
                  <td className="px-4 py-2 text-start">BSCS</td>
                </tr>
              </tbody>
            </table>
            <div>
              <SemesterResults />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
export default ResultCard;
