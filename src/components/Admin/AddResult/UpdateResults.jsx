
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Select, InputLabel, Autocomplete, MenuItem, FormControlLabel, Checkbox, IconButton, FormControl, TextField, Button } from '@mui/material';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { BatchOptions, Status, DepartmentOptions, Section } from "./DropDowns";
import gradingSystem from "./gradinSystem";
import CalculateGpa from "./CalculateGpa";
import CalculateCgpa from "./CalculateCgpa";

const UpdateResults = () => {
  const batchOptions = BatchOptions()
  const status = [...Status];
  const DepartmentOption = [...DepartmentOptions];
  const section = [...Section];
  const [StudentStatus, setStatus] = useState("");
  const [Department, setDepartment] = useState("");
  const [studentRegNo, setStudentRegNo] = useState([]);
  const [selectedRegNo, setSelectedRegNo] = useState('');
  const [session, setSession] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [lg, setlg] = useState("");
  const [lgOptions, setLgOtions] = useState([]);
  const [marks, setMarks] = useState("");
  const [marksOptions, setMarksOptions] = useState([]);
  const [gpa, setgpa] = useState("");
  const [gpaOptions, setgpaOptions] = useState([]);
  //const [cgpa, setCgpa] = useState("");
  const [ss, setss] = useState("");
  const [Batch, setBatch] = useState('');
  const [sectionString, setSectionString] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseCredit, setCourseCredit] = useState("");
  const [teacher, setTeacher] = useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [disable, setDisable] = useState(false);
  const [semesterGpa, getSemesterGpa] = useState("");
  const [allCgpa, getAllCgpa] = useState("")
  //Params , headers and navigate
  const navigate = useNavigate();
  const { ResultID } = useParams();
  const location = useLocation();
  const data = location.state?.data;
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
  const getStudentRegNo = async (e) => {
    try {
      const res = await axios.get(`http://localhost:5000/admin/results/get/regNo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
      const regNosArray = res.data.data ? res?.data?.data?.map(item => item.StudentRegNo) : [];
      setStudentRegNo(regNosArray)
      if (res.status !== '200') {
        setErrorMsg(res.data.message)
        // setStudentRegNo([])
      }
    }
    catch (err) {
      toast.error("Error Calculating GPA ")
    }
  }
  useEffect(() => {
    getStudentRegNo();
  }, [])
  useEffect(() => {
    const Batch = selectedRegNo?.split('-');
    if (Batch) {
      const sessionKeys = Object.keys(gradingSystem.session);
      const lgKeys =
        Batch[0] <= sessionKeys[0]
          ? Object.keys(gradingSystem?.session['FA21']?.lg)
          : Object.keys(gradingSystem?.session['SP22']?.lg);
      setLgOtions(lgKeys);
      const lgData =
        Batch[0] <= sessionKeys[0]
          ? gradingSystem.session[sessionKeys[0]].lg[lg]?.marks || [0]
          : gradingSystem.session[sessionKeys[1]].lg[lg]?.marks || [0];
      setMarksOptions(lgData);
      const lggpa =
        Batch[0] <= sessionKeys[0]
          ? gradingSystem.session[sessionKeys[0]].lg[lg]?.gpa
          : gradingSystem.session[sessionKeys[1]].lg[lg]?.gpa;
      const GpaArr = [lggpa]
      setgpaOptions(GpaArr)
    }
  }, [lg, selectedRegNo]);

  useEffect(() => {
    if (StudentStatus == 'withdraw') {
      setlg("withdraw")
      setMarks(0)
      setgpa(0)
    }
    if (StudentStatus == 'failed') {
      setlg('F')
      setgpa(0)
    }
    // if (StudentStatus == 'enrolled') {
    //   setlg('')
    //   setgpa('')
    //   setMarks('')
    // }

  }, [StudentStatus]);


  useEffect(() => {
    if (allCgpa < 2.0 && allCgpa >= 0) {
      setss('pb-probation')
    }
    else if (allCgpa >= 2.0) {
      setss("gas")
    }
    else {
      setss('');
    }
  }, [allCgpa]);
  const handleGpaUpdate = (semesterGpa) => {
    getSemesterGpa(semesterGpa);
  };
  const handleCgpaUpdate = (semesterGpa) => {
    getAllCgpa(semesterGpa);
  };
  useEffect(() => {
    if (data) {
      setSelectedRegNo(data.StudentRegNo)
      setSession(data.SessionYear)
      setlg(data.Grade_LG)
      setStatus(data.CourseStatus)
      setMarks(data.Marks)
      const section = data.Class.split('-');
      setBatch(section[0]);
      setDepartment(section[1]);
      setSectionString(section[2]);
      getAllCgpa(data.CGPA)
      setCourseCode(data.CourseCode)
      setCourseCredit(data.CourseCredit)
      setCourseName(data.Course)
      setss(data.SS)
      setgpa(data.GPA)
      setTeacher(data.Teacher)
      setDisable(true);
      getSemesterGpa(data.SemesterGpa)

    }
  }, [data])

  const dataA = {
    ResultID,
    studentRegNo: selectedRegNo,
    Class: `${Batch}-${Department}-${sectionString}`,
    session: session,
    status: StudentStatus,
    SS: ss,
    lg: lg,
    marks: marks,
    gpa: gpa,
    cgpa: allCgpa,
    semesterGpa,
    courseName: courseName,
    courseCode: courseCode,
    courseCredit: courseCredit,
    Teacher: teacher
  };
  const UpdateResults = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/admin/results/update/${data.StudentRegNo}/${ResultID}`, dataA,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      toast.info(res.data.message, { autoClose: 1500 })
      setTimeout(() => {
        navigate("/admin/results");
      }, 1000);
    }
    catch (error) {
      toast.error(error.response.data.message, { autoClose: 1500 })
    }
  }

  const AddResults = async (e) => {
    try {
      e.preventDefault();
      const add = await axios.post(`http://localhost:5000/admin/results/create`, dataA, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
      )
      if (add.data.status == 200) {
        toast.info(add.data.message, { autoClose: 1500 })
        
        setTimeout(() => {
          navigate("/admin/results");
        }, 1000);
      }
      else {
        setErrorMsg(add.data.message)
        toast.error(add.data.message, { autoClose: 1500 })
      }
    }
    catch (err) {
      toast.error("inernal server error", { autoClose: 1500 })
    }
  }
  return (
    <AdminLayout>
      <section className="flex h-full w-full  justify-center items-center">

        <div className=" w-full h-full bg-white rounded p-4 m-4   min-height: 100%">
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
            onSubmit={data ? UpdateResults : AddResults}
            className="bg-gray shadow-md rounded  py-8 px-8 pt-6 pb-8 mb-4 h-screen">
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Enter Student Details</Typography>
            </div>
            <div className="mb-4 lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <Autocomplete
                  value={selectedRegNo}
                  onChange={(event, selectedRegNo) => {
                    setSelectedRegNo(selectedRegNo);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  disabled={disable}
                  id="studentregno"
                  options={studentRegNo}
                  required
                  renderInput={(params) => <TextField {...params} label="Registration No" />}
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

                    value={session || ''}
                    onChange={(event) => setSession(event.target.value)}
                  >
                    {batchOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-full lg:w-1/4 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="demo-select-small">Status</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Status"
                    required
                    value={StudentStatus}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    {status.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Enter Marks</Typography>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="BatchInput">lg (grades)</InputLabel>
                  <Select
                    labelId="BatchSelect"
                    id="demo-select-small"
                    label="Batch"
                    required
                    value={lg}
                    onChange={(event) => setlg(event.target.value)}
                  >
                    {lgOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full m-1">
                  <InputLabel id="DepartmentLabel">Marks</InputLabel>
                  <Select
                    labelId="marks"
                    id="marks"
                    label="marks"
                    required
                    value={marks}
                    onChange={(event) => setMarks(event.target.value)}
                  >
                    {marksOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="SectionSelect">GPA</InputLabel>
                  <Select
                    labelId="gpa"
                    id="gpa"
                    label="Gpa"
                    value={gpa}
                    required
                    onChange={(event) => setgpa(event.target.value)}
                  >
                    {gpaOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
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
                    id="Coursename"
                    label="Course Name"
                    variant="outlined"
                    value={courseName}
                    placeholder="Applied Physics"
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                  />
                </FormControl>
              </div>

              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl fullWidth>
                  <TextField
                    id="course code"
                    label="Course Code"
                    variant="outlined"
                    value={courseCode}
                    placeholder="CSE000"
                    onChange={(e) => setCourseCode(e.target.value.toUpperCase())}

                  />
                </FormControl>
              </div>
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl fullWidth>
                  <TextField
                    id="course credit"
                    label="Course credit"
                    variant="outlined"
                    value={courseCredit}
                    placeholder="4(1,0)"
                    onChange={(e) => setCourseCredit(e.target.value.toUpperCase())}

                  />
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
                    onChange={(event) => setBatch(event.target.value)}
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
                <FormControl className="w-full m-1">
                  <InputLabel id="DepartmentLabel">Department</InputLabel>
                  <Select
                    labelId="DepartmentSelect"
                    id="Department"
                    label="Department"
                    required
                    value={Department}
                    onChange={(event) => setDepartment(event.target.value)}
                  >
                    {DepartmentOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
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
                    onChange={(event) => setSectionString(event.target.value)}
                  >
                    {section.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
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
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Calculate Semester Gpa</Typography>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl fullWidth>
                  <TextField
                    id="gpa"
                    label="Semester Gpa"
                    variant="outlined"
                    value={semesterGpa}
                    disabled={true}
                    placeholder="0.0"
                    onChange={(e) => getSemesterGpa(e.target.value.toLowerCase())}
                  />
                </FormControl>
              </div>
              <CalculateGpa selectedRegNo={selectedRegNo} gpa={gpa} session={session} courseCode={courseCode} ResultID={ResultID}
                lg={lg} courseCredit={courseCredit} StudentStatus={StudentStatus} onGpaUpdate={handleGpaUpdate}

              />
            </div>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Calculate Cgpa</Typography>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">

              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl fullWidth>
                  <TextField
                    id="Cgpa"
                    label="Overall Cgpa"
                    variant="outlined"
                    value={allCgpa}
                    disabled={true}
                    placeholder="0.0"
                    onChange={(e) => getAllCgpa(e.target.value.toLowerCase())}
                  />
                </FormControl>
              </div>
              <CalculateCgpa selectedRegNo={selectedRegNo} gpa={gpa} session={session} courseCode={courseCode} ResultID={ResultID}
                lg={lg} courseCredit={courseCredit} StudentStatus={StudentStatus} onCgpapaUpdate={handleCgpaUpdate}
              />
            </div>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">SS :</Typography>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-1/4 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="demo-select-small">SS</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="SS"
                    required
                    value={ss}
                    onChange={(event) => setss(event.target.value)}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="gas">GAS</MenuItem>
                    <MenuItem value="pb-probation">PB-PROBATION</MenuItem>
                    <MenuItem value="di-discontinued">DI-DISCONTINUED</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:1/2 lg:mr-4 mb-4">
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
                  {errorMsg ? (
                    <div className="text-red-500 text-sm">{errorMsg + " \n"}</div>
                  ) : null

                  }
                </div>
              </div>


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
