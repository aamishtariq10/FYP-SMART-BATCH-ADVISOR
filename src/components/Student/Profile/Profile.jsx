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

  const [image, setImage] = useState(userAvatar);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Mock user data from a database
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    batch: "FA19",
    section: "C", // Replace with actual image URL
  };

  const handleEditProfile = () => {
    // Add logic for editing profile here
  };

  return (
    <MainLayout>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={3} justify="center" alignItems="center" xs={12}>
            <Grid item xs={12} md={3}>
              <Avatar
                alt="User avatar"
                src={image}
                className={classes.avatar}
              />
              <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <label htmlFor="upload-button">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.button}
                >
                  Upload Picture
                </Button>
              </label>
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
                onClick={handleEditProfile}
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