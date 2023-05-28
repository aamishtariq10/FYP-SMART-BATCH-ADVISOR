
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AppBar, Toolbar, Box, Typography, Select, Alert, InputLabel, Table, TableHead, TableBody, TableRow, TableCell, MenuItem, FormControlLabel, Checkbox, IconButton, FormControl, TextField, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { BatchOptions, Status, DepartmentOptions, semesters, Section } from "../../../utils/DropDowns";
import { makeStyles } from '@material-ui/core/styles';
import ContentPasteOffSharpIcon from '@mui/icons-material/ContentPasteOffSharp';
import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';
import { Send as SendIcon } from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from "react-router-dom";
const AddCoursesToStudent = () => {
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  console.log(id)
  const data = location.state?.data;
  //console.log("data",data)
  const navigate = useNavigate();
  const batchOptions = BatchOptions()
  const semester = [...semesters];
  const DepartmentOption = [...DepartmentOptions];
  const [courseDetails, setCourseDetails] = useState([]);
  const [department, setDepartment] = useState('');
  const [session, setSession] = useState('');
  const [newCourse, setNewCourse] = useState({ courseTitle: '', courseCode: '', credits: '', preRequisite: '', courseType: "" });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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


  const handleEnableEditing = () => {
    setEnableEditing(!enableEditing)
  }

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'courseCode' ? value.toUpperCase() : value;
    setNewCourse({ ...newCourse, [name]: updatedValue });
  };
  const handleUpdateCourse = (index, updatedCourse) => {
    const updatedCourseDetails = [...courseDetails];
    updatedCourseDetails[index] = updatedCourse;
    setCourseDetails(updatedCourseDetails);
    setEditIndex(null); // Clear the edit index
    setNewCourse({ courseTitle: '', courseCode: '', credits: '', preRequisite: '', courseType: '' }); // Reset the form values
  };


  const handleAddCourse = (e) => {
    e.preventDefault();
    setCourseDetails([...courseDetails, newCourse]);
    setNewCourse({ courseTitle: '', courseCode: '', credits: '', preRequisite: '', courseType: '' });
  };

  const handleRemoveCourse = (index) => {
    const updatedCourseDetails = [...courseDetails];
    updatedCourseDetails.splice(index, 1);
    setCourseDetails(updatedCourseDetails);
  };
  const handleEditCourse = (index, course) => {
    setEditIndex(index);
    setNewCourse(course);
  };

  const formData = {
    department,
    session,
    courses: courseDetails,
  };
  const AddScheme = async (e) => {
    e.preventDefault();
    try {
      const add = await axios.post('http://localhost:5000/admin/scheme-of-study/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      },);
      if (add.data.status == '200') {
        toast.info(add.data.message, { autoClose: 1500 })
        setTimeout(() => {
          navigate("/admin/schemeofstudy");
        }, 1000);
      }
      else {
        toast.info(add.data.message, { autoClose: 1500 })
      }
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1500 })
    }
  };
  const UpdateScheme = async (e) => {
    e.preventDefault();
    try {
      const add = await axios.put(`http://localhost:5000/admin/scheme-of-study/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      },);
      if (add.data.status == '200') {

        toast.info(add.data.message, { autoClose: 1500 })
        setTimeout(() => {
          navigate("/admin/schemeofstudy");
        }, 1000);
      }
      else {
        toast.info(add.data.message, { autoClose: 1500 })
      }
      // console.log(res.data); // Handle successful response
    } catch (error) {

      toast.error(error.response.data.message, { autoClose: 1500 })
    }
  };
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
              onSubmit={!data ? AddScheme : UpdateScheme}

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
                    <InputLabel id="batchInput">Batch</InputLabel>
                    <Select
                      labelId="batchInput"
                      id="batchSelect"
                      label="Batch"
                      disabled ={true}
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
                      disabled ={true}
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
                      <FormControl fullWidth>
                        <TextField
                          id="courseTitle"
                          label="Course Title"
                          variant="outlined"
                          name="courseTitle"
                          value={newCourse.courseTitle}
                          placeholder="Enter course title"
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </div>
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                      <FormControl fullWidth>
                        <TextField
                          id="courseCode"
                          label="Course Code"
                          variant="outlined"
                          name="courseCode"
                          value={newCourse.courseCode}
                          placeholder="Enter course code"
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </div>
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                      <FormControl fullWidth>
                        <TextField
                          id="credits"
                          label="Credits"
                          variant="outlined"
                          name="credits"
                          value={newCourse.credits}
                          placeholder="Enter credits"
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="mb-4 lg:flex lg:items-center lg:justify-between">
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                      <FormControl fullWidth>
                        <TextField
                          id="preRequisite"
                          label="Pre Requisite"
                          variant="outlined"
                          name="preRequisite"
                          value={newCourse.preRequisite}
                          placeholder="Enter course pre-requisite"
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </div>
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                      <FormControl fullWidth>
                        <TextField
                          id="courseType"
                          label="Course Type"
                          variant="outlined"
                          name="courseType"
                          value={newCourse.courseType}
                          placeholder="Enter course type"
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCourse}
                    className="rounded"
                  >
                    Add
                  </Button>
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
                        <TableCell align="center">{course.preRequisite}</TableCell>
                        <TableCell align="center">{course.courseType}</TableCell>
                        <TableCell align="center">

                          {editIndex === index ? (
                            <>
                              <Button
                                form="myForm" type="button"
                                disabled={!enableEditing}
                                onClick={() => handleUpdateCourse(index, newCourse)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mr-2"
                              >
                                Update
                              </Button>
                              <Button
                                type="button"
                                disabled={!enableEditing}
                                onClick={() => {
                                  setEditIndex(null);
                                  setNewCourse({ courseTitle: '', courseCode: '', credits: '', preRequisite: '', courseType: '' });
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-2 rounded"
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                type="button"
                                disabled={!enableEditing}
                                onClick={() => handleEditCourse(index, course)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mr-2"
                              >
                                Edit
                              </Button>
                              <Button
                                type="button"
                                disabled={!enableEditing}
                                onClick={() => handleRemoveCourse(index)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                              >
                                Remove
                              </Button>
                            </>
                          )}
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
