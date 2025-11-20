import React, { useEffect, useState } from "react";
import api from "../api";

const AttendanceView = () => {
  const [attendanceSummary, setAttendanceSummary] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await api.get("/attendance/summary");
      setAttendanceSummary(res.data);
    };
    fetchAttendance();
  }, []);

  if (attendanceSummary.length === 0) return <p>No attendance records found.</p>;

  return (
    <div>
      <h2>Attendance Summary</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Present</th>
            <th>Attendance %</th>
            <th>Alert</th>
          </tr>
        </thead>
        <tbody>
          {attendanceSummary.map(({ subject, totalClasses, present, attendancePercent, alert }) => (
            <tr key={subject} style={{ color: alert ? "red" : "black" }}>
              <td>{subject}</td>
              <td>{totalClasses}</td>
              <td>{present}</td>
              <td>{attendancePercent}%</td>
              <td>{alert ? "Low Attendance" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceView;
