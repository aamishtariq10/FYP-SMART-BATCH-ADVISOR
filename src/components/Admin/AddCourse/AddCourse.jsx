import React from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import es from "../../../assets/keywords.jpg";

const AddCourse = () => {
    return (
        <AdminLayout>
            <section className="flex w-full h-full justify-center items-center">

                {/* <div className="flex justify-center items-center h-screen w-full bg-blue-400"> */}
                    <div className="w-full bg-white rounded shadow-2xl p-8 m-4">
                        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Add New Course</h1>
                        <form action="/" method="post">
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="course_name">Enter Course Name</label>
                                <input className="border py-2 px-3 text-grey-800" type="text" name="course_name" id="course_name"/>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="teacher_name">Enter Teacher Name</label>
                                <input className="border py-2 px-3 text-grey-800" type="text" name="teacher_name" id="teacher_name"/>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="credit_hours">Credit Hours</label>
                                <input className="border py-2 px-3 text-grey-800" type="number" name="credit_hours" id="credit_hours"/>
                            </div>
                           
                            <button className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Add Record</button>
                        </form>
                    </div>
                {/* </div> */}

            </section>
        </AdminLayout>
    );
};

export default AddCourse;
