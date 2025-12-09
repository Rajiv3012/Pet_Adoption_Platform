import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.log("PETS ERROR:", error);
    res.status(500).json({ msg: "Error fetching pets" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });

    res.json(pet);
  } catch (err) {
    console.log("PET DETAIL ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
