import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { GridToolbar } from '@mui/x-data-grid-pro';
import { Typography, Paper, FormControl, TextField, Button, Box, InputLabel, MenuItem, Select } from '@mui/material';
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
const Results = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.ResultID;
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [StudentRegNo, setStudentRegNo] = React.useState([]);
    const [selectedRegNo, setSelectedRegNo] = React.useState('');
    const [SessionYear, setSessionYear] = React.useState([]);
    const [selectedSessionYear, setSelectedSessionYear] = React.useState('');
    const [course, setCourse] = React.useState([]);
    const [selectedCourse, setSelectedCourse] = React.useState('');
    const [warningMsg, setWarningMsg] = React.useState('');
    console.log(selectedRegNo);
    const [open, setOpen] = React.useState(false);
    const getData = async () => {
        try {

            const results = await axios.get("http://localhost:5000/admin/results/get/");
            setRows(results.data.data);
            if (results.data.data.length === 0) {
                toast.error("No data found");
            }
        }
        catch (err) {
            toast.error("No data found");
        }
    };

    React.useEffect(() => {
        getData();
    }, []);
    React.useEffect(() => {
        if (searchValue) {
            setSelectedRegNo('');
            setSelectedSessionYear('');
            setSelectedCourse('');
        }
    }, [searchValue]);
    React.useEffect(() => {
        setCourse([]);
        setSelectedCourse('')
        // Reset the Course dropdown when Regno or Session is changed
    }, [selectedRegNo, selectedSessionYear]);
    React.useEffect(() => {
        setSessionYear([]);
        setSelectedSessionYear(''); // Reset the Session dropdown when Regno is changed
    }, [selectedRegNo]);
    React.useEffect(() => {
        if (!rows) {
            return;
        }
        const studentregno = rows.map((row) => row.StudentRegNo);
        const Regno = studentregno.filter((row, index, r) => r.indexOf(row) === index);
        setStudentRegNo(Regno);

        const filteredRows = rows.filter((row) => row.StudentRegNo === selectedRegNo);
        const sessionYears = filteredRows.map((row) => row.SessionYear);
        const session = sessionYears.filter((row, index, r) => r.indexOf(row) === index);
        setSessionYear(session);

        const filteredCourses = rows.filter((row) => row.SessionYear === selectedSessionYear && row.StudentRegNo === selectedRegNo);
        const mapcourses = filteredCourses.map((row) => row.Course);
        const uniquecourse = mapcourses.filter((row, index, r) => r.indexOf(row) === index);
        setCourse(uniquecourse);

    }, [rows, selectedRegNo, selectedSessionYear, selectedCourse]);

    const handleClickOpen = (row) => {
        navigate(`update/${row.StudentRegNo}/${row.ResultID}`, { state: { data: row } });
    };
    const AddNewResult = (row) => {
        navigate(`new`);
    };

    const filterRowsByName = (rows) => {
        if (!rows || rows.length === 0) {
            return [];
        }
        if (!selectedRegNo && !selectedSessionYear) {
            return rows;
        }
        if (selectedRegNo && !selectedSessionYear) {
            return rows.filter(row => row.StudentRegNo === selectedRegNo);
        }
        if (selectedRegNo && selectedSessionYear && !selectedCourse) {
            return rows.filter(row => row.StudentRegNo === selectedRegNo && row.SessionYear === selectedSessionYear);
        }
        if (selectedRegNo && selectedSessionYear && selectedCourse) {
            return rows.filter(row => row.StudentRegNo === selectedRegNo && row.SessionYear === selectedSessionYear && row.Course === selectedCourse);
        }
        return rows.filter(row => row.StudentRegNo.toLowerCase().includes(searchValue.toLowerCase()));
    };
    const selectRowstoDelete = (row) => {
        const selectedRows = row;
        setSelectedRows(selectedRows);
    };
    const handleClickOpenDialogue = () => {
        if (selectedRows.length === 0) {
            toast.error("No rows selected");
        }
        else {
            setOpen(true);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleClose = (row) => {
        console.log(selectedRows)
        axios
            .put(`http://localhost:5000/admin/students/delete`, { data: { ids: selectedRows } })
            .then((res) => {
                toast.info(res.data.message);
                getData();
            })
            .catch((err) => {
                toast.error(err.data.message);
            });

        setOpen(false);
    };
    const columns = [
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => (
                <IconButton onClick={handleClickOpenDialogue}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
        { field: 'StudentRegNo', headerName: 'StudentRegNo', width: 130 },
        { field: 'SessionYear', headerName: 'Session', width: 80 },
        { field: 'CourseStatus', headrName: 'CourseStatus', width: 100 },
        { field: 'CourseCode', headerName: 'CourseCode', width: 100 },
        { field: 'Course', headerName: 'Course', width: 200 },
        { field: 'Class', headerName: 'Class', width: 130 },
        { field: 'Teacher', headerName: 'Teacher', width: 200 },
        { field: 'Marks', headerName: 'Marks', width: 80 },
        { field: 'Grade_LG', headerName: 'LG', width: 80 },
        { field: 'GPA', headerName: 'GPA', width: 80 },
        { field: 'CGPA', headerName: 'CGPA', width: 80 },
        { field: 'SS', headerName: 'SS', width: 80 },
    ];
    return (
        <AdminLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center flex-row"
            >
                <div className="flex flex-col items-start">
                    <Typography variant="h5" color="primary" align="center" fontWeight="bold">
                        Results
                    </Typography>
                    <Typography variant="body1" color="primary">
                        You can see Results here
                    </Typography>
                </div>
                <div className="flex-grow"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                        <AddByUpload
                        //  getData={getData}
                        />
                    </div>
                    <Button
                        onClick={AddNewResult}
                        className="flex items-center justify-center space-x-1 h-12 px-4 mx-4 text-sm font-medium text-white bg-blue-900 rounded-md shadow-lg sm:text-base sm:px-6"
                    >
                        <PersonAddAlt1Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        <span className="hidden sm:inline-block">Add New</span>
                    </Button>
                </div>


            </Box>

            <section className="flex flex-col w-full px-4 h-full">
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
                        autoComplete="StudentRegNo"
                        autoFocus
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="   Search Results by Registeration Number"
                        InputProps={{
                            startAdornment: <PersonSearchIcon />,
                            disableUnderline: true,
                        }}
                    />
                </Paper>
                <div className="flex flex-col items-start m-4">
                    <Typography variant="body1" color="primary">
                        You can filter the results by (Registration Number , Session and Courses)
                    </Typography>
                    <Typography variant="body1" color="red">
                        Note: To apply filters on courses , you need to select all the filters first
                    </Typography>
                </div>
                <div className="lg:flex lg:items-center w-full lg:justify-between m-2">
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                        <FormControl className="w-full mr-2">
                            <InputLabel id="BatchInput">Registration Number</InputLabel>
                            <Select
                                labelId="RegistrationNumberSelect"
                                id="RegistrationNumber"
                                label="Registration #"
                                value={selectedRegNo}
                                onChange={(event) => {
                                    setSelectedRegNo(event.target.value)

                                }}
                            > <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {StudentRegNo.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                        <FormControl className="w-full m-1">
                            <InputLabel id="Session">Session</InputLabel>
                            <Select
                                labelId="Session"
                                id="Session"
                                label="Session"
                                value={selectedSessionYear}
                                onChange={(event) => {
                                    setSelectedSessionYear(event.target.value)

                                }}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                {SessionYear.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                        <FormControl className="w-full m-1">
                            <InputLabel id="DepartmentLabel">Courses</InputLabel>
                            <Select
                                labelId="Session"
                                id="Session"
                                label="Session"
                                value={selectedCourse}
                                onChange={(event) => setSelectedCourse(event.target.value)}
                            > <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {course.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                </div>

                <div className="rounded-lg bg-white text-center shadow p-4 my-4 mx-4 w-full h-screen

                ">
                    <DataGrid
                        className="p-4"
                        rows={filterRowsByName(rows)}
                        columns={columns}
                        getRowId={getRowId}
                        pageSize={20}
                        onRowSelectionModelChange={(rows) => {
                            selectRowstoDelete(rows);
                        }}
                        checkboxSelection
                        onRowClick={(rows) => {
                            handleClickOpen(rows.row);
                        }}
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
                    <Dialog
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
                    </Dialog>
                </div>
            </section>
        </AdminLayout>
    );
};

export default Results;
