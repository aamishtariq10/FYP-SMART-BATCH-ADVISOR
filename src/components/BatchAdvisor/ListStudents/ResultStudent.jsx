import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { GridToolbar } from '@mui/x-data-grid-pro';
import { Typography, Paper, TextField, Button, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { BatchAdvisorLayout } from "../../../layouts/BatchAdvisorLayout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const ResultCard = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.ResultID;
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    //const [openUpdate, setOpenUpdate] = React.useState(false);
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    const [open, setOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const query = new URLSearchParams(useLocation().search);
debugger
    const getData = async () => {
        try {
            const student = await axios.get("http://localhost:5000/batchadvisor/student/results/get/" + query.get('id') , {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            },);
            setRows(student.data.data);
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

      { field: 'StudentRegNo', headerName: 'Registration Number', width: 140 },
        { field: 'CourseCode', headerName: 'Course Code', width: 100 },
        { field: 'Course', headerName: 'Course Name', width: 150 },
        { field: 'Class', headerName: 'Class', width: 150 },
        { field: 'Teacher', headrName: 'Faculty', width: 150 },
        { field: 'Marks', headerName: 'Marks', width: 100 },
        { field: 'CGPA', headerName: 'CPGA', width: 100 },
        

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

export default ResultCard;
