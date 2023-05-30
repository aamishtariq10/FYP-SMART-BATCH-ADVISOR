import React, { useState } from "react";
import { MainLayout } from "../../../../layouts/MainLayout";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Select,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  IconButton,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { TextareaAutosize, List, ListItem, ListItemText } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

import { useNavigate, useLocation } from "react-router-dom";
const ReviewRequest = () => {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  console.log(id);
  const rowData = location.state?.data;
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    // Logic to submit the reply to the backend or update state
    // ...
    // Clear the reply input field
    setReply("");
  };
  return (
    <MainLayout>
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
            {rowData.course_title}
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
        <List className="mb-8">
          <ListItem className="mb-4">
            <ListItemText primary={`Student Reg No: ${rowData.StudentRegNo}`} />
          </ListItem>
          <ListItem className="mb-4">
            <ListItemText primary={`Course Code: ${rowData.course_code}`} />
          </ListItem>
          <ListItem className="mb-4">
            <ListItemText primary={`Course Title: ${rowData.course_title}`} />
          </ListItem>
          <ListItem className="mb-4">
            <ListItemText primary={`Semester: ${rowData.semester}`} />
          </ListItem>
          {/* Add more list items for other details */}
        </List>
        <Typography variant="h5" className="text-xl font-bold mb-4">
          Comments
        </Typography>
        <List className="mb-4">
          {comments.map((comment, index) => (
            <ListItem key={index} className="mb-2">
              <ListItemText primary={comment} />
            </ListItem>
          ))}
        </List>
        <div className="mb-4">
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="Reply to Batch Advisor"
            value={reply}
            onChange={handleReplyChange}
            className="w-full"
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleReplySubmit}>
          Submit Reply
        </Button>
      </div>
    </MainLayout>
  );
};

export default ReviewRequest;
