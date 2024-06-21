const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  postedDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
