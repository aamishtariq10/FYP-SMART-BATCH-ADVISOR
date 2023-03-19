import React from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import es from "../../../assets/keywords.jpg";
const renderOptions = () => {
  const options = [];
  for (let i = 18; i <= 30; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return options;
};

const AddBatchAdvisor = () => {
  return (
    <AdminLayout>
      <section className="flex w-full h-full justify-center items-center">
        {/* <div className="flex justify-center items-center h-screen w-full bg-blue-400"> */}
        <div className="w-full bg-white rounded shadow-2xl p-8 m-4">
          <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
            Add Batch Advisor
          </h1>
          <form action="/" method="post">
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-bold text-lg text-gray-900"
                htmlFor="full_name"
              >
                Enter Full Name
              </label>
              <input
                className="border py-2 px-3 text-grey-800"
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Faculty Name"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-bold text-lg text-gray-900"
                htmlFor="batch"
              >
                Enter Batch
              </label>
              <div className="row">
                <select
                  name="batch_time"
                  id="batch_time"
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  <option value="0">Select Semester</option>
                  <option value="FA">FA</option>
                  <option value="SP">SP</option>
                </select>
                <select
                  name="batch_year"
                  id="batch_year"
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  <option value="0">Select Year</option>
                  <option value="0">Select</option>
                  {renderOptions()}
                </select>
                <select name="dept" id="dept" style={{ marginRight: "10px" }}>
                  <option value="0">Select Departement</option>
                  <option value="BCS">BCS</option>
                  <option value="BSE">BSE</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BBA">BBA</option>
                  <option value="BAF">BAF</option>
                  <option value="BEE">BEE</option>
                  <option value="BCE">BCE</option>
                  <option value="CHE">CHE</option>
                </select>
                <select name="section" id="section">
                  <option value="0">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </div>
            </div>
            <button
              className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded"
              type="submit"
            >
              Add Record
            </button>
          </form>
        </div>
        {/* </div> */}
      </section>
    </AdminLayout>
  );
};

export default AddBatchAdvisor;
