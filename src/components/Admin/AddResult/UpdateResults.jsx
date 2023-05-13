
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Select, Alert, InputLabel, Autocomplete, MenuItem, FormControlLabel, Checkbox, IconButton, FormControl, TextField, Button } from '@mui/material';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { BatchOptions, Status, DepartmentOptions, semesters, Section } from "./DropDowns";

const options = ['Option 1', 'Option 2'];
const UpdateResults = () => {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  //States
  const [StudentName, setName] = useState("");
  const [StudentRegNo, setRegNo] = useState("");
  const [StudentEmail, setEmail] = useState("");
  const [StudentStatus, setStatus] = useState("");
  const [Batch, setBatch] = useState("");
  const [RollNo, setRollNo] = useState("");
  const [sectionString, setSectionString] = useState();
  const [StudentSection, setSection] = useState("");
  const [Department, setDepartment] = useState("");
  const [CurrentSemester, setCurrentSemester] = useState("");
  //Params , headers and navigate
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data;
  console.log(data)

  //Dropdowns
  // const DepartmentOption = [...DepartmentOptions];
  // const semester = [...semesters];
  // const section = [...Section];
  // const BatchOption = BatchOptions();
  // const status = [...Status];

  //UseEffect to set data
  // useEffect(() => {
  //   if (data) {
  //     setName(data.StudentName);
  //     setEmail(data.StudentEmail);
  //     const RegNo = data.StudentRegNo.split('-');
  //     setBatch(RegNo[0]);
  //     setDepartment(RegNo[1]);
  //     setRollNo(RegNo[2]);
  //     setRegNo(data.StudentRegNo);
  //     setSection(data.StudentSection);
  //     const Section = data.StudentSection.split('-');
  //     setSectionString(Section[2]);
  //     setCurrentSemester(data.CurrentSemester);
  //     setStatus(data.StudentStatus);
  //   }
  // }, [data]);
  // console.log(StudentName, Batch, RollNo, sectionString, Department, StudentEmail, StudentStatus, StudentSection, CurrentSemester);
  // console.log(sectionString)

  // const dataA = {
  //   StudentName,
  //   StudentEmail,
  //   StudentRegNo: `${Batch}-${Department}-${RollNo}`,
  //   StudentSection: `${Batch}-${Department}-${sectionString}`,
  //   CurrentSemester,
  //   StudentStatus
  // };
  // const UpdateStudent = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(`http://localhost:5000/admin/students/update/${StudentName}/${id}`, dataA);
  //     console.log(res);
  //     toast.info(res.data.message, { autoClose: 1500 })
  //     setTimeout(() => {
  //       navigate("/admin/students");
  //     }, 1000);
  //   }
  //   catch (error) {
  //     toast.error(error.response.data.message, { autoClose: 1500 })
  //   }
  // }
  // const AddStudent = async (e) => {
  //   try {
  //     e.preventDefault();
  //   //  console.log(dataA);
  //     const add = await axios.post(`http://localhost:5000/admin/students/add`, dataA)
  //     navigate("/admin/students");
  //     console.log(add.data);
  //     toast.info(add.data.message, { autoClose: 1500 })
  //   }
  //   catch (error) {
  //     toast.error(error.response.data.message, { autoClose: 1500 })
  //   }
  // }
  return (
    <AdminLayout>
      <section className="flex h-full w-full  justify-center items-center">

        <div className="w-full bg-white rounded p-4 m-4 ">
          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h8">Back</Typography>
              <Typography variant="h6" className="ml-4 text-center w-full">{data ? "Update Student Course Result" : "Add student course Result"} </Typography>
            </Toolbar>
          </AppBar>
          <form
            //  onSubmit={data ? UpdateStudent : AddStudent}
            className="bg-gray shadow-md rounded  py-8 px-8 pt-6 pb-8 mb-4 h-screen">
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Enter Student Details</Typography>
            </div>
            <div className="mb-4 lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Registeration No" />}
                />
              </div>
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="BatchInput">Session</InputLabel>
                  <Select
                    labelId="BatchSelect"
                    id="demo-select-small"
                    label="Batch"
                    required
                    value={Batch}
                    onChange={(event) => setBatch(event.target.value)}
                  >
                    {/* {BatchOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </div>
              <div className="w-full lg:w-1/4 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="demo-select-small">Status</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Batch"
                    required
                    value={StudentStatus}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    {/* {status.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                    } */}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Enter Course Details</Typography>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl fullWidth>
                  <TextField
                    id="course code"
                    label="Course Code"
                    variant="outlined"
                    value={StudentEmail}
                    // placeholder="xyz@cuilahore.edu.pk"
                    //  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </FormControl>
              </div>

              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full m-1">
                  <InputLabel id="DepartmentLabel">Course Name</InputLabel>
                  <Select
                    labelId="DepartmentSelect"
                    id="Department"
                    label="Course Name"
                    required
                    value={Department}
                    onChange={(event) => setDepartment(event.target.value)}
                  >
                    {/* {DepartmentOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Enter Class Details</Typography>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="BatchInput">Batch</InputLabel>
                  <Select
                    labelId="BatchSelect"
                    id="demo-select-small"
                    label="Batch"
                    required
                    value={Batch}
                  //  onChange={(event) => setBatch(event.target.value)}
                  >
                    {/* {BatchOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </div>

              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full m-1">
                  <InputLabel id="DepartmentLabel">Department</InputLabel>
                  <Select
                    labelId="DepartmentSelect"
                    id="Department"
                    label="Department"
                    required
                    value={Department}
                   // onChange={(event) => setDepartment(event.target.value)}
                  >
                    {/* {DepartmentOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </div>
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="SectionSelect">Section</InputLabel>
                  <Select
                    labelId="SectionSelect"
                    id="SectionSelect"
                    label="Section"
                    value={sectionString ? sectionString : ""}
                    required
                  //  onChange={(event) => setSectionString(event.target.value)}
                  >
                    {/* {section.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>

              </div>
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="demo-select-small">Select Teacher</InputLabel>
                  <Select
                    labelId="CurrentSemesterSelectct"
                    id="CurrentSemesterSelect"
                    label="Semester"
                    value={CurrentSemester}
                    onChange={(event) => setCurrentSemester(event.target.value)}
                  >
                    {/* {semester.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                    } */}
                  </Select>

                </FormControl>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Class Details</Typography>
            </div>
            <div className="lg:flex lg:items-start lg:justify-between">
           
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="demo-select-small">Semester</InputLabel>
                  <Select
                    labelId="CurrentSemesterSelectct"
                    id="CurrentSemesterSelect"
                    label="Semester"
                    value={CurrentSemester}
                    onChange={(event) => setCurrentSemester(event.target.value)}
                  >
                    {/* {semester.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                    } */}
                  </Select>

                </FormControl>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Status :</Typography>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/4 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="demo-select-small">Status</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Batch"
                    required
                    value={StudentStatus}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    {/* {status.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                    } */}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex items-center justify-between ">
              {data ?
                <Button type="submit" variant="contained" color="primary">
                  Update Records
                </Button>
                :
                <Button type="submit" variant="contained" color="primary">
                  Add Records
                </Button>
              }
            </div>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

        </div>
        {/* </div> */}
      </section >
    </AdminLayout >
  );
};

export default UpdateResults;
