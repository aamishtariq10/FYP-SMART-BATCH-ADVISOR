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
function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="monitor" element={<MonitorBrand />} />
          {/*admin routes */}
          <Route path="/admin/profile" element={<ProfileNew />} />
          {/* admin student routes */}
          <Route
            path="/admin/students/update/:studentname/:id"
            element={<UpdateStudent />}
          />
          <Route path="/admin/students/new" element={<UpdateStudent />} />
          <Route path="/admin/students" element={<Student />} />
          {/* admin course routes */}
          <Route path="/admin/addcourse" element={<AddCourse />} />
          {/* admin batch advisor routes */}
          <Route
            path="/admin/batchadvisor/update/:batchadvisorname/:id"
            element={<UpdateBatchAdvisor />}
          />
          <Route path="/admin/batchadvisor/new" element={<AddBatchAdvisor />} />
          <Route path="admin/batchadvisor" element={<BatchAdvisor />} />
          {/*admin result routes */}
          <Route
            path="/admin/results/update/:StudentRegNo/:ResultID"
            element={<UpdateResults />}
          />
          <Route path="/admin/results/new" element={<UpdateResults />} />
          <Route path="/admin/results" element={<Results />} />
          

          <Route path="/admin/liststudents" element={<ListStudents />} />
          <Route path="/admin" element={<ProfileNew />} />
          <Route path="/resultcard" element={<ResultCard />} />
          <Route
            path="/dashboard/registeredcourses"
            element={<RegisteredCourses />}
          />
          <Route
            path="/dashboard/pendingcourses"
            element={<PendingCourses />}
          />
          <Route path="/dashboard/Electives" element={<RegisteredCourses />} />
          <Route path="/pendingcourses" element={<PendingCourses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="student/profile" element={<Profile />} />
          <Route path="aboutus" elemsent={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
