
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Alert, FormControlLabel, Checkbox, IconButton, FormControl, TextField, Button } from '@mui/material';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const UpdateBatchAdvisor = () => {
  const [BatchAdvisorName, setName] = useState("");
  const [BatchAdvisorEmail, setEmail] = useState("");
  const [BatchSection, setBatchSection] = useState("");
  const [BatchAdvisorDep, setDepartment] = useState("");
  const [BatchAdvisorStatus, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { batchadvisorname } = useParams();
  React.useEffect(() => {
    const data = {
      BatchAdvisorName,
      BatchAdvisorEmail,
      BatchAdvisorStatus,
      BatchSection,
      BatchAdvisorDep
    };
    axios
      .get(`http://localhost:5000/admin/batchadvisor/get/${batchadvisorname}/${id}`, {
        data
      })
      .then((res) => {
        var data = res.data.data[0];
        setName(data.BatchAdvisorName);
        setEmail(data.BatchAdvisorEmail);
        if ((data.BatchAdvisorStatus.toLowerCase()) === "active") {
          setIsActive(true);
        }
        setBatchSection(data.BatchSection);
        setDepartment(data.BatchAdvisorDep);
      });
  }, [id]);

  //axios request to add batch advisor
  const handleSubmit = (e) => {
    //change it into if else
    var active;
    if (BatchAdvisorStatus) {
      active = "Active";
    } else {
      active = "Inactive";
    }
    e.preventDefault();
    const data = {
      BatchAdvisorName,
      BatchAdvisorEmail,
      BatchAdvisorStatus: active,
      BatchSection,
      BatchAdvisorDep,
    };
    //console.log(data);
    axios.put(`http://localhost:5000/admin/batchadvisor/update/${batchadvisorname}/${id}`, data)
      .then((res) => {
        console.log(res.data.message);
        setTimeout(() => {
          toast.success(res.data.message, { autoClose: 1500 })
          navigate("/admin/batchadvisor");
        }, 1000);
        toast.success(res.data.message)
        navigate("/admin/batchadvisor");
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 1500 })
        //   console.log(err.response.data.message);  
        // console.log(err);
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
              <Typography variant="h8">Back</Typography>
              <Typography variant="h6" className="ml-4 text-center w-full">Update Batch Advisor</Typography>
            </Toolbar>

          </AppBar>

          <form
            onSubmit={handleSubmit}
            className="bg-gray shadow-md rounded  px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <FormControl fullWidth>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={BatchAdvisorName}
                  placeholder="John Doe"
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
                  variant="outlined"
                  value={BatchAdvisorEmail}
                  placeholder="xyz@cuilahoe.edu.pk"
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
                  variant="outlined"
                  placeholder="FA19-BCS-A"
                  value={BatchSection}
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
                  value={BatchAdvisorDep}
                  placeholder="CSE / EEE / ME / CE / BBA / MBA"
                  onChange={(e) => setDepartment(e.target.value.toUpperCase())}
                  required
                />
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={BatchAdvisorStatus}
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
                Update Records
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

export default UpdateBatchAdvisor;
