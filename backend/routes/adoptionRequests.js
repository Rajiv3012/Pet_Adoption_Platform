import express from "express";
import AdoptionRequest from "../models/AdoptionRequest.js";

const router = express.Router();

// SUBMIT REQUEST
router.post("/", async (req, res) => {
  try {
    const { petId, userId, message } = req.body;

    if (!petId || !userId)
      return res.status(400).json({ msg: "Missing required fields" });

    await AdoptionRequest.create({
      petId,
      userId,
      message
    });

    res.json({ msg: "Adoption request submitted" });
  } catch (err) {
    console.error("ADOPTION REQUEST ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADMIN GET ALL REQUESTS
router.get("/", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find()
      .populate("petId")
      .populate("userId", "name email");

    res.json(requests);
  } catch (err) {
    console.error("FETCH REQUESTS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
