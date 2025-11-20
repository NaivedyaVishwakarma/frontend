import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} ({user.role})</p>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          {user.role === "student" && (
            <li><Link to="/attendance/view">View Attendance</Link></li>
          )}
          {user.role === "faculty" && (
            <li><Link to="/attendance/mark">Mark Attendance</Link></li>
          )}
          <li><Link to="/about">About Us</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
