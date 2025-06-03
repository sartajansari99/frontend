import React, { useEffect, useState } from "react";
import "./Attendence_Log.css";
import axios from "axios";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          "https://finallyback.onrender.com/api/v1/admin/attendance_log"
        );
        setAttendanceData(response.data);
      } catch (err) {
        console.error("Failed to fetch attendance data:", err);
      }
    };
    fetchAttendanceData();
  }, []);

  return (
    <div className="report-container">
      <h1 className="title">Attendance Log</h1>

      {attendanceData.map((entry, index) => (
        <div className="log-row" key={index}>
          <div className="photo-circle">
            <img
              src={entry.avatar}
              alt={entry.fullName}
            />
          </div>
          <div className="log-info">
            <span>Name: {entry.fullName}</span>
            <span>SEMESTER: {entry.semester}</span>
            <span>Subject: {entry.subject}</span>
            <span>Code: {entry.subjectCode}</span>
            <span>Time: {entry.time}</span>
            <span>Day: {entry.day}</span>
            <span>Date: {entry.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceReport;
