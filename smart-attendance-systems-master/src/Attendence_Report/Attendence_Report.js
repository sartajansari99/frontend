import React, { useEffect, useState } from "react";
import "./Attendence_Report.css";
import axios from "axios";

const AttendanceReport = () => {
  const [subjectsBySemester, setSubjectsBySemester] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://finallyback-3.onrender.com/api/userSubject/getallSubject"
        );
        const grouped = response.data.reduce((acc, subject) => {
          if (!acc[subject.semester]) acc[subject.semester] = [];
          acc[subject.semester].push({ name: subject.name, id: subject._id });
          return acc;
        }, {});
        setSubjectsBySemester(grouped);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      }
    };

    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          "https://finallyback-4.onrender.com/api/v1/admin/getAllSubjects"
        );
        setAttendanceData(response.data);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      }
    };

    fetchSubjects();
    fetchAttendance();
  }, []);

  const getAttendanceForSubject = (subjectId) => {
    const record = attendanceData.find((item) => item.subjectId === subjectId);
    return record ? record.totalAttendance : 0;
  };

  const semesters = Object.keys(subjectsBySemester).sort();

  return (
    <div className="report-container">
      <h1 className="title">ATTENDENCE REPORT</h1>

      <div className="top-makers">
        {[1, 2, 3].map((i) => (
          <div className="maker-card" key={i}>
            <div className="photo-circle">PHOTO</div>
            <div className="student-info">
              <p>NAME–SARTAJ ANSARI</p>
              <p>BRANCH–CSE</p>
              <p>SEMESTER–1</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="today-title">Todays Attendance Report</h2>

      {semesters.map((semester) => (
        <div className="semester-section" key={semester}>
          <h3 className="semester-title">semester {semester}</h3>
          <div className="subject-row">
            {subjectsBySemester[semester].map((subject, index) => (
              <div className="cell" key={index}>
                {subject.name}
              </div>
            ))}
          </div>
          <div className="subject-row">
            <div className="cell">Total</div>
            {subjectsBySemester[semester].map((subject, index) => (
              <div className="cell" key={index}>
                {getAttendanceForSubject(subject.id)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceReport;
