import React, { useState, useEffect } from "react";
import api from "../api";

const AttendanceMark = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [subject, setSubject] = useState(user.subjects[0] || "");
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch students (only students)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/users/all-students");
        setStudents(res.data);
        setAttendanceRecords(res.data.map((s) => ({ studentId: s._id, status: "present" })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleStatusChange = (studentId, status) => {
    setAttendanceRecords((prev) =>
      prev.map((rec) =>
        rec.studentId === studentId ? { ...rec, status } : rec
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject) return alert("Select subject");
    try {
      await api.post("/attendance/mark", { subject, attendanceRecords });
      setMessage("Attendance marked successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error marking attendance");
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      {message && <p>{message}</p>}

      <label>
        Subject:{" "}
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {user.subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </label>

      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="5" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ _id, name }) => {
              const rec = attendanceRecords.find((r) => r.studentId === _id);
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>
                    <select
                      value={rec?.status || "present"}
                      onChange={(e) => handleStatusChange(_id, e.target.value)}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="submit" style={{ marginTop: 10 }}>Submit Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceMark;
