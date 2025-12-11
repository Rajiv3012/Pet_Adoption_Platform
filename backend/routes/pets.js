import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

// GET ALL PETS
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    console.error("GET PETS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET PET BY ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });
    res.json(pet);
  } catch (err) {
    console.error("GET PET ID ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD NEW PET (ADMIN)
router.post("/", async (req, res) => {
  try {
    const { name, type, age, image, description } = req.body;

    if (!name || !type || !age || !image) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const newPet = await Pet.create({
      name,
      type,
      age,
      image,
      description,
      adopted: false
    });

    res.json({ msg: "Pet added", pet: newPet });
  } catch (err) {
    console.error("ADD PET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE PET
router.delete("/:id", async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ msg: "Pet deleted" });
  } catch (err) {
    console.log("DELETE PET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// UPDATE PET
router.put("/:id", async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Pet not found" });

    res.json({ msg: "Pet updated", pet: updated });
  } catch (err) {
    console.log("UPDATE PET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


export default router;
