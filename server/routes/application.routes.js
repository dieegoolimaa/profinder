const express = require("express");
const router = express.Router();
const Opportunity = require("../models/Opportunity");
const Application = require("../models/Application");
const { isAuthenticated } = require("../middlewares/auth");

// Apply for an opportunity
router.post("/:id/apply", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { coverLetter } = req.body;
  const userId = req.user._id;

  try {
    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    const newApplication = new Application({
      opportunityId: id,
      userId,
      coverLetter,
    });

    await newApplication.save();
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get applications for an opportunity
router.get("/:id/applications", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const applications = await Application.find({ opportunityId: id }).populate(
      "userId",
      "name email"
    );
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get the number of applications for an opportunity
router.get("/:id/application-count", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const applicationCount = await Application.countDocuments({
      opportunityId: id,
    });
    res.status(200).json({ count: applicationCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
