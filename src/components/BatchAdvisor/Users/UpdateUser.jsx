
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Autocomplete, Select, InputAdornment, Alert, InputLabel, MenuItem, FormControlLabel, Checkbox, IconButton, FormControl, TextField, Button } from '@mui/material';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { BatchOptions, Status, DepartmentOptions, semesters, Section } from "../../AddStudent/DropDowns";
const UpdateUser = () => {
  //States
  const [inputValue, setInputValue] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [EmailOptions, setEmailOptions] = useState([]);
  const [Status, setStatus] = useState("");
  const [Role, setRole] = useState("");
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;

  // Params , headers and navigate
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data;
  const getEmails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/users/email/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        }
      );
      const { batchAdvisorEmails, studentEmails } = response?.data?.data || {};
      let emails = [];
      let errorMsg = "";
      if (Role === "student") {
        studentEmails?.length
          ? (emails = studentEmails.map(({ StudentEmail }) => StudentEmail))
          : (errorMsg = "Please add students first");
      } else if (Role === "batch advisor") {
        batchAdvisorEmails?.length
          ? (emails = batchAdvisorEmails.map(({ BatchAdvisorEmail }) => BatchAdvisorEmail))
          : (errorMsg = "Please add batch advisors first");
      }
      setEmailOptions(emails);
      setErrorMsg(errorMsg);
    } catch (error) {
      console.error(error);
      setEmailOptions([]);
      setErrorMsg("No data found");
    }
  };

  // //UseEffect to set data
  useEffect(() => {
    if (data) {
      setStatus(data.allowed.toLowerCase());

      setRole(data.role.toLowerCase());

      setEmail(data.email.toLowerCase());

    }
  }, [data]);
  useEffect(() => {
    getEmails();
  }, [Role]);
  const UpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const dataA = {
        id: id,
        role: Role,
        allowed: Status === 'allowed' ? true : false,
        email: email,
      };
      const res = await axios.put(`http://localhost:5000/admin/users/update/${data.email}/${id}`, dataA,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        })
        ;
      console.log(res);
      toast.info(res.data.message, { autoClose: 1500 })
      setTimeout(() => {
        navigate("/admin/users");
      }, 1000);
    }
    catch (error) {
      toast.error("internal server error", { autoClose: 1500 })
    }
  }
  const AddStudent = async (e) => {
    try {
      const Data = {
        role: Role,
        allowed: Status === 'allowed' ? true : false,
        email: email,
        pass: password,
      };
      e.preventDefault();
      console.log(Data);
      const add = await axios.post(`http://localhost:5000/admin/users/create`, Data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        })
      console.log(add.data);
      // toast.info(add.data.message, { autoClose: 1500 })
      add.data.status == "400" ? toast.error(add.data.message, { autoClose: 1500 }) : toast.info(add.data.message, { autoClose: 1500 });
      add.data.status == "200" && setTimeout(() => {
        navigate("/admin/users");
      }
        , 1000);
    }
    catch (error) {
      toast.error("internal server error", { autoClose: 1500 })
    }
  }
  return (
    <AdminLayout>
      <section className="flex h-full w-full  justify-center items-center">

        <div className="w-full bg-white rounded p-4 m-4 ">
          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={() => navigate('/admin/users')}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h8">Back</Typography>
              <Typography variant="h6" className="ml-4 text-center w-full">{data ? "Update Users" : "Add Users"} </Typography>
            </Toolbar>
          </AppBar>
          <form
            onSubmit={data ? UpdateStudent : AddStudent}
            className="bg-gray shadow-md rounded  py-8 px-8 pt-6 pb-8 mb-4 h-screen">
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Enter Details</Typography>
            </div>
            <div className="mb-4 lg:flex lg:items-center lg:justify-between">

              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl className="w-full mr-2">
                  <InputLabel id="SectionSelect">Role</InputLabel>
                  <Select
                    labelId="Role"
                    id="Role"
                    label="Role"
                    value={Role}
                    required
                    onChange={(event) => setRole(event.target.value)}
                  >

                    <MenuItem value={"batch advisor"}>Batch Advisor</MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>

                  </Select>
                </FormControl>

              </div>

              <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <Autocomplete
                  value={email}
                  onChange={(event, newValue) => {
                    setEmail(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="email"
                  options={EmailOptions}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="select Email" />}
                />
              </div>
            </div>

            {!data ? <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
              <Typography variant="h9" component="h1">Password</Typography>
            </div> : null
            }
            <div className="lg:flex lg:items-start lg:justify-between">

              {!data ? <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <FormControl fullWidth>
                  <TextField
                    label='Some label'
                    variant="outlined"
                    value={password}
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    onChange={(event) => setPassword(event.target.value)}
                    InputProps={{ // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </div> : null}

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
                    value={Status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <MenuItem value="allowed">Allowed</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>

                  </Select>
                </FormControl>
                {errorMsg ? (
                  <div className="text-red-500 text-sm">{errorMsg + " \n"}</div>
                ) : null

                }
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

export default UpdateUser;
