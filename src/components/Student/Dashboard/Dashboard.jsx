import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, AppBar, Toolbar, Button, makeStyles } from '@material-ui/core';
import { MainLayout } from '../../../layouts/MainLayout';
const useStyles = makeStyles((theme) => ({
  selectedLink: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: "white"
  },
}));
const Dashboard = ({ children }) => {
  const location = useLocation();
  const isLinkSelected = (pathname) => {
    return location.pathname === pathname;
  };

  const classes = useStyles();

  return (
    <MainLayout>
      <div style={{ margin: '1rem' }}>
        <Card variant="outlined" style={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
              Courses
            </Typography>
            <Typography variant="body1">
              You can register your courses here
            </Typography>
          </CardContent>
        </Card>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button
              component={Link}
              to="/dashboard/registeredcourses"
              className={isLinkSelected('/dashboard/registeredcourses') ? classes.selectedLink : ''}
            >
              Registered Courses
            </Button>
            <Button
              component={Link}
              to="/dashboard/registernewcourses"
              className={isLinkSelected('/dashboard/registernewcourses') ? classes.selectedLink : ''}
            >
              Add New Courses
            </Button>
            <Button
              component={Link}
              to="/dashboard/pendingcourses"
              className={isLinkSelected('/dashboard/pendingcourses') ? classes.selectedLink : ''}
            >
              Pending Courses
            </Button>
            <Button
              component={Link}
              to="/dashboard/electivecourses"
              className={isLinkSelected('/dashboard/electivecourses') ? classes.selectedLink : ''}
            >
              Electives
            </Button>
          </Toolbar>
        </AppBar>
        <main>{children}</main>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
