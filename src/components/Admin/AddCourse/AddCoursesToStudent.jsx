
import React, { useEffect, useState } from "react";
import {  toast } from 'react-toastify';
import { AppBar, Toolbar, Box, Typography, Select,  InputLabel, Table, TableHead, TableBody, TableRow, TableCell, MenuItem, IconButton, FormControl, TextField, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { BatchOptions,  DepartmentOptions, semesters } from "../../../utils/DropDowns";
import ContentPasteOffSharpIcon from '@mui/icons-material/ContentPasteOffSharp';
import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';
import { Send as SendIcon } from '@mui/icons-material';
import { useNavigate,  useLocation } from "react-router-dom";
const AddCoursesToStudent = () => {
  const BatchOption = BatchOptions();
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  console.log(id)
  const data = location.state?.data;
  //console.log("data",data)
  const navigate = useNavigate();
  const batchOptions = BatchOptions()
  const DepartmentOption = [...DepartmentOptions];
  const [Batch, setBatch] = useState("");
  const [courseDetails, setCourseDetails] = useState([]);
  const [department, setDepartment] = useState('');
  const [session, setSession] = useState('');
  const [newCourse, setNewCourse] = useState({ courseTitle: '', courseCode: '', credits: '', preRequisite: '', courseType: "" });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [Semester, setSemester] = useState("");
  const [teacher, setTeacher] = useState('');
  const [enableEditing, setEnableEditing] = useState(false)

  useEffect(() => {
    if (data) {

      console.log(data)
      setDepartment(data.department)
      setSession(data.sessionyear)
      const courses = JSON.parse(data.courseslist)
      console.log(courses)
      setCourseDetails(courses)
    }
    else {
      setEnableEditing(true)
    }
  }, [data]);
  const [addedCourses, setAddedCourses] = useState([]);

  const handleAddCourse = (index, course) => {
    const updatedAddedCourses = [...addedCourses];
    updatedAddedCourses.push(course);
    setAddedCourses(updatedAddedCourses);
  };

  const handleEnableEditing = () => {
    setEnableEditing(!enableEditing)
  }
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };
  const handleRemoveCourse = (course) => {
    const updatedAddedCourses = addedCourses.filter((addedCourse) => {
      return addedCourse !== course;
    });
    setAddedCourses(updatedAddedCourses);
  };

  console.log(addedCourses)

  const formData = {
    scheme_id: data.scheme_id,
    Batch,
    Semester,
    teacher,
    courses: addedCourses,
  };
  const AddCourses = async (e) => {
    e.preventDefault();
    try {
      const add = await axios.post('http://localhost:5000/admin/studentcourses/addnew', formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        },
      );
      if (add.data.status == '200') {
        toast.info(add.data.message, { autoClose: 1500 })
        setTimeout(() => {
          navigate("/admin/schemeofstudy");
        }, 1000);
      }
      else {
        console.log(data)
        toast.info(add.data.message, { autoClose: 1500 })
      }

    } catch (error) {

      toast.error("internal server error", { autoClose: 1500 })
    }
  };
  // const UpdateScheme = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const add = await axios.put(`http://localhost:5000/admin/scheme-of-study/update/${id}`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       }
  //     },);
  //     if (add.data.status == '200') {

  //       toast.info(add.data.message, { autoClose: 1500 })
  //       setTimeout(() => {
  //         navigate("/admin/schemeofstudy");
  //       }, 1000);
  //     }
  //     else {
  //       toast.info(add.data.message, { autoClose: 1500 })
  //     }
  //     // console.log(res.data); // Handle successful response
  //   } catch (error) {

  //     toast.error(error.response.data.message, { autoClose: 1500 })
  //   }
  // };
  return (
    <AdminLayout>
      <section className="flex h-auto  justify-center items-center">
        <div className="w-full h-auto bg-white rounded p-4 m-4">
          <AppBar position="static" sx={{ bgcolor: "primary" }}>
            <Toolbar>
              <IconButton>
                <ArrowBack onClick={() => navigate(-1)} />
              </IconButton>
              <Typography variant="h8">Back</Typography>
              <Typography variant="h6" className="ml-4 text-center w-full">
                Add courses to Students
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "primary.main",
            }}
            className="p-6 flex justify-between items-center flex-row"
          >
            <div className="flex flex-col items-start px-4">
              <Typography variant="h5" color="white" align="center" fontWeight="bold">
                Courses
              </Typography>
              <Typography variant="body1" color="white">
                {department} {session}
              </Typography>
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className=" rounded-md bg-orange-400 m-2">
                <Button

                  onClick={handleEnableEditing}
                  className="flex items-center justify-center space-x-1 h-12 px-4 mx-4 text-sm font-medium text-white bg-orange-500 rounded-full shadow-lg sm:text-base sm:px-6"
                >
                  {!enableEditing ? (
                    <ContentPasteSharpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                  ) : (
                    <ContentPasteOffSharpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                  )}
                  <span className="hidden sm:inline-block text-white">{!enableEditing ? 'Enable editing' : 'Disable Editing'}</span>
                </Button>

              </div>
              <div className={`rounded-md ${!enableEditing ? 'bg-gray-400' : 'bg-blue-400'}`}>
                <Button
                  type="submit"
                  form="myForm"
                  disabled={!enableEditing}
                  className="flex items-center justify-center space-x-1 h-12 px-4 mx-4 text-sm font-medium rounded-full shadow-lg sm:text-base sm:px-6 text-white"
                >
                  <span className="hidden sm:inline-block text-white">Submit</span>
                  <SendIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                </Button>
              </div>
            </div>

          </Box>
          {enableEditing && (
            <form
              onSubmit={AddCourses}

              className="bg-gray shadow-md rounded py-8 px-8 pt-6 pb-8 mb-4"
              id="myForm"
            >
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <Typography variant="h6" component="h1">
                  Enter Batch and Department Details
                </Typography>
              </div>
              <div className="mb-4 lg:flex lg:items-center lg:justify-between">
                <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                  <FormControl className="w-full">
                    <InputLabel id="batchInput">Session</InputLabel>
                    <Select
                      labelId="Session"
                      id="Session"
                      label="Session"
                      disabled={true}
                      required
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                    >
                      {batchOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                  <FormControl className="w-full">
                    <InputLabel id="departmentInput">Department</InputLabel>
                    <Select
                      labelId="departmentInput"
                      id="departmentSelect"
                      label="Department"
                      disabled={true}
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {DepartmentOption.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <div className="w-full lg:w-1/2 lg:mr-4 mb-4">

                  <IconButton onClick={handleToggleForm}>
                    {showForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    <Typography>{showForm ? 'Hide Form' : 'Show Form'}</Typography>
                  </IconButton>
                </div>

              </div>

              {showForm && (
                <div>
                  <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                    <Typography variant="h6" component="h1">
                      Enter Course Details
                    </Typography>
                  </div>
                  <div className="mb-4 lg:flex lg:items-center lg:justify-between">
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                      <FormControl className="w-full mr-2">
                        <InputLabel id="BatchInput">Batch</InputLabel>
                        <Select
                          labelId="BatchSelect"
                          id="demo-select-small"
                          label="Batch"
                          required
                          value={Batch}
                          onChange={(event) => setBatch(event.target.value)}
                        >
                          {BatchOption.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                      <FormControl className="w-full mr-2">
                        <InputLabel id="demo-select-small">Semester</InputLabel>
                        <Select
                          labelId="CurrentSemesterSelectct"
                          id="CurrentSemesterSelect"
                          label="Semester"
                          value={Semester}
                          onChange={(event) => setSemester(event.target.value)}
                        >
                          {semester.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))
                          }
                        </Select>

                      </FormControl>
                    </div>
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                      <FormControl fullWidth>
                        <TextField
                          id="teacher name"
                          label="Teacher Name"
                          variant="outlined"
                          value={teacher}
                          placeholder="John Doe"
                          onChange={(e) => setTeacher(e.target.value.toLowerCase())}

                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              )}
            </form>

          )}
          <div className="mb-4 lg:flex lg:items-center lg:justify-between p-4">
            <div className="w-full lg:mr-4 mb-4" style={{ overflowX: 'auto' }}>
              {courseDetails.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Course Name</TableCell>
                      <TableCell align="center">Course Code</TableCell>
                      <TableCell align="center">Credits</TableCell>
                    {/* <TableCell align="center">Enter Teacher Name</TableCell> */}
                      <TableCell align="center">Course Pre Req</TableCell>
                      <TableCell align="center">Course Type</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {courseDetails.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{course.courseTitle}</TableCell>
                        <TableCell align="center">{course.courseCode}</TableCell>
                        <TableCell align="center">{course.credits}</TableCell>
                        {/* <TableCell align="center">
                          <div className="w-full">
                            <FormControl fullWidth>
                              <TextField
                                id="teacher-name"
                                label="Teacher Name"
                                variant="outlined"
                                value={teacher}
                                placeholder="John Doe"
                                onChange={(e) => setTeacher(e.target.value.toLowerCase())}
                                className="fixed-width-input" // Add a CSS class to the TextField component
                              />
                            </FormControl>
                          </div>
                        </TableCell> */}
                        <TableCell align="center">{course.preRequisite}</TableCell>
                        <TableCell align="center">{course.courseType}</TableCell>
                        <TableCell align="center">
                          <Button
                            type="button"
                            disabled={!enableEditing || addedCourses.includes(course)}
                            onClick={() => handleAddCourse(index, course)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mr-2"
                          >
                            Add
                          </Button>
                          <Button
                            type="button"
                            disabled={!enableEditing}
                            onClick={() => handleRemoveCourse(course)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>

                    ))}

                  </TableBody>
                </Table>
              ) : (
                <p>No courses added yet.</p>
              )}
            </div>
          </div>
        </div>
      </section >
    </AdminLayout >

  );
};

export default AddCoursesToStudent;
