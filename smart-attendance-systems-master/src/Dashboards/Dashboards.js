import React, { useState, useMemo } from "react";
import "./Dashboards.css";
import {
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const studentData = [
  {
    id: 1,
    name: "ABHINAV ANAND",
    sgpa: 6.8,
    total: 399,
    result: "PASSED",
    branch: "CSE",
    year: "3rd",
    semester: "5",
    attendance: 78,
    promoted: "Yes",
  },
  {
    id: 2,
    name: "ABHISHEK KASHYAP",
    sgpa: 7.3,
    total: 422,
    result: "PASSED",
    branch: "ECE",
    year: "2nd",
    semester: "4",
    attendance: 85,
    promoted: "Yes",
  },
  {
    id: 3,
    name: "ANKIT KUMAR",
    sgpa: 4.5,
    total: 313,
    result: "PROMOTED",
    branch: "Civil",
    year: "1st",
    semester: "2",
    attendance: 65,
    promoted: "No",
  },
  {
    id: 4,
    name: "ADARSH TIWARI",
    sgpa: 6.8,
    total: 396,
    result: "PASSED",
    branch: "Mechanical",
    year: "4th",
    semester: "7",
    attendance: 72,
    promoted: "Yes",
  },
  {
    id: 5,
    name: "AKASH MAHATO",
    sgpa: 6.75,
    total: 391,
    result: "PASSED",
    branch: "Electrical",
    year: "3rd",
    semester: "6",
    attendance: 80,
    promoted: "Yes",
  },
  {
    id: 15,
    name: "ROHIT SHARMA",
    sgpa: 4.2,
    total: 295,
    result: "FAILED",
    branch: "Mechanical",
    year: "1st",
    semester: "1",
    attendance: 55,
    promoted: "No",
  },
  {
    id: 16,
    name: "PRIYA SINGH",
    sgpa: 8.9,
    total: 534,
    result: "PASSED",
    branch: "CSE",
    year: "4th",
    semester: "8",
    attendance: 95,
    promoted: "Yes",
  },
];

const Components = () => {
  const [filters, setFilters] = useState({
    branch: "all",
    year: "all",
    semester: "all",
    resultStatus: "all",
    promotionStatus: "all",
  });

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const filteredData = useMemo(() => {
    return studentData.filter((s) => {
      if (filters.branch !== "all" && s.branch !== filters.branch) return false;
      if (filters.year !== "all" && s.year !== filters.year) return false;
      if (filters.semester !== "all" && s.semester !== filters.semester)
        return false;
      if (filters.resultStatus !== "all" && s.result !== filters.resultStatus)
        return false;
      if (filters.promotionStatus === "promoted" && s.promoted !== "Yes")
        return false;
      if (filters.promotionStatus === "not-promoted" && s.promoted === "Yes")
        return false;
      return true;
    });
  }, [filters]);

  const sgpaRanges = [
    {
      range: "8.0-10.0",
      count: filteredData.filter((s) => s.sgpa >= 8.0).length,
    },
    {
      range: "7.0-7.9",
      count: filteredData.filter((s) => s.sgpa >= 7.0 && s.sgpa < 8.0).length,
    },
    {
      range: "6.0-6.9",
      count: filteredData.filter((s) => s.sgpa >= 6.0 && s.sgpa < 7.0).length,
    },
    {
      range: "5.0-5.9",
      count: filteredData.filter((s) => s.sgpa >= 5.0 && s.sgpa < 6.0).length,
    },
    {
      range: "Below 5.0",
      count: filteredData.filter((s) => s.sgpa < 5.0).length,
    },
  ];

  const resultData = [
    {
      name: "Passed",
      value: filteredData.filter((s) => s.result === "PASSED").length,
      color: "#10B981",
    },
    {
      name: "Promoted",
      value: filteredData.filter((s) => s.result === "PROMOTED").length,
      color: "#F59E0B",
    },
    {
      name: "Failed",
      value: filteredData.filter((s) => s.result === "FAILED").length,
      color: "#EF4444",
    },
  ];

  const branchData = ["CSE", "ECE", "Civil", "Mechanical", "Electrical"].map(
    (branch) => ({
      branch,
      avgSGPA:
        filteredData
          .filter((s) => s.branch === branch)
          .reduce((sum, s) => sum + s.sgpa, 0) /
        (filteredData.filter((s) => s.branch === branch).length || 1),
      students: filteredData.filter((s) => s.branch === branch).length,
    })
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <GraduationCap className="icon" />
        <h1>Academic Trend Analyzer</h1>
      </header>

      <section className="filters">
        {["branch", "year", "semester", "resultStatus", "promotionStatus"].map(
          (type) => (
            <select
              key={type}
              onChange={(e) => handleFilterChange(type, e.target.value)}
            >
              <option value="all">All {type}</option>
              {[...new Set(studentData.map((s) => s[type]))].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )
        )}
      </section>

      <section className="cards">
        <div className="card">
          <Users className="icon" />
          <h2>Total Students</h2>
          <p>{filteredData.length}</p>
        </div>
        <div className="card">
          <TrendingUp className="icon" />
          <h2>Avg SGPA</h2>
          <p>
            {(
              filteredData.reduce((s, d) => s + d.sgpa, 0) /
              (filteredData.length || 1)
            ).toFixed(2)}
          </p>
        </div>
        <div className="card">
          <Award className="icon" />
          <h2>Promoted</h2>
          <p>{filteredData.filter((s) => s.promoted === "Yes").length}</p>
        </div>
      </section>

      <section className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sgpaRanges}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={resultData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {resultData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Semester</th>
              <th>SGPA</th>
              <th>Attendance</th>
              <th>Total</th>
              <th>Result</th>
              <th>Promoted</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.branch}</td>
                <td>{s.year}</td>
                <td>{s.semester}</td>
                <td>{s.sgpa}</td>
                <td>{s.attendance}%</td>
                <td>{s.total}</td>
                <td>{s.result}</td>
                <td>{s.promoted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer>
        <p>Academic Trend Analyzer - Built with React & Recharts</p>
      </footer>
    </div>
  );
};

export default Components;
