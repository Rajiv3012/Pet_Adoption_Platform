import express from "express";
import jwt from "jsonwebtoken";
import AdoptionRequest from "../models/AdoptionRequest.js";
import Pet from "../models/Pet.js";

const router = express.Router();

// Middleware to require login
const requireAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ msg: "Not authorized" });

    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Invalid token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// CREATE adoption request (requires login)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { petId, message } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });

    const request = await AdoptionRequest.create({
      pet: petId,
      user: req.userId,
      message,
    });

    res.json({ msg: "Adoption request submitted", request });
  } catch (err) {
    console.log("ADOPTION ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET user requests
router.get("/my-requests", requireAuth, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ user: req.userId }).populate("pet");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
