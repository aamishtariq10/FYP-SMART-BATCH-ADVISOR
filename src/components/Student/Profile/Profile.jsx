import React, { useState } from "react";
import { useEffect } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import userAvatar from "./../../../assets/nouser.png"; // Import the image
import { toast, ToastContainer } from "react-toastify";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const Profile = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(userAvatar);
  const [image_pic, setFile] = useState(null);


  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image_pic", image_pic);
    console.log(image_pic)
    formData.append("email", user.email);
    formData.append("role", user.role);

    const response = await fetch("http://localhost:5000/upload/profile", {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    if (response.status === 200) {
      user.profile = data.data.uri;
      localStorage.setItem('user', JSON.stringify(user));
      setImage(data.data.uri)
      toast.info(data.message, { hideProgressBar: true });
    } else {
      toast.error(data.message, { hideProgressBar: true });
    }

  };

  useEffect(() => {
    if (user && user.profile) {
      setImage(user.profile);
    }
  }, [handleSubmit, user]);


  return (
    <MainLayout>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={3}
            justify="center"
            alignItems="center"
            xs={12}
          >
            <Grid item xs={12} md={3}>
              <Avatar
                alt="User avatar"
                src={image ? image : userAvatar}
                className={classes.avatar}
              />
              <div>
                <input type="file" onChange={handleFileSelect} />
                <label htmlFor="upload-button">
                  <button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    component="span"
                    className={classes.button}
                  >
                    Upload
                  </button>
                </label>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom>
                Basic Information
              </Typography>
              <Typography variant="h6" gutterBottom>
                Name: {user.StudentName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Batch: {user.StudentSection}
              </Typography>

              {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
              // onClick={handleEditProfile}
              >
                Edit Profile
              </Button> */}
            </Grid>
          </Grid>
        </Paper>
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
    </MainLayout>
  );
};

export default Profile;
