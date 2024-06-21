const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profile: {
    skills: [String],
    experience: String,
    location: String,
    bio: String,
  },
  contact: {
    phone: String,
    linkedin: String,
    website: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
