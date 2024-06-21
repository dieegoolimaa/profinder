const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Profile = require("../models/Profile.model");

const router = require("express").Router();

// Create profile
router.post("/profile", isAuthenticated, async (req, res) => {
  // Check if profile already exists
  const profile = await Profile.findOne({ user: user });
  if (profile) {
    return res.status(400).json("Profile already exists");
  }

  try {
    const newProfile = await Profile.create({
      user: user,
      name: req.body.name,
      age: req.body.age,
      profile: {
        skills: req.body.skills,
        experience: req.body.experience,
        location: req.body.location,
        bio: req.body.bio,
      },
      contact: {
        phone: req.body.phone,
        linkedin: req.body.linkedin,
        website: req.body.website,
      },
    });
    res.status(200).json(newProfile);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get profile
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: user });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update profile
router.put("/profile", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: user },
      {
        name: req.body.name,
        age: req.body.age,
        profile: {
          skills: req.body.skills,
          experience: req.body.experience,
          location: req.body.location,
          bio: req.body.bio,
        },
        contact: {
          phone: req.body.phone,
          linkedin: req.body.linkedin,
          website: req.body.website,
        },
      },
      { new: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
