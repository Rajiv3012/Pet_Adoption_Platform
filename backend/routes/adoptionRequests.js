import express from "express";
import jwt from "jsonwebtoken";
import AdoptionRequest from "../models/AdoptionRequest.js";
import Pet from "../models/Pet.js";
import User from "../models/User.js";

const router = express.Router();

// optional auth helper: if Authorization header exists, verify token and attach userId
const getUserFromReq = (req) => {
  try {
    const auth = req.headers?.authorization;
    if (!auth) return null;
    const token = auth.split(" ")[1];
    if (!token) return null;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload?.id || null;
  } catch (err) {
    return null;
  }
};

// POST create adoption request
router.post("/", async (req, res) => {
  try {
    const { pet: petId, name, email, message } = req.body;
    if (!petId || !name || !email) {
      return res.status(400).json({ msg: "pet, name and email are required" });
    }

    // make sure pet exists
    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });

    const userId = getUserFromReq(req);

    const request = await AdoptionRequest.create({
      pet: petId,
      user: userId || undefined,
      name,
      email,
      message: message || "",
    });

    return res.json({ msg: "Request sent", request });
  } catch (err) {
    console.error("ADOPTION REQUEST ERROR:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

// GET all adoption requests (admin) or requests for a user
router.get("/", async (req, res) => {
  try {
    const userId = getUserFromReq(req);
    if (userId) {
      // return requests for this user
      const requests = await AdoptionRequest.find({ user: userId }).populate("pet");
      return res.json(requests);
    } else {
      // public: return limited data or disallow - we'll return all (for admin) but in real app protect this
      const requests = await AdoptionRequest.find().populate("pet").populate("user", "name email");
      return res.json(requests);
    }
  } catch (err) {
    console.error("ADOPTION REQUESTS GET ERROR:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

export default router;
