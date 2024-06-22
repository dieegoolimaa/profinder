const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverLetter: { type: String, required: true },
  appliedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);
