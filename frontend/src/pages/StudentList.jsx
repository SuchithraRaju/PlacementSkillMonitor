
import { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchStudents() {
    try {
      setError("");
      const response = await axios.get(
        "http://localhost:5000/api/students"
      );
      setStudents(response.data);
    } catch (err) {
      setError("Unable to load students. Check the backend server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student record?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );
      setStudents((previous) =>
        previous.filter((student) => student._id !== id)
      );
    } catch (err) {
      setError("Could not delete the student.");
    }
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT</p>
          <h1>Student Skill List</h1>
          <p className="subtitle">
            View and manage student placement readiness.
          </p>
        </div>
        <div className="total-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>
      </div>

      {loading ? (
        <p className="status-message">Loading student records...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <h3>No student records yet</h3>
          <p>Add a student using the Add Student Skills page.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Technical Skills</th>
                <th>Aptitude</th>
                <th>Communication</th>
                <th>Readiness</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.technicalSkills}</td>
                  <td>{student.aptitudeScore}/100</td>
                  <td>{student.communicationSkills}</td>
                  <td>
                    <span className="status-pill">
                      {student.placementReadiness}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
