import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./Admin_Dashboard/AdminDashboard";
import Students from "./Students/Students";
import ManageSubject from "./Manage_Subject/Manage_Subject";
import AttendenceReport from "./Attendence_Report/Attendence_Report";
import AttendenceLog from "./Attendence_Log/Attendence_Log";
import Registration from "./Registration_page/Registration_page";
import LoginSignup from "./Dashboard/Dashboard";
import ClientPage from "./UserDashboard/ClientPage";
import { AuthProvider } from "./Context/AuthContext";
function App() {
  return (
    <Router>
      <Routes>
        <AuthProvider>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/admin/admin_dashboard" element={<AdminPanel />} />
          <Route
            path="/admin/admin_dashboard/students"
            element={<Students />}
          />
          <Route
            path="/admin/admin_dashboard/manage-subject"
            element={<ManageSubject />}
          />
          <Route
            path="/admin/admin_dashboard/attendance-report"
            element={<AttendenceReport />}
          />
          <Route
            path="/admin/admin_dashboard/attendance-log"
            element={<AttendenceLog />}
          />
        </AuthProvider>
        <Route path="/client" element={<ClientPage />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
