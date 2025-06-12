import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Attendence_Report.css";

const AttendanceReport = () => {
  const navigate = useNavigate();

  const [subjectsBySemester, setSubjectsBySemester] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [popupSubjectName, setPopupSubjectName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (!accessToken) {
      navigate("/");
      return;
    }

    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          "https://finallyback.onrender.com/api/v1/admin/getAllSubjects",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const grouped = data.reduce((acc, subject) => {
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
        const response = await fetch(
          "https://finallyback.onrender.com/api/v1/admin/attendance_by_subject",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAttendanceData(data);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      }
    };

    fetchSubjects();
    fetchAttendance();
  }, [navigate]);

  const getGroupedAttendance = () => {
    const grouped = {};
    for (const record of attendanceData) {
      if (!grouped[record.subjectId]) {
        grouped[record.subjectId] = {
          subjectName: record.subjectName,
          students: [],
        };
      }
      grouped[record.subjectId].students.push({
        fullName: record.fullName,
        rfid: record.rfid,
      });
    }
    return grouped;
  };

  const groupedAttendance = getGroupedAttendance();

  const handleAttendanceClick = (subjectId) => {
    const subjectData = groupedAttendance[subjectId];
    if (subjectData) {
      setPopupSubjectName(subjectData.subjectName);
      setPopupData(subjectData.students);
      setShowPopup(true);
    }
  };

  const semesters = Object.keys(subjectsBySemester).sort();

  return (
    <div className="report-container">
      <h1 className="title">ATTENDANCE REPORT</h1>
      <h2 className="today-title">Today’s Attendance Report</h2>

      {semesters.map((semester) => (
        <div className="semester-section" key={semester}>
          <h3 className="semester-title">Semester {semester}</h3>
          <div className="grid-container">
            {subjectsBySemester[semester].map((subject, index) => (
              <div key={index} className="subject-attendance-pair">
                <div className="cell header-cell">{subject.name}</div>
                <div
                  className="cell clickable"
                  onClick={() => handleAttendanceClick(subject.id)}
                >
                  {groupedAttendance[subject.id]?.students.length || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <h3>{popupSubjectName} - Present Students</h3>
            <ul>
              {popupData.length > 0 ? (
                popupData.map((student, index) => (
                  <li key={index}>
                    <strong>{student.fullName}</strong> – RFID: {student.rfid}
                  </li>
                ))
              ) : (
                <p>No attendance data found.</p>
              )}
            </ul>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
