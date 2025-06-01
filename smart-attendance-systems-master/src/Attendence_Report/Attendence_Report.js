import React, { useEffect, useState } from "react";
import "./Attendence_Report.css";
import axios from "axios";

const AttendanceReport = () => {
  const [subjectsBySemester, setSubjectsBySemester] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [popupSubjectName, setPopupSubjectName] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://finallyback-4.onrender.com/api/v1/admin/getAllSubjects"
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
          "https://finallyback-4.onrender.com/api/v1/admin/attendance_by_subject"
        );
        setAttendanceData(response.data); // raw student-wise entries
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      }
    };

    fetchSubjects();
    fetchAttendance();
  }, []);

  // Grouped attendance data by subjectId
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
        rfid: record.rfid, // Make sure this is coming from the backend
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
          <div className="subject-row">
            {subjectsBySemester[semester].map((subject, index) => (
              <div className="cell" key={index}>
                {subject.name}
              </div>
            ))}
          </div>
          <div className="subject-row">
            {subjectsBySemester[semester].map((subject, index) => (
              <div
                className="cell clickable"
                key={index}
                onClick={() => handleAttendanceClick(subject.id)}
              >
                {groupedAttendance[subject.id]?.students.length || 0}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Popup Modal */}
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
