import React, { useState } from "react";
import axios from "axios";

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

    // Clear the error for the current field as user starts typing
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

      // Map specific errors to fields
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
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Register</h2>
      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="rfid"
          placeholder="RFID"
          required
          onChange={handleChange}
        />
        {errors.rfid && <p style={{ color: "red" }}>{errors.rfid}</p>}

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="schooling"
          placeholder="Schooling Name"
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="schoolingPer"
          placeholder="Schooling %"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="intermediate"
          placeholder="Intermediate Name"
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="intermediatePer"
          placeholder="Intermediate %"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="motherName"
          placeholder="Mother's Name"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="parentEmail"
          placeholder="Parent Email"
          required
          onChange={handleChange}
        />
        {errors.parentEmail && (
          <p style={{ color: "red" }}>{errors.parentEmail}</p>
        )}

        <input
          type="text"
          name="cgpa"
          placeholder="CGPA (Optional)"
          onChange={handleChange}
        />

        <select name="branch" required onChange={handleChange}>
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CIVIL">CIVIL</option>
          <option value="EE">EE</option>
        </select>

        <input
          type="number"
          name="batches"
          placeholder="Batch Year"
          required
          onChange={handleChange}
        />

        <label>Upload Avatar</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          required
          onChange={handleChange}
        />

        <label>Upload Cover Image (optional)</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
