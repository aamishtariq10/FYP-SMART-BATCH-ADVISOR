import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { GridToolbar } from '@mui/x-data-grid-pro';
import { Typography, Paper, TextField, Button, Box } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FolderCopySharpIcon from '@mui/icons-material/FolderCopySharp';
const SchemeOfStudy = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.scheme_id;
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    const [open, setOpen] = React.useState(false);

    const getData = async () => {
        try {
            const student = await axios.get("http://localhost:5000/admin/scheme-of-study/get",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }
                },);
            console.log(student.data.data)
            setRows(student.data.data);
            console.log(student);
        } catch (error) {
            toast.error("No data found");
        }
    };

    React.useEffect(() => {
        getData();
    }, []);

    console.log(rows)
    const AddNewStudent = (row) => {
        navigate(`add`);
    };
    const filterRowsByName = (rows) => {
        if (!rows || rows.length === 0) {
            return [];
        }
        return rows.filter(row => row.sessionyear.toLowerCase().includes(searchValue.toLowerCase()));
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
            .put(`http://localhost:5000/admin/scheme-of-study/delete`, {
                data: { ids: selectedRows },
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }
                },)
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
            field: 'delete',
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => (
                <IconButton onClick={handleClickOpenDialogue}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
        { field: 'sessionyear', headerName: 'Session Year', width: 150 },
        { field: 'department', headerName: 'Department', width: 130 },
        {
            field: 'action',
            headerName: 'View Courses',
            sortable: false,
            width: 130,
            renderCell: ({ row }) => (
                <Button type="submit" variant="contained" color="primary"
                    onClick={() => {
                        navigate(`courses?id=${row.scheme_id}`, { state: { data: row } });
                    }}
                >
                    <FolderCopySharpIcon className="w-2 h-2 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                </Button>
            ),
        },
        {
            field: 'courses',
            headerName: 'Add New Courses to student',
            sortable: false,
            width: 200,
            renderCell: ({ row }) => (
                <Button type="submit" variant="contained" color="primary"
                    onClick={() => {
                        navigate(`studentcourses/add`, { state: { data: row } });
                    }}
                >
                    <FolderCopySharpIcon className="w-2 h-2 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                </Button>
            ),
        },
    ];
    return (
        <AdminLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center flex-row"
            >
                <div className="flex flex-col items-start">
                    <Typography variant="h5" color="primary" align="center" fontWeight="bold">
                        Scheme of studies
                    </Typography>
                    <Typography variant="body1" color="primary">
                        You can see all scheme of studies here
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
                        onRowSelectionModelChange={(rows) => {
                            selectRowstoDelete(rows);
                        }}
                        checkboxSelection
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

export default SchemeOfStudy;
