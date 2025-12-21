import express from "express";
import Pet from "../models/Pet.js";
import Shelter from "../models/Shelter.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication and admin check to all routes
router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/admin/pets - Get all pets for admin
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate("shelterId", "name address city state")
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      pets
    });
  } catch (error) {
    console.error("Admin get pets error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/admin/pets - Create new pet (admin only)
router.post("/pets", async (req, res) => {
  try {
    console.log("🐾 Admin creating new pet...");
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    
    const {
      name,
      type,
      breed,
      age,
      description,
      image,
      shelterId,
      gender,
      size,
      color,
      weight,
      isVaccinated,
      isNeutered,
      specialNeeds,
      adoptionFee
    } = req.body;

    // Validate required fields
    if (!name || !type || !breed || !age || !description || !image || !shelterId || !gender || !size || !color || !adoptionFee) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ 
        msg: "Missing required fields",
        required: ["name", "type", "breed", "age", "description", "image", "shelterId", "gender", "size", "color", "adoptionFee"]
      });
    }

    // Validate shelter exists
    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      console.log("❌ Invalid shelter ID:", shelterId);
      return res.status(400).json({ msg: "Invalid shelter ID" });
    }

    console.log("✅ Validation passed, creating pet...");

    // Create new pet
    const newPet = new Pet({
      name,
      type,
      breed,
      age,
      description,
      image,
      shelterId,
      gender,
      size,
      color,
      weight,
      isVaccinated: isVaccinated || false,
      isNeutered: isNeutered || false,
      specialNeeds,
      adoptionFee
    });

    const savedPet = await newPet.save();
    console.log("✅ Pet saved to database:", savedPet._id);
    
    const populatedPet = await Pet.findById(savedPet._id).populate("shelterId", "name address city state");

    console.log("✅ Pet creation successful");
    res.status(201).json({
      success: true,
      msg: "Pet added successfully",
      pet: populatedPet
    });
  } catch (error) {
    console.error("❌ Admin create pet error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/admin/pets/:id - Update pet (admin only)
router.put("/pets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate pet exists
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    // If shelterId is being updated, validate it exists
    if (updateData.shelterId) {
      const shelter = await Shelter.findById(updateData.shelterId);
      if (!shelter) {
        return res.status(400).json({ msg: "Invalid shelter ID" });
      }
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("shelterId", "name address city state");

    res.json({
      success: true,
      msg: "Pet updated successfully",
      pet: updatedPet
    });
  } catch (error) {
    console.error("Admin update pet error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/admin/pets/:id - Delete pet (admin only)
router.delete("/pets/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    await Pet.findByIdAndDelete(id);

    res.json({
      success: true,
      msg: "Pet deleted successfully"
    });
  } catch (error) {
    console.error("Admin delete pet error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/shelters - Get all shelters for dropdown
router.get("/shelters", async (req, res) => {
  try {
    const shelters = await Shelter.find().select("name address city state");
    
    res.json({
      success: true,
      shelters
    });
  } catch (error) {
    console.error("Admin get shelters error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/stats - Get admin dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments();
    const availablePets = await Pet.countDocuments({ adoptionStatus: "available" });
    const adoptedPets = await Pet.countDocuments({ adoptionStatus: "adopted" });
    const pendingPets = await Pet.countDocuments({ adoptionStatus: "pending" });

    const recentPets = await Pet.find()
      .populate("shelterId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalPets,
        availablePets,
        adoptedPets,
        pendingPets,
        recentPets
      }
    });
  } catch (error) {
    console.error("Admin get stats error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;