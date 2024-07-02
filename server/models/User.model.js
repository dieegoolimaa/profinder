const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
