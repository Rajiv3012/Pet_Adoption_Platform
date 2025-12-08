import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

// CREATE DEFAULT ADMIN (RUN ONLY ONCE)
router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const exists = await Admin.findOne({ username });
    if (exists)
      return res.status(400).json({ msg: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await Admin.create({ username, password: hashed });

    res.json({ msg: "Admin account created successfully" });
  } catch (err) {
    console.error("SETUP ADMIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
