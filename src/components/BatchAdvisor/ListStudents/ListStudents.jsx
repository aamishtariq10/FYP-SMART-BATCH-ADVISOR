// import React from "react";
// import { BatchAdvisorLayout } from "../../../layouts/BatchAdvisorLayout";
// //import es from "../assets/keywords.jpg";
// const ListStudents = () => {
//   return (
//     <BatchAdvisorLayout>
//       <section class="flex flex-row w-full h-full justify-center items-center">
//         <div className="mx-4 my-4 w-full w-full">
//           <div className="rounded-lg bg-white text-center shadow md:items-center md:p-6 xl:p-8">
//             <div className="bg-blue-900">
              
//             </div>
//             <div>
             
//             </div>
//           </div>
//         </div>
//       </section>
//     </BatchAdvisorLayout>
//   );
// };
// export default ListStudents;





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
import { BatchAdvisorLayout } from "../../../layouts/BatchAdvisorLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const ListStudents = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.id;
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    //const [openUpdate, setOpenUpdate] = React.useState(false);
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    const [open, setOpen] = React.useState(false);
    //if update is clicked
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getData = async () => {
        try {
            const student = await axios.get("http://localhost:5000/batchadvisor/liststudents/get", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            },);
            console.log(student.data.data);

            const data = student.data.data.map(row => ({
                ...row,
                allowed: row.allowed ? "Allowed" : "Blocked"
            }));
            setRows(data);
        } catch (error) {
            toast.error("No data found");
        }
    };

    React.useEffect(() => {
        getData();
    }, []);

    const handleClickOpen = (row) => {
        navigate(`update/${row.email}/${row.id}`, { state: { data: row } });
    };
    const AddNewStudent = (row) => {
        navigate(`new`);
    };
    const filterRowsByName = (rows) => {
        if (!rows || rows.length === 0) {
            return [];
        }
        return rows.filter(row => row.email.toLowerCase().includes(searchValue.toLowerCase()));
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

        { field: 'id', headerName: 'User id', width: 100 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'email', headrName: 'Email', width: 300 },
        { field: 'allowed', headerName: 'Status', width: 100 },

    ];
    return (
        <BatchAdvisorLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center flex-row"
            >
                <div className="flex flex-col items-start">
                    <Typography variant="h5" color="primary" align="center" fontWeight="bold">
                        Users
                    </Typography>
                    <Typography variant="body1" color="primary">
                        You can see all the Users here
                    </Typography>
                </div>
                <div className="flex-grow"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    {/* <div className="mb-4 sm:mb-0">
                        <AddByUpload
                        //  getData={getData}
                        />
                    </div> */}
                   
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
                            <Button >Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </section>
        </BatchAdvisorLayout>
    );
};

export default ListStudents;
