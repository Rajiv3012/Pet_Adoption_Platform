import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ 
      msg: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

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
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error during login" });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Google OAuth login
export const googleLogin = async (req, res) => {
  try {
    const { userInfo } = req.body;

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
        role: "user",
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
};