const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Opportunity = require("../models/Opportunity.model");
const Application = require("../models/Application.model");

// Get all opportunities
router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get applications for a specific opportunity
router.get(
  "/:opportunityId/applications",
  isAuthenticated,
  async (req, res) => {
    try {
      const applications = await Application.find({
        opportunityId: req.params.opportunityId,
      });
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get an opportunity by ID
router.get("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(400).json({ message: "Error fetching opportunity", error });
  }
});

// Update an opportunity by ID
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(updatedOpportunity);
  } catch (error) {
    res.status(400).json({ message: "Error updating opportunity", error });
  }
});

// Delete an opportunity by ID
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const deletedOpportunity = await Opportunity.findByIdAndDelete(
      req.params.id
    );
    if (!deletedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting opportunity", error });
  }
});

module.exports = router;
