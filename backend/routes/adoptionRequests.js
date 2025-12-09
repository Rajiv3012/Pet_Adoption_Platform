import express from "express";
import mongoose from "mongoose";
import AdoptionRequest from "../models/AdoptionRequest.js";

const router = express.Router();

// Validate MongoDB ObjectId
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/* SUBMIT ADOPTION REQUEST */
router.post("/", async (req, res) => {
  try {
    const { petId, userId, message } = req.body;

    if (!petId || !userId) {
      return res.status(400).json({ msg: "petId and userId are required" });
    }

    if (!isValidObjectId(petId) || !isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid petId or userId" });
    }

    const newReq = await AdoptionRequest.create({
      petId,
      userId,
      message: message || ""
    });

    res.json({ msg: "Adoption request submitted", request: newReq });
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* GET ALL REQUESTS */
router.get("/", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find()
      .populate("petId")
      .populate("userId", "name email");

    res.json(requests);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* APPROVE REQUEST */
router.put("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      return res.status(400).json({ msg: "Invalid request ID" });

    const request = await AdoptionRequest.findById(id);
    if (!request)
      return res.status(404).json({ msg: "Request not found" });

    request.status = "approved";
    await request.save();

    await request.populate([
      { path: "petId" },
      { path: "userId", select: "name email" }
    ]);

    res.json({ msg: "Request approved", request });
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* REJECT REQUEST */
router.put("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      return res.status(400).json({ msg: "Invalid request ID" });

    const request = await AdoptionRequest.findById(id);
    if (!request)
      return res.status(404).json({ msg: "Request not found" });

    request.status = "rejected";
    await request.save();

    await request.populate([
      { path: "petId" },
      { path: "userId", select: "name email" }
    ]);

    res.json({ msg: "Request rejected", request });
  } catch (err) {
    console.error("REJECT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
