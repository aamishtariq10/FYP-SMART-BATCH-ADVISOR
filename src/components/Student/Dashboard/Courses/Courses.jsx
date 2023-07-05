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
  TextField,
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

  const departmentOptions = ["BAF", "BAI", "BAR", "BBA", "BCE", "BCS", "BDE", "BEC", "BEE", "BEN", "BID", "BMC", "BPH", "BPY", "BSE", "BSM", "BST", "CHE", "PCH", "PCS", "PEE", "PHM", "PMS", "PMT", "PPC", "PPH", "PST", "R06", "RBA", "RCH", "RCP", "RCS", "REC", "REE", "REL", "RMS", "RMT", "RNE", "RPH", "RPM", "RPY", "RST",
  ];
  const sessions = ["FA19", "SP20", "FA20", "SP21", "FA21", "SP22", "FA22", "SP23", "FA23"];

  const Sections = sessions.flatMap((session) =>
    departmentOptions.flatMap((department) => [
      `${session}-${department}-A`,
      `${session}-${department}-B`,
      `${session}-${department}-C`,
    ])
  );


  console.log(Sections);
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
                    {/* <InputLabel htmlFor={`TeacherInput-${course.course_code}`}>Teacher</InputLabel> */}
                    <TextField
                      placeholder="teacher name"
                      id={`TeacherInput-${course.course_code}`}
                      value={selectedCourses.find((c) => c.course_code === course.course_code)?.teacher || ''}
                      onChange={(event) => handleTeacherChange(event, course.course_code, course.course_title, course.credits, course.course_type)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                    />
                  </FormControl>

                </TableCell>
                <TableCell>
                  <select
                    id={`SectionSelect-${course.course_code}`}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedCourses.find((c) => c.course_code === course.course_code)?.section || ''}
                    onChange={(event) => handleSectionChange(event, course.course_code, course.course_title, course.credits, course.course_type)}
                  >
                    <option value="">Select a section</option>
                    {Sections.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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
