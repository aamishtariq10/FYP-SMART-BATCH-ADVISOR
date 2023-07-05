import React, { useState, Fragment } from "react";
//import CourseCard from "./CourseCard";
import { Send as SendIcon } from '@mui/icons-material';
import { ToastContainer, toast } from "react-toastify";
import sendRequest from "../courseRequest";
import {
  Table,
  TableHead,
  FormControl,
  InputLabel,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const CourseList = (props) => {
  const { courses } = props

  const [teacher, setSelectedTeacher] = useState("");
  const [section, setSelectedSection] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  console.log(selectedCourses)
  const handleAdd = (course) => {
    const updatedCourse = { ...course, teacher, section };
    setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, updatedCourse]);
  };

  const handleRemove = (course_code) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.filter((course) => course.course_code !== course_code)
    );
  };

  const handleSubmit = async () => {
    console.log("Selected Courses:", selectedCourses);
    try {
      const res = await sendRequest(selectedCourses);
      toast.info(res.message)
      setSelectedCourses([])
      console.log("res", res.message);
    } catch (error) {
      toast.info("Internal Server Error")
    }
  };
  const handleTeacherChange = (event, course_code, course_title, credits, course_type) => {
    const { value } = event.target;
    const existingCourse = selectedCourses.find((course) => course.course_code === course_code);

    if (existingCourse) {
      const updatedCourses = selectedCourses.map((course) => {
        if (course.course_code === course_code) {
          return { ...course, teacher: value };
        }
        return course;
      });
      setSelectedCourses(updatedCourses);
    } else if (value && value !== '') {
      const selectedCourse = {
        course_code: course_code,
        course_title: course_title,
        course_type: course_type,
        credits: credits,
        teacher: value,
      };
      setSelectedCourses((prevCourses) => [...prevCourses, selectedCourse]);
    }
  };

  const handleSectionChange = (event, course_code, course_title, credits, course_type) => {
    const { value } = event.target;
    const existingCourse = selectedCourses.find((course) => course.course_code === course_code);

    if (existingCourse) {
      const updatedCourses = selectedCourses.map((course) => {
        if (course.course_code === course_code) {
          return { ...course, section: value };
        }
        return course;
      });
      setSelectedCourses(updatedCourses);
    } else if (value && value !== '') {
      const selectedCourse = {
        course_code: course_code,
        courseName: course_title,
        credit: credits,
        course_type: course_type,
        section: value,
      };
      setSelectedCourses((prevCourses) => [...prevCourses, selectedCourse]);
    }
  };


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

  return (
    // <div className="mb-4 lg:flex lg:items-center lg:justify-between p-4">
    <div className="w-full lg:mr-4 mb-4" style={{ overflowX: 'auto' }}>
      {courses.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>Course Code</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Credit</TableCell>
              <TableCell>Course Type</TableCell>
              <TableCell>Select Teacher Name</TableCell>
              <TableCell>Select Section</TableCell>
              <TableCell>Press to Add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white divide-y divide-gray-200">
            {courses.map((course, index) => (
              <TableRow key={course.course_code}>
                <TableCell>{course.course_code}</TableCell>
                <TableCell>{course.course_title}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.course_type}</TableCell>

                <TableCell>
                  <FormControl className="w-full mr-2" size="small">
                    <InputLabel id={`TeacherInput-${course.course_code}`}> Teacher</InputLabel>
                    <Select
                      labelId={`TeacherSelect-${course.course_code}`}
                      id={`TeacherSelect-${course.course_code}`}
                      value={selectedCourses.find((c) => c.course_code === course.course_code)?.teacher || ''}
                      onChange={(event) => handleTeacherChange(event, course.course_code, course.course_title, course.credits, course.course_type)}

                    >
                      {teachers.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell>
                  <FormControl className="w-full mr-2" size="small">
                    <InputLabel id={`SectionInput-${course.course_code}`}>Section</InputLabel>
                    <Select
                      labelId={`SectionSelect-${course.course_code}`}
                      id={`SectionSelect-${course.course_code}`}
                      value={selectedCourses.find((c) => c.course_code === course.course_code)?.section || ''}
                      onChange={(event) => handleSectionChange(event, course.course_code, course.course_title, course.credits, course.course_type)}
                    >
                      {Sections.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell>
                  {selectedCourses.some((selectedCourse) => selectedCourse.course_code === course.course_code) ? (
                    <Button
                      className="bg-red-500 text-white px-4 py-2 rounded px-10"
                      onClick={() => handleRemove(course.course_code)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      disabled={!(teacher && section)}
                      className="bg-blue-500 text-white px-4 py-2 rounded px-10"
                      onClick={() => handleAdd(course)}
                    >
                      Add
                    </Button>
                  )}


                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
          <p>No courses to Show.</p>
        </div>
      )}
      {courses.length > 0 ? (
        <div className="   flex justify-end mt-4">
          <div
            className={`w-18 rounded-md ${selectedCourses.length > 0 ? 'bg-blue-400' : 'bg-gray-400'} `}
          >
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedCourses.length}
              className="flex items-center justify-center space-x-1 h-12 px-4 mx-4 text-sm font-medium rounded-full shadow-lg sm:text-base sm:px-6 bg-orange-900 text-white"
            >
              <span className="sm:inline-block text-white">Send Request</span>
              <SendIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : null}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* 
      </div> */}

    </div >

  );
};

export default CourseList;
