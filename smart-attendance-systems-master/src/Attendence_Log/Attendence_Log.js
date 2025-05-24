import React, { useEffect, useState } from 'react';
import './Attendence_Log.css';
import axios from 'axios';

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('https://finallyback-3.onrender.com/api/userAttendance_log/attendance_log');
        setAttendanceData(response.data);
      } catch (err) {
        console.error('Failed to fetch attendance data:', err);
      }
    };
    fetchAttendanceData();
  }, []);

  return (
    <div className="report-container">
      <h1 className="title">Attendance Log</h1>

      {attendanceData.map((entry, index) => (
        <div className="log-row" key={index}>
          <div className="photo-circle"><img src={`https://finallyback-3.onrender.com/${entry.photo}`}alt='sartaj'/></div>
          <div className="log-info">
            <span>{entry.name}</span>
            <span>SEMESTER {entry.semester}</span>
            <span>{entry.subject}</span>
            <span>{entry.subjectCode}</span>
            <span>{entry.time}</span>
            <span>{entry.day}</span>
            <span>{entry.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceReport;
