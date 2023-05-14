import React, { useState } from "react";
import { useEffect } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import userAvatar from "./pic.png"; // Import the image

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
  const em = JSON.parse(localStorage.getItem("user"));

  const [image, setImage] = useState(userAvatar);
  const [image_pic, setFile] = useState(null);

  // Mock user data from a database
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    batch: "FA19",
    section: "C", // Replace with actual image URL
  };

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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image_pic", image_pic);
    formData.append("email", em.email);
    formData.append("role", em.role);

    const response = await fetch("/users/upload/profile", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully!");
    } else {
      console.error("Failed to upload file.");
    }
  };

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
                src={image}
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
              {/* <input
                type="file"
                id="upload-button"
                name="file"
                // style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <label htmlFor="upload-button">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={handleSubmit}
                  className={classes.button}
                >
                  Upload Picture
                </Button>
              </label> */}
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom>
                Basic Information
              </Typography>
              <Typography variant="h6" gutterBottom>
                Name: {user.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Batch: {user.batch}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Section: {user.section}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                // onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default Profile;
