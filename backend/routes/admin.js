// routes/admin.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Pet from "../models/Pet.js";
import AdoptionRequest from "../models/AdoptionRequest.js";

const router = express.Router();

/* ----------------------
   ADMIN LOGIN
---------------------- */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: "admin"
      }
    });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ----------------------
   ADMIN STATS ROUTE
---------------------- */
router.get("/stats", async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments();
    const pending = await AdoptionRequest.countDocuments({ status: "pending" });
    const approved = await AdoptionRequest.countDocuments({ status: "approved" });
    const rejected = await AdoptionRequest.countDocuments({ status: "rejected" });

    res.json({
      totalPets,
      pending,
      approved,
      rejected
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
