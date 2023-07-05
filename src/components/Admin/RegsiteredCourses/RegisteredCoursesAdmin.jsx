import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { GridToolbar, GridContextProvider } from '@mui/x-data-grid-pro';
import { Typography, Paper, TextField, Button, Box, Checkbox } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import AddByUpload from './AddByUpload';

const RegisteredCoursesAdmin = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.id;
    const [searchValue, setSearchValue] = React.useState('');
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    const getData = async () => {
        try {
            const student = await axios.get("http://localhost:5000/student/request/Coursereg/get/registered",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }
                },);
            setRows(student.data.data);
            console.log(student);
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
        { field: 'semester', headerName: 'Semester', width: 150 },
        { field: 'teacher', headerName: 'Teacher', width: 200 },
        { field: 'Section', headerName: 'Section', width: 130 },
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
                        // checkboxSelection
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
                    {/* <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Confirm Delete
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={handleClose}>Delete</Button>
                        </DialogActions>
                    </Dialog> */}
                </div>
            </section>
        </AdminLayout>
    );
};

export default RegisteredCoursesAdmin;
