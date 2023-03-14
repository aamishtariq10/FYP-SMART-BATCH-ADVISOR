import React, { useState, Fragment } from "react";
//import CourseCard from "./CourseCard";
import { Select, Alert, Button, Option } from "@material-tailwind/react";
const CourseList = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [courses, setCourses] = useState([
    {
      courseName: "Introduction to React",
      courseCode: "CS101",
      teacherName: "Sir Nasir",
      section: "A",
    },
    {
      courseName: "Introduction to React",
      courseCode: "CS101",
      teacherName: "Zaheer M. Gondhal",
      section: "A",
    },
    {
      courseName: "Web Development with React",
      courseCode: "CS201",
      teacherName: "Zaheer M. Gondhal",
      section: "B",
    },
  ]);
  const teachers = [
    "Teacher 1",
    "Teacher 2",
    "Teacher 3",
    "Teacher 4",
    "Teacher 5",
    "Teacher 6",
    "Teacher 7",
    "Teacher 8",
    "Teacher 9",
    "Teacher 10",
    "Teacher 11",
    "Teacher 12",
    "Teacher 13",
    "Teacher 14",
    "Teacher 15",
    "Teacher 16",
    "Teacher 17",
    "Teacher 18",
    "Teacher 19",
    "Teacher 20",
  ];
  const Sections = [
    "FA19-BCS-A",
    "FA19-BCS-B",
    "FA19-BCS-C",
    "SP20-BCS-A",
    "SP20-BCS-B",
    "SP20-BCS-C",
    "FA20-BCS-A",
    "FA20-BCS-B",
    "FA20-BCS-C",
    "SP21-BCS-A",
    "SP21-BCS-B",
    "SP21-BCS-C",
    "FA21-BCS-A",
    "FA21-BCS-B",
    "FA21-BCS-C",
    "SP22-BCS-A",
    "SP22-BCS-B",
    "SP22-BCS-C",
    "FA22-BCS-A",
    "FA22-BCS-B",
    "FA22-BCS-C",
    "SP23-BCS-A",
    "SP23-BCS-B",
    "SP23-BCS-C",
    "FA23-BCS-A",
  ];
  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  const handleStudentChange = (event) => {
    setSelectedSection(event.target.value);
  };

  //   const handleDelete = (index) => {
  //     const newCourses = [...courses];
  //     newCourses.splice(index, 1);
  //     setCourses(newCourses);
  //   };
  const [show, setShow] = useState(true);

  const handleAdd = (value) => {
    //     const newCourses = [...courses];
    //     newCourses.push({
    //       courseName: "New Course",
    //       courseCode: "CS301",
    //       section: "C",
    //     });
    //     setCourses(newCourses);

    alert("hello");

    //     <Alert
    //       show={show}
    //       animate={{
    //         mount: { y: 0 },
    //         unmount: { y: 100 },
    //       }}
    //       dismissible={{
    //         onClose: () => setShow(false),
    //       }}
    //     >
    //       A dismissible alert with custom animation.
    //     </Alert>;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teacher Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Section
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Press Go to send Request
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course, index) => (
            <tr key={course.courseCode}>
              <td className=" px-6 py-3 text-left text-xs whitespace-nowrap">
                {course.courseCode}
              </td>
              <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                {course.courseName}
              </td>
              <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                <select
                  className="bg-white focus:outline-none border border-gray-300 text-left text-xs rounded-md py-2 pl-3 pr-8 appearance-none leading-tight"
                  value={selectedTeacher}
                  onChange={handleTeacherChange}
                >
                  <option value="" className="text-left text-xs">
                    select a Teacher
                  </option>
                  {teachers.map((teacher, index) => (
                    <option
                      key={index}
                      value={teacher}
                      className="text-left text-xs"
                    >
                      {teacher}
                    </option>
                  ))}
                </select>
              </td>

              <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                {" "}
                <select
                  className="bg-white focus:outline-none border border-gray-300 text-left text-xs rounded-md py-2 pl-3 pr-8 appearance-none leading-tight"
                  value={selectedSection}
                  onChange={handleStudentChange}
                >
                  <option value="" className="text-left text-xs">
                    Section
                  </option>
                  {Sections.map((section, index) => (
                    <option
                      key={index}
                      value={section}
                      className="text-left text-xs"
                    >
                      {section}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                {/* <Fragment>
                  {!show && (
                    <Button
                      variant="gradient"
                      className="absolute"
                      value={setShow(true)}
                      onClick={handleAdd}
                    >
                      Show Alert
                    </Button>
                  )}
                </Fragment> */}

                <Button
                  onClick={handleAdd}
                  className="bg-blue-500 text-white px-4 py-2 rounded px-10"
                >
                  Add
                </Button>
              </td>
              <td className="px-6 py-3 text-left text-xs whitespace-nowrap">
                {course.gp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
