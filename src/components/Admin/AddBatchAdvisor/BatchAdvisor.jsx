
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from "react";
import { GridToolbar } from '@mui/x-data-grid-pro';
import { InputLabel, Typography, Paper, Input, FormControl, TextField, Button, Box, Icon, MenuItem } from '@mui/material';
// import { InputAdornment } from '@material-ui/core';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const columns = [
    //{ field: 'SrNo', headerName: 'SrNo', width: 200 },
    { field: 'BatchAdvisorID', headerName: 'BatchAdvisorID', width: 130 },
    { field: 'BatchAdvisorName', headerName: 'Name', width: 200 },
    { field: 'BatchAdvisorEmail', headerName: 'Email', width: 300 },
    { field: 'BatchAdvisorStatus', headerName: 'Status', width: 130 },
    { field: 'BatchSection', headerName: 'Section', width: 130 },
    { field: 'BatchAdvisorDep', headerName: 'Department', width: 130 },
];

const BatchAdvisor = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.BatchAdvisorID;
    const [searchValue, setSearchValue] = React.useState('');
    const getData = () => {
        axios
            .get("http://localhost:5000/admin/batchadvisor/get")
            .then((res) => {
                setRows(res.data.data);

                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(getData, []);
    const handleClickOpen = (row) => {
        navigate(`update/${row.BatchAdvisorName}/${row.BatchAdvisorID}`);
    };
    const ClicktoAddNewBatchAdvisor = (row) => {
        navigate(`new`);
    };
    const filterRowsByName = (rows) => {
        return rows.filter(row => row.BatchAdvisorName.toLowerCase().includes(searchValue.toLowerCase()));
    };
    return (
        <AdminLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center "
            >
                {" "}
                <div className="flex flex-col items-start">
                    <Typography variant="h5" color="primary" align="center" fontWeight="bold">
                        Batch Advisors
                    </Typography>
                    <Typography variant="body1" color="primary">
                        You can see all the batch advisors here
                    </Typography>

                </div>
                <Button
                    onClick={ClicktoAddNewBatchAdvisor}
                    // to="/add"
                    className="flex flex-wrap items-center justify-center shadow-lg h-12 text-base sm:text-sm"
                    variant="contained"
                    color="primary"
                    shape="rounded"
                >
                    <PersonAddAlt1Icon className="mr-2" />
                    <span className="hidden sm:inline-block">Add new Batch Advisor</span>
                </Button>
            </Box>
            <section class="flex flex-col w-full px-4 h-full justify-center items-center">
                <Paper
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    className="flex items-center w-full max-w-512 px-8 m-4 py-4 rounded-4"
                >
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="Search"
                        name="Search"
                        autoComplete="Search"
                        autoFocus
                        onChange={(e) => setSearchValue(e.target.value)}

                        placeholder="Search Batch Advisor By Name"
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
                        checkboxSelection rowCount={rows.length}
                        onRowClick={(rows) => {
                            handleClickOpen(rows.row);
                        }}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </div>
            </section>
        </AdminLayout>
    );
};

export default BatchAdvisor;
