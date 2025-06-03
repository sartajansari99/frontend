import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import "./Students.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 9;

  // 🛡️ Auth fetch with refresh logic
  const fetchWithAuth = async (input, options = {}) => {
    const accessToken = localStorage.getItem("accessToken");

    const defaultHeaders = {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    };

    let res = await fetch(input, {
      ...options,
      headers: defaultHeaders,
      credentials: "include", // to send cookies
    });

    if (res.status === 401) {
      // Try to refresh token
      const refreshRes = await fetch(
        "https://finallyback.onrender.com/api/v1/admin/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        console.log(data);
        
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Retry original request
        const retryRes = await fetch(input, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        return retryRes;
      } else {
        window.location.href = "/login";
        throw new Error("Unauthorized");
      }
    }

    return res;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await fetchWithAuth(
          "https://finallyback.onrender.com/api/v1/admin/getalluser",
          { method: "GET" }
        );

        const result = await data.json();
        setStudents(result);
        setFilteredStudents(result);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
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
