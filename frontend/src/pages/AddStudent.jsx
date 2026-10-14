
import { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    department: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationSkills: "",
    placementReadiness: "Not Ready",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setStudent((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students",
        {
          ...student,
          aptitudeScore: Number(student.aptitudeScore),
        }
      );

      setMessage("Student details saved successfully!");

      console.log("Saved student:", response.data);

      setStudent({
        rollNo: "",
        name: "",
        department: "",
        technicalSkills: "",
        aptitudeScore: "",
        communicationSkills: "",
        placementReadiness: "Not Ready",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to save student. Check whether the backend is running."
      );
    }
  }

  return (
    <div>
      <h2>Add Student Skills</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Roll Number:</label>
        <input
          name="rollNo"
          value={student.rollNo}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Student Name:</label>
        <input
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Department:</label>
        <input
          name="department"
          value={student.department}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Technical Skills:</label>
        <input
          name="technicalSkills"
          placeholder="Java, React, SQL"
          value={student.technicalSkills}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Aptitude Score (0–100):</label>
        <input
          type="number"
          name="aptitudeScore"
          min="0"
          max="100"
          value={student.aptitudeScore}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Communication Skills:</label>
        <select
          name="communicationSkills"
          value={student.communicationSkills}
          onChange={handleChange}
          required
        >
          <option value="">Select Level</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Needs Improvement">Needs Improvement</option>
        </select>
        <br /><br />

        <label>Placement Readiness:</label>
        <select
          name="placementReadiness"
          value={student.placementReadiness}
          onChange={handleChange}
        >
          <option value="Ready">Ready</option>
          <option value="Not Ready">Not Ready</option>
          <option value="In Progress">In Progress</option>
        </select>
        <br /><br />

        <button type="submit">Submit Assessment</button>
      </form>
    </div>
  );
}

export default AddStudent;
