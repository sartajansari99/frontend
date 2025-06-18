import React, { useState, useEffect } from "react";
import "./Manage_Subject.css";
import { useNavigate } from "react-router-dom";

const SubjectManager = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    semester: "",
    startTime: "",
    endTime: "",
    day: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchSubjects = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(
      "https://finallyback-1.onrender.com/api/v1/admin/getAllSubjects",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setSubjects(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
      return;
    }
    fetchSubjects();
  }, [navigate]);

  const handleChange = (e) => {
    if (editingId) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    await fetch("https://finallyback-1.onrender.com/api/v1/admin/createSubject", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormData({
      name: "",
      code: "",
      semester: "",
      startTime: "",
      endTime: "",
      day: "",
    });
    fetchSubjects();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (window.confirm("Delete this subject?")) {
      await fetch(
        `https://finallyback-1.onrender.com/api/v1/admin/deleteSubject/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSubjects();
    }
  };

  const handleEditClick = (subject) => {
    setEditingId(subject._id);
    setEditData(subject);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("accessToken");
    await fetch(
      `https://finallyback-1.onrender.com/api/v1/admin/updateSubject/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      }
    );
    setEditingId(null);
    fetchSubjects();
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="container">
      <h2>Subject Manager</h2>

      {/* Add Subject Form */}
      <form onSubmit={handleSubmit} className="subject-form">
        <h3>Add New Subject</h3>
        <input
          type="text"
          name="name"
          placeholder="Subject Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Subject Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          required
        >
          <option value="">Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
        <button type="submit">Add Subject</button>
      </form>

      {/* Subject Table */}
      <div className="subject-table">
        <h3>All Subjects</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Semester</th>
              <th>Start</th>
              <th>End</th>
              <th>Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subj) => (
              <tr key={subj._id}>
                {editingId === subj._id ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="code"
                        value={editData.code}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="semester"
                        value={editData.semester}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        name="startTime"
                        value={editData.startTime}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        name="endTime"
                        value={editData.endTime}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name="day"
                        value={editData.day}
                        onChange={handleChange}
                      >
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{subj.name}</td>
                    <td>{subj.code}</td>
                    <td>{subj.semester}</td>
                    <td>{subj.startTime}</td>
                    <td>{subj.endTime}</td>
                    <td>{subj.day}</td>
                    <td>
                      <button onClick={() => handleEditClick(subj)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(subj._id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectManager;
