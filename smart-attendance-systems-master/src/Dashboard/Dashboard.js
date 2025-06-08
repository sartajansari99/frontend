import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function LoginSignup() {
  const [role, setRole] = useState("Client");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminCode: "",
  });
  const setAccessToken = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        role === "Admin"
          ? "https://finallyback.onrender.com/api/v1/admin/login"
          : "https://finallyback.onrender.com/api/v1/users/login";

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);

        setSuccess(data.message);
        console.log(data.message);
        
        setAccessToken(data.accessToken);
        navigate(role === "Admin" ? "/admin/admin_dashboard" : "client");
        console.log("User role:", data.user?.role);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <h2>Chaibasa Engineering College</h2>
      </header>

      <div className="main-container">
        <div className="left-section">
          <h1>
            Smart Attendence Tracking System <br />{" "}
            <span>for your business</span>
          </h1>
          <p>
            Welcome to our smart Attendence tracking system. Easily manage
            clients and admins from one place.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="right-section">
            <div className="login-box">
              {loading ? (
                <div className="loader-container">
                  <div className="spinner"></div>
                  <p>Signing in...</p>
                </div>
              ) : (
                <>
                  <div className="role-selection-radio">
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="Client"
                        checked={role === "Client"}
                        onChange={() => setRole("Client")}
                      />{" "}
                      Client
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="Admin"
                        checked={role === "Admin"}
                        onChange={() => setRole("Admin")}
                      />{" "}
                      Admin
                    </label>
                  </div>

                  <h2>{role} Login</h2>

                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />

                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />

                  {role === "Admin" && (
                    <>
                      <label>Admin Code</label>
                      <input
                        type="text"
                        name="adminCode"
                        placeholder="Enter admin code"
                        onChange={handleChange}
                      />
                    </>
                  )}

                  <div className="remember-section">
                    <input type="checkbox" /> <span>Remember me</span>
                  </div>

                  {error && <p className="error">{error}</p>}
                  {success && <p className="success">{success}</p>}

                  <button className="signin-button">Sign in</button>

                  <p className="forgot">Forgot password?</p>
                  <p className="register">
                    Don’t have an account? <a href="/register">Register here</a>
                  </p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginSignup;
