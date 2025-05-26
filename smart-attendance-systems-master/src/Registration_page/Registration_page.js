import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await axios.post("https://finallyback-4.onrender.com/api/v1/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Registration successful!");
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Try again!";
      toast.error(message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Register</h2>
      <ToastContainer position="top-center" autoClose={3000} />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
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
