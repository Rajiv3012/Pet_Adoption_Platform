import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    console.log("HASHED PASSWORD:", hashed);

    await User.create({ name, email, password: hashed });

    return res.json({ msg: "Registered successfully" });
  } catch (e) {
    console.log("REGISTER ERROR:", e);
    return res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    console.log("DB PASSWORD:", user.password);
    console.log("COMPARE INPUT PASSWORD:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH RESULT:", isMatch);

    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    console.log("LOGIN ERROR:", e);
    return res.status(500).json({ msg: "Server error" });
  }
});

export default router;
