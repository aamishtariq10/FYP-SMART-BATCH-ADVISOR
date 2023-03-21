
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from "react";
import { GridToolbar } from '@mui/x-data-grid-pro';
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox, Paper, Input,IconButton, FormControl, TextField, Button, Box, Icon, MenuItem } from '@mui/material';
// import { InputAdornment } from '@material-ui/core';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowBack, Close  } from '@mui/icons-material';

const AddBatchAdvisor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batchSection, setBatchSection] = useState("");
  const [department, setDepartment] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

 //axios request to add batch advisor
  const handleSubmit = (e) => {
    var active = isActive ? "Actice" : "Inactive";
    e.preventDefault();
    const data = {
    BatchAdvisorName: name,
    BatchAdvisorEmail: email,
    BatchAdvisorStatus : active,
    BatchSection: batchSection,
    BatchAdvisorDep : department,
   
    };
    axios

      .post("http://localhost:5000/admin/batchadvisor/add", data)
      .then((res) => {
        console.log(res);
        navigate("/admin/batchadvisor");
      })
      .catch((err) => {
        console.log(err);
      });
  };

        
  return (
    <AdminLayout>
      <section className="flex w-full h-full justify-center items-center">
        <div className="w-full bg-white rounded p-4 m-4">
        <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => navigate('/admin/batchadvisor')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h8">Go Back</Typography>
        </Toolbar>
      </AppBar>
          <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6 p-4">
            Add Batch Advisor
          </h1>
          <form
            onSubmit={handleSubmit} 
            className="bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="name"
                  label="Name"
                  variant="filled"
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
                  label="Email"
                  variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="batch-section"
                  label="Batch Section"
                  variant="filled"
                  value={batchSection}
                  onChange={(e) => setBatchSection(e.target.value)}
                  required
                />
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="department"
                  label="Department"
                  variant="filled"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
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

        </div>
        {/* </div> */}
      </section>
    </AdminLayout>
  );
};

export default AddBatchAdvisor;
