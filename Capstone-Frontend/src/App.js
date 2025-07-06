import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'; 
import 'react-toastify/dist/ReactToastify.css';


import ICMPSignUp from "./Student/Pages/SignUp/SignUp.js";
import StudentDashboard from './Student/Pages/Dashboard/Dashboard.js'
import StudentAccount from './Student/Pages/Profile/Account.js'
import StudentCourseImprovement from './Student/Pages/CourseImprovement/CourseImprovement.js'
import StudentFees from './Student/Pages/Fees/Fees.js'
import StudentStatus from './Student/Pages/Status/Status.js'
import StudentHistory from './Student/Pages/Hsitory/History.js'

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

import { ToastContainer } from "react-toastify";
import { UserProvider } from "./UserContext.js";


import ICMPLogin from "./Login/Login.js";
import ProtectedRouteStudent from "./ProtectedRouteStudent.jsx";
import ProtectedRouteCoordinator from "./ProtectedRouteCoordinator.jsx";
import ProtectedRouteHod from "./ProtectedRouteHod.jsx";
import ProtectedRouteDoaa from "./ProtectedRouteDoaa.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className='App'>
          <Routes>

            <Route path="/login" element={<ICMPLogin />} />

            {/* Student routes */}
            <Route path="/student/signup" element={<ICMPSignUp />} />
            <Route path="/student/dashboard" element={<ProtectedRouteStudent><StudentDashboard /></ProtectedRouteStudent>} />
            <Route path="/student/account" element={<ProtectedRouteStudent><StudentAccount /></ProtectedRouteStudent>} />
            <Route path="/student/course-improvement" element={<StudentCourseImprovement />} />
            <Route path="/student/fees" element={<StudentFees />} />
            <Route path="/student/status" element={<StudentStatus />} />
            <Route path="/student/history" element={<StudentHistory />} />


            {/* Coordinator routes  */}
            <Route path="/coordinator/dashboard" element={<ProtectedRouteCoordinator><CoordinatorDashboard /></ProtectedRouteCoordinator>} />
            <Route path="/coordinator/account" element={<CoordinatorAccount/>} />
            <Route path="/coordinator/academic-information" element={<CoordinatorAcademicInformation />} />
            <Route path="/coordinator/time-table" element={<CoordinatorTimeTable />} />

            {/* HOD routes  */}
            <Route path="/hod/dashboard" element={<ProtectedRouteHod><HODDashboard /></ProtectedRouteHod>} />
            <Route path="/hod/coordinators" element={<HODCoordinators />} />
            <Route path="/hod/account" element={<HODAccount />} />
            
            {/* DOAA routes   */}
            <Route path="/doaa/dashboard" element={<ProtectedRouteDoaa><DOAADashboard /></ProtectedRouteDoaa>} />
            <Route path="/doaa/coordinators" element={<DOAACoordinators />} />
            <Route path="/doaa/clashing-requests" element={<DOAAClashingRequest />} />
            <Route path="/doaa/clashing-stats" element={<DOAAClashingStats />} />
            <Route path="/doaa/account" element={<DOAAAccount />} />

          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
