import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { GridToolbar } from '@mui/x-data-grid-pro';
import { Typography, Box } from '@mui/material';

import { BatchAdvisorLayout } from "../../../layouts/BatchAdvisorLayout";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const PendingCoursesStudent = () => {
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.id;
    const params = useParams()
    const [searchValue, setSearchValue] = React.useState('');
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    const getData = async () => {
        try {
            const student = await axios.get(
                `http://localhost:5000/student/pendingcourses/${params.StudentRegNo}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            const updatedRows = student.data.data.map((record, index) => {
                return {
                    ...record,
                    id: index + 1,
                    StudentRegNo: params.StudentRegNo,
                    CurrentSemester: params.CurrentSemester,
                };
            });

            setRows(updatedRows);
            console.log(updatedRows);
        } catch (error) {
            toast.error("No data found");
        }
    };

    React.useEffect(() => {
        getData();
    }, []);
    const filterRowsByName = (rows) => {
        if (!rows || rows.length === 0) {
            return [];
        }
        return rows.filter(row => row.StudentRegNo.toLowerCase().includes(searchValue.toLowerCase()));
    };

    const columns = [
        { field: 'StudentRegNo', headerName: 'Student Reg No', width: 130 },
        { field: 'course_title', headerName: 'Course Title', width: 250 },
        { field: 'course_type', headrName: 'Course Type', width: 100 },
        { field: 'course_code', headerName: 'Course Code', width: 100 },
        { field: 'credits', headerName: 'Credits', width: 150 },
        { field: 'CurrentSemester', headerName: 'Current Semester', width: 150 },

    ];
    return (
        <BatchAdvisorLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center flex-row"
            >
                <div className="flex flex-col items-start">
                    <Typography variant="h5" color="primary" align="center" fontWeight="bold">
                        Student Results
                    </Typography>
                    <Typography variant="body1" color="primary">
                        Here you can View Student Results
                    </Typography>
                </div>
                <div className="flex-grow"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between">

                </div>


            </Box>

            <section classname="flex flex-col w-full px-4 h-full justify-center items-center">

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
                        //checkboxSelection
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
        </BatchAdvisorLayout>
    );
};

export default PendingCoursesStudent;
