import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./UserDashboard/UserDashboard";

// import AdminDashbaord from "./Admin_Dashboard/AdminDashboard"

import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <>
    <Dashboard/>
    <Router>
      <Routes> 
        <Route path="/dashboard" element={<UserDashboard/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
