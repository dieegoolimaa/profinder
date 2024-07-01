const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const router = require("express").Router();

// Sign up route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Password validation
  if (
    password.length < 8 ||
    password.includes(" ") ||
    !password.match(/[a-z]/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[0-9]/g) ||
    !password.match(/[^a-zA-Z\d]/g)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters and contain no spaces, with at least one lowercase letter, one uppercase letter, one number, and one special character.",
    });
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(13);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  try {
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: "Email already exists" });
    } else {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Verify route
router.get("/verify", isAuthenticated, (req, res) => {
  res.json({ message: "Hello", data: req.tokenPayload });
});

module.exports = router;
