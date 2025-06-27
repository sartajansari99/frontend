import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { useEffect } from "react";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect if no access token
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/");
      return;
    }
  });
  return (
    <div className="admin-container">
      <h1 className="admin-title">ADMIN PANEL</h1>
      <div className="button-grid">
        <button onClick={() => navigate("/admin/admin_dashboard/students")}>
          STUDENTS
        </button>
        <button
          onClick={() => navigate("/admin/admin_dashboard/manage-subject")}
        >
          MANAGE SUBJECT
        </button>
        <button
          onClick={() => navigate("/admin/admin_dashboard/attendance-report")}
        >
          ATTENDANCE REPORT
        </button>
        <button
          onClick={() => navigate("/admin/admin_dashboard/attendance-log")}
        >
          ATTENDANCE LOG
        </button>
        <button onClick={() => navigate("/dashboards")}>
          STUDENTS Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
