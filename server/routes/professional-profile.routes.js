const router = require("express").Router();
const Profile = require("../models/Profile.model");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// Create profile
router.post("/", isAuthenticated, async (req, res) => {
  const {
    name,
    age,
    skills,
    experience,
    location,
    bio,
    phone,
    linkedin,
    website,
  } = req.body;

  try {
    const newProfile = await Profile.create({
      name,
      age,
      profile: {
        skills,
        experience,
        location,
        bio,
      },
      contact: {
        phone,
        linkedin,
        website,
      },
    });
    res.status(200).json(newProfile);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update profile
router.put("/", isAuthenticated, async (req, res) => {
  const {
    name,
    age,
    skills,
    experience,
    location,
    bio,
    phone,
    linkedin,
    website,
  } = req.body;

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        name,
        age,
        profile: {
          skills,
          experience,
          location,
          bio,
        },
        contact: {
          phone,
          linkedin,
          website,
        },
      },
      { new: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete profile
router.delete("/", isAuthenticated, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting profile", error });
  }
});

// Get all profiles
router.get("/all", async (_, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ message: "Error fetching profiles", error });
  }
});

// Get profile by ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error fetching profile", error });
  }
});

module.exports = router;
