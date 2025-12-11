// backend/routes/pets.js
import express from "express";
import Pet from "../models/Pet.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

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

// ADD NEW PET (with file upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, type, age, description } = req.body;

    if (!name || !type || !age || !req.file) {
      return res.status(400).json({ msg: "Missing required fields or image" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;

    const newPet = await Pet.create({
      name,
      type,
      age,
      image: imageUrl,
      description,
      adopted: false
    });

    res.json({ msg: "Pet added", pet: newPet });
  } catch (err) {
    console.error("ADD PET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// UPDATE PET (with optional new image)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, type, age, description, adopted } = req.body;
    const updates = { name, type, age, description };
    if (typeof adopted !== "undefined") updates.adopted = adopted;

    // if new file provided, replace image
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;
      updates.image = imageUrl;

      // optionally remove previous file from disk (best-effort)
      const pet = await Pet.findById(req.params.id);
      if (pet && pet.image && pet.image.includes("/uploads/")) {
        try {
          const prevPath = pet.image.split("/uploads/").pop();
          const fullPath = path.join("uploads", prevPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        } catch (e) {
          console.warn("Failed to remove old image:", e.message);
        }
      }
    }

    const updated = await Pet.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ msg: "Pet not found" });

    res.json({ msg: "Pet updated", pet: updated });
  } catch (err) {
    console.log("UPDATE PET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE PET
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (pet && pet.image && pet.image.includes("/uploads/")) {
      try {
        const prevPath = pet.image.split("/uploads/").pop();
        const fullPath = path.join("uploads", prevPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      } catch (e) {
        console.warn("Failed to delete image file:", e.message);
      }
    }
    res.json({ msg: "Pet deleted" });
  } catch (err) {
    console.log("DELETE PET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
