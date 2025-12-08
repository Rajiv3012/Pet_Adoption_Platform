import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(400).json({ msg: "Invalid admin credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(400).json({ msg: "Invalid admin credentials" });

    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });

  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
