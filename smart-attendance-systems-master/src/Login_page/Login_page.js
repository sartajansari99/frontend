import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login_page.css"; // Using same CSS as registration

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://finallyback-3.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Navigate to dashboard or home
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    
    <div className="container">
      <h2 className="title">Student Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="submit-btn">Login</button>

        <p className="form-footer">
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
