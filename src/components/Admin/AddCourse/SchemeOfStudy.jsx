import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { GridToolbar, GridContextProvider } from '@mui/x-data-grid-pro';
import { Typography, Paper, TextField, Button, Box, Checkbox } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SchemeOfStudy = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.SrNO;
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    const AddNewStudent = (row) => {
        navigate(`add`);
    };
    const filterRowsByName = (rows) => {
        if (!rows || rows.length === 0) {
            return [];
        }
        return rows.filter(row => row.StudentName.toLowerCase().includes(searchValue.toLowerCase()));
    };
    const columns = [
        { field: 'BatchAdvisorID', headerName: 'BatchAdvisorID', width: 130 },
        { field: 'StudentRegNo', headerName: 'StudentRegNo', width: 200 },
        { field: 'StudentName', headerName: 'StudentName', width: 150 },
        { field: 'StudentEmail', headrName: 'StudentEmail', width: 250 },
        { field: 'StudentSection', headerName: 'StudentSection', width: 130 },
        { field: 'StudentStatus', headerName: 'StudentStatus', width: 130 },
        { field: 'CurrentSemester', headerName: 'CurrentSemester', width: 130 },
    ];
    return (
        <AdminLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center flex-row"
            >
                <div className="flex flex-col items-start">
                    <Typography variant="h5" color="primary" align="center" fontWeight="bold">
                        Students
                    </Typography>
                    <Typography variant="body1" color="primary">
                        You can see all the Students here
                    </Typography>
                </div>
                <div className="flex-grow"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    {/* <div className="mb-4 sm:mb-0">
                    <AddByUpload
                        //  getData={getData}
                        />
                    </div> */}
                    <Button
                        onClick={AddNewStudent}
                        className="flex items-center justify-center space-x-1 h-12 px-4 mx-4 text-sm font-medium text-white bg-blue-900 rounded-md shadow-lg sm:text-base sm:px-6"
                    >
                        <PersonAddAlt1Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        <span className="hidden sm:inline-block">Add New</span>
                    </Button>
                </div>


            </Box>

            <section class="flex flex-col w-full px-4 h-full justify-center items-center">
                <Paper
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    className="flex items-center w-full max-w-512 px-8 m-4 py-4 rounded-4"
                >
                    <TextField
                        variant="standard"
                        margin="dense"
                        required
                        fullWidth
                        id="Search"
                        name="Search"
                        autoComplete="StudentName"
                        autoFocus
                            onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search Student By Name"
                        InputProps={{
                            startAdornment: <PersonSearchIcon />,
                            disableUnderline: true,
                        }}
                    />
                </Paper>
                <div className="rounded-lg bg-white text-center shadow p-4 my-4 mx-4 w-full h-screen

                ">
                    <DataGrid
                        className="p-4"
                         rows={filterRowsByName(rows)}
                        columns={columns}
                         getRowId={getRowId}
                        pageSize={10}
                        // onRowSelectionModelChange={(rows) => {
                        //     selectRowstoDelete(rows);
                        // }}
                        checkboxSelection
                        // onRowClick={(rows) => {
                        //     handleClickOpen(rows.row);
                        // }}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />


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
            </section>
        </AdminLayout>
    );
};

export default SchemeOfStudy;
