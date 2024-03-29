import Registration from "./components/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MonitorBrand from "./components/MonitorBrand";
// import Mentions from "./components/Mentions/Mentions";
import PendingCourses from "./components/Student/Dashboard/Courses/PendingCourses";
import RegisteredCourses from "./components/Student/Dashboard/RegisteredCourses/RegisteredCourses";
import Dashboard from "./components/Student/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound";
// import Report from "./components/Reports/Report";
import ResultCard from "./components/Student/ResultCard/ResultCard";
import ForgotPassword from "./components/ForgotPassword";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Welcome from "./components/Welcome";
import Profile from "./components/Student/Profile/Profile";
import ProfileNew from "./components/Admin/Profile/Profile_New";
import AddCourse from "./components/Admin/AddCourse/AddCourse";
import Results from "./components/Admin/AddResult/Results";
import ListStudents from "./components/Admin/ListStudents/ListStudents";
import BatchAdvisor from "./components/Admin/AddBatchAdvisor/BatchAdvisor";
import UpdateBatchAdvisor from "./components/Admin/AddBatchAdvisor/UpdateBatchAdvisor";
import AddBatchAdvisor from "./components/Admin/AddBatchAdvisor/AddBatchAdvisor";
import Student from "./components/Admin/AddStudent/Student";
import UpdateStudent from "./components/Admin/AddStudent/UpdateStudent";
import UpdateResults from "./components/Admin/AddResult/UpdateResults";
import Users from "./components/Admin/Users/Users";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import UpdateUser from "./components/Admin/Users/UpdateUser";
import DashboardBatchAdvisor from "./components/BatchAdvisor/Profile/ProfileBatchAdvisor";
import StudentsList from "./components/BatchAdvisor/ListStudents/ListStudents";
import StudentRequests from "./components/BatchAdvisor/StudentRequests/StudentRequests";
import ResultStudent from "./components/BatchAdvisor/ListStudents/ResultStudent";
import SchemeOfStudy from "./components/Admin/AddCourse/SchemeOfStudy";
import AddCoursesToStudent from "./components/Admin/AddCourse/AddCoursesToStudent";
import ViewStudentCourses from "./components/Admin/StudentCoursesAdd/ViewStudentCourses";
import RegisterNewCourses from "./components/Student/Dashboard/Courses/RegisterNewCourses";
import ElectiveCourses from "./components/Student/Dashboard/Courses/ElectiveCourses";
import RequestedCourses from "./components/Student/Dashboard/RequestedCourses/RequestedCourses";
import ReviewRequest from "./components/Student/Dashboard/RequestedCourses/ReviewRequest";
function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const loggedInUser = userString ? JSON.parse(userString) : null;
    setUser(loggedInUser);
    // simulate a 2 second loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const isAdmin = user && user.role === "admin";
  const isStudent = user && user.role === "student";
  const isBatchAdvisor = user && user.role === "batch advisor";
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div className="h-screen">
        <Routes>
          {isLoading ? (
            <Route path="*" element={<CircularProgress />} />
          ) : (
            <>
              {/* <Route path="/" element={<Registration />} /> */}
              {isAdmin ? (
                <>
                  <Route path="/admin/profile" element={<ProfileNew />} />
                  {/* admin student routes */}
                  <Route
                    path="/admin/schemeofstudy/studentcourses/add"
                    element={<AddCoursesToStudent />}
                  />
                  {/* <Route path="/admin/studentcourses" element={<ViewStudentCourses/>} /> */}
                  <Route
                    path="/admin/schemeofstudy/add"
                    element={<AddCourse />}
                  />
                  <Route
                    path="/admin/schemeofstudy/courses"
                    element={<AddCourse />}
                  />
                  <Route
                    path="/admin/schemeofstudy"
                    element={<SchemeOfStudy />}
                  />
                  <Route
                    path="/admin/students/update/:studentname/:id"
                    element={<UpdateStudent />}
                  />
                  <Route
                    path="/admin/students/new"
                    element={<UpdateStudent />}
                  />
                  <Route path="/admin/students" element={<Student />} />
                  {/* admin course routes */}
                  <Route path="/admin/addcourse" element={<AddCourse />} />
                  {/* admin batch advisor routes */}
                  <Route
                    path="/admin/batchadvisor/update/:batchadvisorname/:id"
                    element={<UpdateBatchAdvisor />}
                  />
                  <Route
                    path="/admin/batchadvisor/new"
                    element={<AddBatchAdvisor />}
                  />
                  <Route path="admin/batchadvisor" element={<BatchAdvisor />} />
                  {/*admin result routes */}
                  <Route
                    path="/admin/results/update/:StudentRegNo/:ResultID"
                    element={<UpdateResults />}
                  />
                  <Route
                    path="/admin/results/new"
                    element={<UpdateResults />}
                  />
                  <Route path="/admin/results" element={<Results />} />
                  <Route
                    path="/admin/liststudents"
                    element={<ListStudents />}
                  />
                  <Route path="/admin/users" element={<Users />} />
                  <Route
                    path="/admin/users/update/:email/:id"
                    element={<UpdateUser />}
                  />
                  <Route path="/admin/users/new" element={<UpdateUser />} />
                  <Route path="/admin" element={<ProfileNew />} />{" "}
                </>
              ) : (
                <></>
              )}
              {isStudent ? (
                <>
                  <Route
                    path="/requested/get/request"
                    element={<ReviewRequest />}
                  />
                  <Route
                    path="/dashboard/pendingcourses"
                    element={<PendingCourses />}
                  />
                  <Route
                    path="/dashboard/registeredcourses"
                    element={<RegisteredCourses />}
                  />
                  <Route
                    path="/dashboard/registernewcourses"
                    element={<RegisterNewCourses />}
                  />
                  <Route
                    path="/dashboard/electivecourses"
                    element={<ElectiveCourses />}
                  />

                  <Route path="/dashboard/" element={<RegisteredCourses />} />

                  <Route path="/resultcard" element={<ResultCard />} />

                  {/* <Route path="/pendingcourses" element={<PendingCourses />} /> */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/requested/get" element={<RequestedCourses />} />
                  <Route path="/student/profile" element={<Profile />} />
                </>
              ) : (
                <></>
              )}
              {isBatchAdvisor ? (
                <>
                  <Route
                    path="/batchadvisor/dashboard"
                    element={<DashboardBatchAdvisor />}
                  />

                  <Route
                    path="/batchadvisor/studentslist"
                    element={<StudentsList />}
                  />
                  <Route
                    path="/batchadvisor/studentrequests"
                    element={<StudentRequests />}
                  />
                  <Route path="/resultstudent" element={<ResultStudent />} />
                </>
              ) : (
                <></>
              )}
            </>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/monitor" element={<MonitorBrand />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/aboutus" elemsent={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
