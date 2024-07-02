const express = require("express");
const multer = require("multer");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Application = require("../models/Application.model");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify your uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/:opportunityId/apply",
  isAuthenticated,
  upload.single("pdfFile"),
  async (req, res) => {
    try {
      const { desiredSalary, availability } = req.body;
      const pdfFilePath = req.file.path;

      const newApplication = await Application.create({
        userId: req.tokenPayload.id,
        opportunityId: req.params.opportunityId,
        desiredSalary,
        availability,
        pdfFilePath, // Save the file path in the database
      });

      res.status(201).json(newApplication);
    } catch (error) {
      console.error("Error applying to opportunity:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
