import React, { useEffect } from "react";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { toast } from "react-toastify";

function AddByUpload(props) {
  const { getData } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:5000/admin/batchadvisor/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("++++++++++=> ", res);
        toast.info(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getData();
      })
      .catch((err) => {
        console.log("++++++++++=> ", err);

        toast.error(err.response.data.message, { autoClose: 1500 });
      });
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        component="span"
        onClick={handleClickOpen}
        className="flex items-center justify-center space-x-1 h-12 px-4 mx-4 text-sm font-medium text-white bg-blue-900 rounded-md shadow-lg sm:text-base sm:px-6"
      >
        <UploadFileIcon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        <span className="hidden sm:inline-block"> Upload File</span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload CSV file</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                        Upload your file here
                    </DialogContentText> */}
          <input type="file" onChange={handleFileInputChange} accept=".csv" />
          {/* {selectedFile && (
                        <div>
                            <strong>Selected File:</strong> {selectedFile.name}
                        </div>
                    )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddByUpload;
