const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Application = require("../models/Application.model");

// Apply to an opportunity
router.post("/:opportunityId/apply", isAuthenticated, async (req, res) => {
  try {
    const newApplication = await Application.create({
      userId: req.tokenPayload.id,
      opportunityId: req.params.opportunityId,
      ...req.body, // Add other fields as needed
    });
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error applying to opportunity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
