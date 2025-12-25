import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ msg: "Please enter a valid email address" });

    if (password.length < 6)
      return res.status(400).json({ msg: "Password must be at least 6 characters long" });

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user account
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 DEBUG LINE — SHOW EXACT DATA FROM FRONTEND
    console.log("LOGIN REQ BODY:", req.body);

    if (!email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ msg: "Please enter a valid email address" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GOOGLE OAUTH LOGIN
router.post("/google", async (req, res) => {
  try {
    const { userInfo } = req.body;

    console.log("GOOGLE LOGIN REQ BODY:", req.body);

    if (!userInfo || !userInfo.email) {
      return res.status(400).json({ msg: "Invalid Google authentication data" });
    }

    // Check if user exists
    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      // Create new user from Google data
      user = await User.create({
        name: userInfo.name || userInfo.email.split('@')[0],
        email: userInfo.email,
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random password for Google users
        googleId: userInfo.sub,
        profilePicture: userInfo.picture
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = userInfo.sub;
      user.profilePicture = userInfo.picture || user.profilePicture;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ msg: "Server error during Google authentication" });
  }
});

export default router;
