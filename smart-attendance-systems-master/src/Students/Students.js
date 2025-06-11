// App.jsx
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import "./Students.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 9;

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/");
        return;
      }
      console.log(token);

      const data = await fetch(
        "https://finallyback.onrender.com/api/v1/admin/getalluser",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await data.json();

      setStudents(result);
      setFilteredStudents(result);
    };
    fetchStudents();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = students.filter(
      (student) =>
        student.name?.toLowerCase().includes(query.toLowerCase()) ||
        student._id?.toString().includes(query)
    );
    setFilteredStudents(results);
    setCurrentPage(1);
  };

  const handleFilter = (type) => {
    let sorted = [...filteredStudents];
    switch (type) {
      case "batch":
        sorted.sort((a, b) => a.batch - b.batch);
        break;
      case "branch":
        sorted.sort((a, b) => a.branch.localeCompare(b.branch));
        break;
      case "attendance":
        sorted.sort((a, b) => b.attendance - a.attendance);
        break;
      case "sgpa":
        sorted.sort((a, b) => b.sgpa - a.sgpa);
        break;
      default:
        break;
    }
    setFilteredStudents(sorted);
  };

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  return (
    <div className="app-container">
      <FilterSidebar onFilter={handleFilter} />
      <div className="main-section">
        <SearchBar searchQuery={handleSearch} />
        <div className="student-grid">
          {currentStudents.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))}
        </div>
        <Pagination
          totalStudents={filteredStudents.length}
          studentsPerPage={studentsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default App;
