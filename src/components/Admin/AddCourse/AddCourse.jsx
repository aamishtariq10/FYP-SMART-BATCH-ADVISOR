
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AppBar, Toolbar, Box, Typography, Select, Alert, InputLabel, Table, TableHead, TableBody, TableRow, TableCell, MenuItem, FormControlLabel, Checkbox, IconButton, FormControl, TextField, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

//import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { BatchOptions, Status, DepartmentOptions, semesters, Section } from "../../../utils/DropDowns";
import { makeStyles } from '@material-ui/core/styles';

const AddCourse =() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      department,
      session,
      courses: courseDetails,
    };

    try {
      const response = await axios.post('http://localhost:5000/admin/scheme-of-study/add', formData);
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <AdminLayout>
      <section className="flex h-full justify-center items-center">
        <div className="w-full bg-white rounded p-4 m-4">
          <AppBar position="static">
            <Toolbar>
              <IconButton>
                <ArrowBack onClick={() => navigate(-1)}/>
              </IconButton>
              <Typography variant="h8">Back</Typography>
              <Typography variant="h6" className="ml-4 text-center w-full">
                Scheme of studies
              </Typography>
            </Toolbar>
          </AppBar>
          <form
            onSubmit={handleSubmit}
            className="bg-gray shadow-md rounded py-8 px-8 pt-6 pb-8 mb-4 h-screen"
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

            <div className="mb-4 lg:flex lg:items-center lg:justify-between p-4">
              <div className="w-full lg:mr-4 mb-4">
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
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCourse(index, newCourse)}
                                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mr-2"
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditIndex(null);
                                    setNewCourse({ courseTitle: '', courseCode: '', credits: '', preRequisite: '', courseType: '' });
                                  }}
                                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-2 rounded"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleEditCourse(index, course)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mr-2"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCourse(index)}
                                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                                >
                                  Remove
                                </button>
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
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4 w-48" // Adjust the width value as needed
              >
                Submit
              </Button>
            </Box>

          </form>
        </div>
      </section >
    </AdminLayout >

  );
};

export default AddCourse;
