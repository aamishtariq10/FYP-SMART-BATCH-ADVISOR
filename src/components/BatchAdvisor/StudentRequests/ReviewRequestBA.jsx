import React, { useState, useRef, useEffect } from "react";
import { BatchAdvisorLayout } from "../../../layouts/BatchAdvisorLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    IconButton,
    TextField,
    Button,
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
// import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

import { useNavigate, useLocation } from "react-router-dom";

const ReviewRequestBA = () => {
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const rowData = location.state?.data;
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const config =
    {
        headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };
    const handleReplySubmit = async () => {
        if (!reply) {
            setErrorMsg("Reply is not allowed to be empty");
            return;
        }
        setErrorMsg("");
        const currentTime = new Date().toLocaleString();
        const newReply = {
            batchadvisor: user?.BatchAdvisorName,
            comment: reply,
            time: currentTime,
        };
        try {
            const res = await axios
                .post(
                    `http://localhost:5000/student/request/comment/reply/${rowData.id}`,
                    newReply, config

                )
            if (res.data.status === 200) {
                const data = {
                    seenStudent: false
                }
                await updateSeen(data)
                setReply("");
                toast.info(res?.data?.message);
            }
            else {
                toast.error(res?.data?.message);
            }
        }
        catch (error) {
            toast.error("Internal server Error")
        }

    };
    const getReq = async () => {
        const res = await axios
            .get(
                `http://localhost:5000/student/request/comment/reply/${rowData.id}`, config

            )

        console.log(res?.data?.data[0])
        setComments(JSON.parse(res?.data?.data[0]?.comments))
    };
    useEffect(() => {
        getReq();
    }, [reply]);
    const containerRef = useRef(null);
    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [comments]);
    const updateSeen = async (data) => {
        const res = await axios
            .post(
                `http://localhost:5000/student/request/comment/updateseen/${rowData.id}`, data, config
            )
    };
    useEffect(() => {
        const data = {
            seenBatchAdvisor: true
        }
        updateSeen(data);
    }, [rowData]);
    return (
        <BatchAdvisorLayout>
            <AppBar position="static" sx={{ bgcolor: "primary" }}>
                <Toolbar>
                    <IconButton>
                        <ArrowBack onClick={() => navigate(-1)} />
                    </IconButton>
                    <Typography variant="h8">Back</Typography>
                    <Typography variant="h6" className="ml-4 text-center w-full">
                        Review Course Request
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    bgcolor: "primary.main",
                }}
                className="p-6 flex justify-between items-center flex-row"
            >
                <div className="flex flex-col items-start px-4">
                    <Typography
                        variant="h5"
                        color="white"
                        align="center"
                        fontWeight="bold"
                    >
                        Course
                    </Typography>
                    <Typography variant="body1" color="white">
                        {rowData?.course_title}
                    </Typography>
                </div>
                <div className="flex-grow"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className=" rounded-md bg-orange-400 m-2"></div>
                </div>
            </Box>

            <div className="max-w-2xl mx-auto px-4 py-8">
                <Typography variant="h4" className="text-2xl font-bold mb-4">
                    Course Request Details
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Field</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Student Reg No</TableCell>
                                <TableCell>{rowData?.StudentRegNo}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Course Code</TableCell>
                                <TableCell>{rowData?.course_code}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Course Title</TableCell>
                                <TableCell>{rowData?.course_title}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Semester</TableCell>
                                <TableCell>{rowData?.semester}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Course Type</TableCell>
                                <TableCell>{rowData?.course_type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Course Teacher</TableCell>
                                <TableCell>{rowData.teacher}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Section</TableCell>
                                <TableCell>{rowData.class_section}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h5" className="text-xl font-bold mb-4" >
                    Comments
                </Typography>
                <div className="flex overflow-x-auto h-60 mb-4" ref={containerRef}>
                    <List className="mb-2">
                        {comments?.map((comment, index) => (
                            <ListItem key={index} className="mb-2">
                                <ListItemText
                                    primary={
                                        <div
                                            className={`${comment?.batchadvisor === user?.BatchAdvisorName
                                                ? 'bg-blue-500 rounded text-white text-right ml-auto'
                                                : 'bg-gray-300 rounded text-left mr-auto'
                                                } p-2 w-1/2 break-all`}
                                            style={{ overflowWrap: 'break-word' }}
                                        >
                                            {comment?.comment}
                                        </div>
                                    }
                                    secondary={
                                        <div>
                                            <span className="block mb-1">
                                                {comment?.batchadvisor === user?.BatchAdvisorName ? 'You' : comment?.batchadvisor} {comment.time}
                                            </span>
                                        </div>
                                    }
                                    className={`text-${comment?.batchadvisor === user?.BatchAdvisorName ? 'right' : 'left'}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div className="mb-2">
                    <TextField
                        multiline
                        rows={2}
                        variant="outlined"
                        placeholder="Reply to student"
                        value={reply}
                        onChange={handleReplyChange}
                        className="w-full"
                    />
                    {errorMsg ? (
                        <div className="text-red-500 text-sm">{errorMsg + " \n"}</div>
                    ) : null

                    }
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReplySubmit}
                >
                    Submit Reply
                </Button>
                {/* <ToastContainer /> */}
            </div>

        </BatchAdvisorLayout>
    );
};

export default ReviewRequestBA;
