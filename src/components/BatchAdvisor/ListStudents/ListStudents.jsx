import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { GridToolbar } from '@mui/x-data-grid-pro';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { BatchAdvisorLayout } from "../../../layouts/BatchAdvisorLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import PreviewIcon from '@mui/icons-material/Preview';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import {
    Table,
    TableHead,
    FormControl,
    InputLabel,
    TableBody,
    TableRow,
    TableCell,
    Select,
    MenuItem,
    Button,
    Typography, Paper, TextField, Box
} from "@mui/material";


const ListStudents = () => {
    const [rows, setRows] = React.useState([]);
    const navigate = useNavigate();
    const getRowId = (row) => row.SrNo;
    const [searchValue, setSearchValue] = React.useState('');
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    const user = JSON.parse(localStorage.getItem("user"));
    const dataA = {
        BatchSection: user.BatchSection,
        BatchAdvisorEmail: user.email
    };

    const getData = async () => {
        try {
            const student = await axios.post("http://localhost:5000/batchadvisor/student/records/get", dataA, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            },);
            console.log(student);

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
        return rows.filter(row => row.StudentEmail.toLowerCase().includes(searchValue.toLowerCase()));
    };

    // const setSearchValues=()=>{
    //     // const navigate = useNavigate();
    //     // navigate('/resultcard', { state: { id: 7, color: 'green' } });
    // }



    const columns = [


        { field: 'StudentRegNo', headerName: 'Reg No', width: 150 },
        { field: 'StudentName', headerName: 'Name', width: 150 },
        { field: 'StudentSection', headerName: 'Section', width: 120 },
        { field: 'StudentEmail', headrName: 'Email', width: 250 },
        { field: 'CurrentSemester', headerName: 'Semester', width: 100 },
        { field: 'StudentStatus', headerName: 'Status', width: 100 },
        {
            field: 'CGPA',
            headerName: 'Student CGPA',
            width: 150,
            renderCell: ({ value }) => {
                let color = '';
                if (value < 2) {
                    color = 'red';
                } else if (Math.abs(value - 2.2) <= 0.2) {
                    color = 'orange';
                }
                return <span style={{ color }}>{value}</span>;
            },
        },
        {
            field: "Results",
            headerName: "Results",
            sortable: false,
            renderCell: ({ row }) =>

                <Link class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" to={'/resultstudent?id=' + row.StudentRegNo}
                >
                    Result
                </Link>,
        },

        {
            field: 'regcourses',
            headerName: 'Registered Courses',
            sortable: false,
            width: 150,
            renderCell: ({ row }) => (
                <Button type="submit" variant="contained" color="primary"
                    onClick={() => {
                        navigate(`/batchadvisor/studentslist/regCourses/${row.StudentRegNo}/${row.CurrentSemester}`);
                    }}
                >
                    <PreviewIcon className="w-2 h-2 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                </Button>
            ),
        },
        {
            field: 'Pending',
            headerName: 'Pending Courses',
            sortable: false,
            width: 150,
            renderCell: ({ row }) => (
                <Button type="submit" variant="contained" color="primary"
                    onClick={() => {
                        navigate(`/batchadvisor/studentslist/pending/${row.StudentRegNo}/${row.CurrentSemester}`);
                    }}
                >
                    <PendingActionsIcon className="w-2 h-2 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                </Button>
            ),
        },
    ];
    return (
        <BatchAdvisorLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center flex-row"
            >
                <div className="flex flex-col items-start">
                    <Typography variant="h5" color="primary" align="center" fontWeight="bold">
                        List of Students
                    </Typography>
                    <Typography variant="body1" color="primary">
                        You can see all the students here
                    </Typography>
                </div>
                <div className="flex-grow"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between">

                </div>


            </Box>

            <section className="flex flex-col w-full px-4 h-full justify-center items-center">
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
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search Student By email"
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

export default ListStudents;
