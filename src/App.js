import Registration from "./components/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MonitorBrand from "./components/MonitorBrand";
// import Mentions from "./components/Mentions/Mentions";
import PendingCourses from "./components/Student/Dashboard/PendingCourses/PendingCourses";
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
import Profile_New from "./components/Admin/Profile/Profile_New";
import AddStudent from "./components/Admin/AddStudent/AddStudent";
import AddCourse from "./components/Admin/AddCourse/AddCourse";
import AddBatchAdvisor from "./components/Admin/AddBatchAdvisor/AddBatchAdvisor";
function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="monitor" element={<MonitorBrand />} />
          {/* <Route path="mentions" element={<Mentions />} /> */}
          {/* <Route path="comparison" element={<Comparison />} /> */}
          {/* <Route
            path="/dashboard/pendingcourse"
            element={<RegisteredCourses />}
          /> */}
          <Route
            path="/dashboard/registeredcourse"
            element={<RegisteredCourses />}
          />
          {/* <Route
            path="/dashboard/registeredcourse"
            element={<RegisteredCourses />}
          /> */}
          <Route path="/admin/profile" element={<Profile_New />} />
          <Route path="/admin/addstudent" element={<AddStudent />} />
          <Route path="/admin/addcourse" element={<AddCourse />} />
          <Route path="/admin/addbatchadvisor" element={<AddBatchAdvisor />} />
          <Route path="/resultcard" element={<ResultCard />} />
          <Route path="/dashboard/electives" element={<RegisteredCourses />} />
          <Route path="/pendingcourses" element={<PendingCourses />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="report" element={<Report />} /> */}
          <Route path="student/profile" element={<Profile />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
