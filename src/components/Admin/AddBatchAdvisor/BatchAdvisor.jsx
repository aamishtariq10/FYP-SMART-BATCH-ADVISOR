import { Button, Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from "react";
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';

import { AdminLayout } from "../../../layouts/AdminLayout";
import axios from "axios";
import { Navigate } from "react-router-dom";

const columns = [
    //{ field: 'SrNo', headerName: 'SrNo', width: 200 },
    { field: 'BatchAdvisorID', headerName: 'BatchAdvisorID', width: 200 },
    { field: 'BatchAdvisorName', headerName: 'Name', width: 200 },
    { field: 'BatchAdvisorEmail', headerName: 'Email', width: 200 },
    { field: 'BatchAdvisorStatus', headerName: 'Status', width: 200 },
    { field: 'BatchSection', headerName: 'Section', width: 200 },
];

const BatchAdvisor = () => {
    const [rows, setRows] = React.useState([]);
    const getRowId = (row) => row.BatchAdvisorID;
   // const navgation = Navigate();
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
    return (
        <AdminLayout>
            <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="p-10 flex justify-between items-center "
            >
                {" "}
                <div className="flex items-center">
                    {/* <Icon>event_note</Icon> */}
                    <h1><b> Batch Advisors</b></h1>
                </div>
                <Button
                    //  component={Link}
                    //to="/apps/servicesRenewals/service_schedule/new"
                    className="whitespace-nowrap  shadow-lg rounded-md btn"
                    variant="contained"
                    color="primary"
                >
                    + Add new Batch Advisor
                </Button>
            </Box>
            <section class="flex flex-col w-full p-4 h-full justify-center items-center">
                <div className="rounded-lg bg-white text-center shadow p-4 my-4 mx-4 w-full h-screen
                ">
                    <DataGrid
                    className="p-4"
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                        components={{ Toolbar: GridToolbar }}
                        componentsProps={{
                            filterPanel: {
                                disableAddFilterButton: true,
                                disableRemoveAllButton: true,
                            },
                        }}
                    />
                </div>

            </section>
        </AdminLayout>
    );
};

export default BatchAdvisor;
