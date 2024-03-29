import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { MainLayout } from "../../../../layouts/MainLayout";
import { GridToolbar } from "@mui/x-data-grid-pro";
import { Typography, Paper, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import FolderCopySharpIcon from "@mui/icons-material/FolderCopySharp";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
const RequestedCourses = () => {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const getRowId = (row) => row.id;
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
  const [open, setOpen] = React.useState(false);

  const getData = async () => {
    try {
      const student = await axios.get(
        "http://localhost:5000/student/request/Coursereg/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(student.data.data);
      setRows(student.data.data);
      console.log(student);
    } catch (error) {
      toast.error("No data found");
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  console.log(rows);
  const AddNewStudent = (row) => {
    navigate(`add`);
  };
  //   const filterRowsByName = (rows) => {
  //     if (!rows || rows.length === 0) {
  //       return [];
  //     }
  //     return rows.filter((row) =>
  //       row.sessionyear.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //   };
  const selectRowstoDelete = (row) => {
    const selectedRows = row;
    setSelectedRows(selectedRows);
  };
  const handleClickOpenDialogue = () => {
    if (selectedRows.length === 0) {
      toast.error("No rows selected");
    } else {
      setOpen(true);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleClose = (row) => {
    console.log(selectedRows);
    axios
      .put(
        `http://localhost:5000/admin/scheme-of-study/delete`,
        {
          data: { ids: selectedRows },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        toast.info(res.data.message);
        getData();
      })
      .catch((err) => {
        toast.error(err.data.message);
      });

    setOpen(false);
  };
  // const handleCancelRequest = (id) => {
  //   console.log(selectedRows);
  //   axios
  //     .put(
  //       `http://localhost:5000/student/request/canecl/:${id}`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       toast.info(res.data.message);
  //       getData();
  //     })
  //     .catch((err) => {
  //       toast.error(err.data.message);
  //     });
  // };
  const columns = [
    {
      field: "delete",
      width: 75,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <IconButton onClick={handleClickOpenDialogue}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    // { field: 'id', headerName: 'ID', width: 100 },
    { field: "StudentRegNo", headerName: "Student Reg No", width: 120 },
    { field: "course_code", headerName: "Course Code", width: 120 },
    { field: "course_title", headerName: "Course Title", width: 200 },
    { field: "semester", headerName: "Semester", width: 100 },
    { field: "credits", headerName: "Credits", width: 150 },
    { field: "course_type", headerName: "Course Type", width: 150 },
    { field: "teacher", headerName: "Teacher", width: 150 },
    { field: "status", headerName: "Request Status", width: 150 },
    {
      field: "action",
      headerName: "Review Request",
      sortable: false,
      width: 130,
      renderCell: ({ row }) => (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`request`, { state: { data: row } });
          }}
        >
          <PreviewIcon
            className="w-2 h-2 sm:w-6 sm:h-6 text-white"
            aria-hidden="true"
          />
        </Button>
      ),
    },
    {
      field: "cancel",
      headerName: "Cancel Request",
      sortable: false,
      width: 130,
      renderCell: ({ row }) => (
        <Button
          type="button"
          variant="contained"
          color="error"
         // onClick={handleCancelRequest(row.id)}
        >
          Cancel
        </Button>
      ),
    },
    // {
    //   field: "courses",
    //   headerName: "Add New Courses to student",
    //   sortable: false,
    //   width: 200,
    //   renderCell: ({ row }) => (
    //     <Button
    //       type="submit"
    //       variant="contained"
    //       color="primary"
    //       onClick={() => {
    //         navigate(`studentcourses/add`, { state: { data: row } });
    //       }}
    //     >
    //       <PostAddIcon
    //         className="w-2 h-2 sm:w-6 sm:h-6 text-white"
    //         aria-hidden="true"
    //       />
    //     </Button>
    //   ),
    // },
  ];
  return (
    <MainLayout>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="p-10 flex justify-between items-center flex-row"
      >
        <div className="flex flex-col items-start">
          <Typography
            variant="h5"
            color="primary"
            align="center"
            fontWeight="bold"
          >
            Requested Courses
          </Typography>
          <Typography variant="body1" color="primary">
            You can your courses Requests Here
          </Typography>
        </div>
      </Box>

      <section class="flex flex-col w-full px-4 h-full justify-center items-center">
        <div className="rounded-lg bg-white text-center shadow p-4 my-4 mx-4 w-full h-screen">
          <DataGrid
            className="p-4"
            rows={rows}
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
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
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
    </MainLayout>
  );
};

export default RequestedCourses;
