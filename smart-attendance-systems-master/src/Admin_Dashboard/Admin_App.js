import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./AdminDashboard";
import Students from "../Students/Students";
import ManageSubject from "../Manage_Subject/Manage_Subject";
import AttendanceReport from "../Attendence_Report/Attendence_Report";

function Admin_App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<AdminPanel />} />
        <Route path="/students" element={<Students />} />
        <Route path="/manage-subject" element={<ManageSubject />} />
        <Route path="/attendance-report" element={<AttendanceReport />} />
      </Routes>
    </Router>
  );
}

export default Admin_App;