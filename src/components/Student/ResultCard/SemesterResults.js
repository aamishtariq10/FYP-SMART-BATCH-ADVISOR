import React from "react";
//    import { MainLayout } from "../../../layouts/MainLayout";
//import es from "../assets/keywords.jpg";

const SemesterResults = () => {
  const semesters = [
    {
      semester: "Fall 2022",
      cgpa: "3.2",
      courses: [
        {
          courseNo: "CSC101",
          courseTitle: "Introduction to ICT",
          credit: 3,
          marks: 66,
          lg: "C+",
          gp: 2.3,
        },

        {
          courseNo: "CSC102",
          courseTitle: "Programming Fundamentals",
          credit: 4,
          marks: 82,
          lg: "A-",
          gp: 3.7,
        },
      ],
    },
    {
      semester: "Spring 2023",
      cgpa: "3.2",
      courses: [
        {
          courseNo: "CSC102",
          courseTitle: "Programming Fundamentals",
          credit: 4,
          marks: 82,
          lg: "A-",
          gp: 3.7,
        },
      ],
    },
  ];

  return (
    <section class="flex flex-row w-full h-full justify-center items-center">
      <div className=" my-4 w-full w-full ">
        {semesters.map((semester, index) => (
          <div className=" my-4 text-center md:items-center ">
            <div className="bg-gray-700">
              <h2 className="text-2xl font-medium mb-4 text-white">
                {semester.semester}
              </h2>
            </div>
            <div className="flex  overflow-x-auto  bg-gray-100 ">
              <table className="min-w-full divide-y table-auto  divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      L.G.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      G.P.
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {semester.courses.map((course) => (
                    <tr key={course.courseNo}>
                      <td className=" px-6 py-3 text-left text-xs whitespace-nowrap">
                        {course.courseNo}
                      </td>
                      <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                        {course.courseTitle}
                      </td>
                      <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                        {course.credit}
                      </td>
                      <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                        {course.marks}
                      </td>
                      <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                        {course.lg}
                      </td>
                      <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                        {course.gp}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <th className="px-6 py-3 text-left text-xs font-medium text-black-900 uppercase tracking-wider">
                  CGPA :<span> {semester.cgpa}</span>
                </th>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default SemesterResults;
