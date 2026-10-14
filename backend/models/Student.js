
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    rollNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    technicalSkills: { type: String, required: true },
    aptitudeScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    communicationSkills: { type: String, required: true },
    placementReadiness: {
      type: String,
      enum: ["Ready", "Not Ready", "In Progress"],
      default: "Not Ready",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
