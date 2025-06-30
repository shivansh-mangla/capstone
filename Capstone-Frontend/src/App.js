import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'; 
import 'react-toastify/dist/ReactToastify.css';

import StudentDashboard from './Student/Pages/Dashboard/Dashboard.js'
import StudentAccount from './Student/Pages/Profile/Account.js'
import StudentCourseImprovement from './Student/Pages/CourseImprovement/CourseImprovement.js'
import StudentFees from './Student/Pages/Fees/Fees.js'
import StudentStatus from './Student/Pages/Status/Status.js'

import CoordinatorDashboard from './Coordinator/Pages/Dashboard/Dashboard.js'
import CoordinatorAccount from './Coordinator/Pages/Account/Account.js'
import CoordinatorAcademicInformation from './Coordinator/Pages/AcademicInformation/AcademicInformation.js'
import CoordinatorTimeTable from './Coordinator/Pages/TimeTable/TimeTable.js'

import HODDashboard from './HOD/Pages/Dashboard/Dashboard.js'
import HODCoordinators from './HOD/Pages/Coordinators/Coordinators.js'
import HODAccount from './HOD/Pages/Accounts/Accounts.js'

import DOAADashboard from './DOAA/Pages/Dashboard/Dashboard.js'
import DOAACoordinators from './DOAA/Pages/Coordinators/Coordinators.js'
import DOAAClashingRequest from './DOAA/Pages/ClashingRequests/ClashingRequests.js'
import DOAAClashingStats from './DOAA/Pages/ClashingStats/ClashingStats.js'
import DOAAAccount from './DOAA/Pages/Account/Account.js'
import ICMPLogin from "./Student/Pages/Login/Login.js";
import ICMPSignUp from "./Student/Pages/SignUp/SignUp.js";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Student routes */}
          <Route path="/student/signup" element={<ICMPSignUp />} />
          <Route path="/student/login" element={<ICMPLogin />} />
          <Route path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/account" element={<ProtectedRoute><StudentAccount /></ProtectedRoute>} />
          <Route path="/student/course-improvement" element={<StudentCourseImprovement />} />
          <Route path="/student/fees" element={<StudentFees />} />
          <Route path="/student/status" element={<StudentStatus />} />


          {/* Coordinator routes  */}
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
          <Route path="/coordinator/account" element={<CoordinatorAccount/>} />
          <Route path="/coordinator/academic-information" element={<CoordinatorAcademicInformation />} />
          <Route path="/coordinator/time-table" element={<CoordinatorTimeTable />} />

          {/* HOD routes  */}
          <Route path="/hod/dashboard" element={<HODDashboard />} />
          <Route path="/hod/coordinators" element={<HODCoordinators />} />
          <Route path="/hod/account" element={<HODAccount />} />
          
          {/* DOAA routes   */}
          <Route path="/doaa/dashboard" element={<DOAADashboard />} />
          <Route path="/doaa/coordinators" element={<DOAACoordinators />} />
          <Route path="/doaa/clashing-requests" element={<DOAAClashingRequest />} />
          <Route path="/doaa/clashing-stats" element={<DOAAClashingStats />} />
          <Route path="/doaa/account" element={<DOAAAccount />} />

        </Routes>
        <ToastContainer />
      </div>
    </Router>

  );
}

export default App;
