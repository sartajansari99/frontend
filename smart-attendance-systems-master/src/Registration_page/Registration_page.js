import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    rfid: "",
    semester: "",
    schooling: "",
    schoolingPer: "",
    intermediate: "",
    intermediatePer: "",
    fatherName: "",
    motherName: "",
    parentEmail: "",
    cgpa: "",
    branch: "",
    batches: "",
    avatar: null,
    coverImage: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await axios.post(
        "https://finallyback-4.onrender.com/api/v1/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Registration successful!");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";

      if (message.includes("Parent email already exists")) {
        setErrors({ parentEmail: "Parent email already exists" });
      } else if (message.includes("Email already exists")) {
        setErrors({ email: "Email already exists" });
      } else if (message.includes("Username already exists")) {
        setErrors({ username: "Username already exists" });
      } else if (message.includes("RFID already exists")) {
        setErrors({ rfid: "RFID already exists" });
      } else {
        setErrors({ general: message });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {errors.general && <p className="error">{errors.general}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {[
            {
              type: "text",
              name: "username",
              placeholder: "Username",
              error: errors.username,
            },
            {
              type: "email",
              name: "email",
              placeholder: "Email",
              error: errors.email,
            },
            { type: "text", name: "fullName", placeholder: "Full Name" },
            { type: "password", name: "password", placeholder: "Password" },
            {
              type: "text",
              name: "rfid",
              placeholder: "RFID",
              error: errors.rfid,
            },
            { type: "number", name: "semester", placeholder: "Semester" },
            { type: "text", name: "schooling", placeholder: "Schooling Name" },
            {
              type: "number",
              name: "schoolingPer",
              placeholder: "Schooling %",
            },
            {
              type: "text",
              name: "intermediate",
              placeholder: "Intermediate Name",
            },
            {
              type: "number",
              name: "intermediatePer",
              placeholder: "Intermediate %",
            },
            { type: "text", name: "fatherName", placeholder: "Father's Name" },
            { type: "text", name: "motherName", placeholder: "Mother's Name" },
            {
              type: "email",
              name: "parentEmail",
              placeholder: "Parent Email",
              error: errors.parentEmail,
            },
            { type: "text", name: "cgpa", placeholder: "CGPA (Optional)" },
            { type: "number", name: "batches", placeholder: "Batch Year" },
          ].map((field) => (
            <div className="form-group" key={field.name}>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.name !== "cgpa"}
                onChange={handleChange}
              />
              {field.error && <p className="error">{field.error}</p>}
            </div>
          ))}

          <div className="form-group">
            <select name="branch" required onChange={handleChange}>
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="CIVIL">CIVIL</option>
              <option value="EE">EE</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Upload Cover Image (optional)</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
