import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

// GET ALL PETS
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.log("PETS ERROR:", error);
    res.status(500).json({ msg: "Error fetching pets" });
  }
});

// GET PET BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });
    res.json(pet);
  } catch (error) {
    console.log("PET BY ID ERROR:", error);
    res.status(500).json({ msg: "Error fetching pet" });
  }
});

export default router;
