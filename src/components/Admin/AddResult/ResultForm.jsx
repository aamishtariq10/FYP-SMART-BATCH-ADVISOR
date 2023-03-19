import React from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import es from "../../../assets/keywords.jpg";

const ResultForm = () => {
    return (
        <AdminLayout>
            <section className="flex w-full h-full justify-center items-center">

                {/* <div className="flex justify-center items-center h-screen w-full bg-blue-400"> */}
                    <div className="w-full bg-white rounded shadow-2xl p-8 m-4">
                        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Add Student Result</h1>
                        <form action="/" method="post">
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="first_name">First Name</label>
                                <input className="border py-2 px-3 text-grey-800" type="text" name="first_name" id="first_name"/>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="last_name">Last Name</label>
                                <input className="border py-2 px-3 text-grey-800" type="text" name="last_name" id="last_name"/>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="email">Official Email</label>
                                <input className="border py-2 px-3 text-grey-800" type="email" name="email" id="email"/>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="password">Department</label>
                                <select>
                                    <option value="CS">CS</option>
                                    <option value="SE">SE</option>
                                    <option value="CE">CE</option>
                                    <option value="EE">EE</option>
                                    <option value="CHE">CHE</option>
                                    <option value="MS">MS</option>

                                </select>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="semester">Current Semester</label>
                                <input className="border py-2 px-3 text-grey-800" type="test" name="semester" id="semester"/>
                            </div>
                           
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="password">Password</label>
                                <input className="border py-2 px-3 text-grey-800" type="password" name="password" id="password"/>
                            </div>
                            <button className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Add Record</button>
                        </form>
                    </div>
                {/* </div> */}

            </section>
        </AdminLayout>
    );
};

export default ResultForm;
