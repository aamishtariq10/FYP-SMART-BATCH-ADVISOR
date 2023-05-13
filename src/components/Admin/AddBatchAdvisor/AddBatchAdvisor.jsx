
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox, Paper, Input, IconButton, FormControl, TextField, Button, Box, Icon, MenuItem } from '@mui/material';
import { AdminLayout } from "../../../layouts/AdminLayout";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowBack, Close } from '@mui/icons-material';

const AddBatchAdvisor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batchSection, setBatchSection] = useState("");
  const [department, setDepartment] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  //axios request to add batch advisor
  const handleSubmit = (e) => {
    var active = isActive ? "Active" : "Inactive";
    e.preventDefault();
    const data = {
      BatchAdvisorName: name,
      BatchAdvisorEmail: email,
      BatchAdvisorStatus: active,
      BatchSection: batchSection,
      BatchAdvisorDep: department,

    };
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    console.log("token", token);
    axios.post("http://localhost:5000/admin/batchadvisor/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      toast.success(res.data.message);
      navigate("/admin/batchadvisor");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      console.log(err);
    });
  };


  return (
    <AdminLayout>
      <section className="flex w-full h-full justify-center items-center">
        <div className="w-full bg-white-100 rounded p-4 m-4">
          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={() => navigate('/admin/batchadvisor')}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h8">Back</Typography>
              <Typography variant="h5" className="block w-full text-center font-bold ">
                Add Batch Advisor
              </Typography>
            </Toolbar>
          </AppBar>
          <form
            onSubmit={handleSubmit}
            className="bg-gray shadow-md rounded  px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="name"
                  label="Enter Name"
                  variant="outlined"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="email"
                  label="Enter Email"
                  variant="outlined"
                  placeholder="xyz@cuilahoe.edu.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="batch-section"
                  label="Batch Section"
                  placeholder="FA19-BCS-A"
                  variant="outlined"
                  value={batchSection}
                  onChange={(e) => setBatchSection(e.target.value.toUpperCase())}
                  required
                />
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="department"
                  label="Department"
                  variant="outlined"
                  placeholder="CS / SE / EE / ME / CE / BS / IS / MATH etc"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value.toUpperCase())}
                  required
                />
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    name="isActive"
                    color="primary"
                  />
                }
                label="Active"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" variant="contained" color="primary">
                Add Advisor
              </Button>
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
      </section>
    </AdminLayout>
  );
};

export default AddBatchAdvisor;
