import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET);

    res.json({
      msg: "Admin login successful",
      token,
      admin: { id: admin._id, username: admin.username, role: "admin" }
    });
  } catch (err) {
    console.log("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
