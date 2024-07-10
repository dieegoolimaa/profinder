const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema({
  opportunity: {
    type: Schema.Types.ObjectId,
    ref: "Opportunity",
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming a 'User' model exists for applicants
    required: true,
  },
  pdfFilePath: {
    type: String,
    required: true,
  },
  desiredSalary: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    enum: ["15 days", "30 days", "60 days", "Immediately"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
