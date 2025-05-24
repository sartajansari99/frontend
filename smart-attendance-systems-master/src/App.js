import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login_page/Login_page";
import UserDashboard from "./UserDashboard/UserDashboard";
import AdminLogin from "./Admin_Login/Admin_Login"
// import AdminDashbaord from "./Admin_Dashboard/AdminDashboard"

import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <>
    <Dashboard/>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        
        <Route path="/dashboard" element={<UserDashboard/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
