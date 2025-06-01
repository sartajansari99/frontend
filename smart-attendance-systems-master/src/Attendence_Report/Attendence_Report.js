import React, { useEffect, useState } from "react";
import "./Attendence_Report.css";
import axios from "axios";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

const AttendanceReport = () => {
  const [subjectsBySemester, setSubjectsBySemester] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

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

  const handleTotalClick = async (subjectId) => {
    try {
      const response = await axios.get(
        `https://finallyback-4.onrender.com/api/v1/admin/attendance_by_subject/${subjectId}`
      );
      setStudents(response.data.students || []);
      setSelectedSubject(subjectId);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const semesters = Object.keys(subjectsBySemester).sort();

  return (
    <div className="report-container">
      <h1 className="title">ATTENDENCE REPORT</h1>

      <h2 className="today-title">Today's Attendance Report</h2>

      {semesters.map((semester) => (
        <div className="semester-section" key={semester}>
          <h3 className="semester-title">Semester {semester}</h3>
          <div className="subject-row">
            {subjectsBySemester[semester].map((subject, index) => (
              <div className="cell" key={index}>{subject.name}</div>
            ))}
          </div>
          <div className="subject-row">
            {subjectsBySemester[semester].map((subject, index) => (
              <div
                className="cell clickable"
                key={index}
                onClick={() => handleTotalClick(subject.id)}
              >
                {getAttendanceForSubject(subject.id)}
              </div>
            ))}
          </div>
        </div>
      ))}

      {showModal && (
        <Modal
          title="Present Students"
          onClose={() => setShowModal(false)}
        >
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <ul>
              {students.map((student, i) => (
                <li key={i}>{student.fullName}</li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AttendanceReport;
