import express from "express";
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  updateAdoptionStatus
} from "../controllers/petController.js";
import { authenticateToken, requireAdmin, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllPets);
router.get("/:id", getPetById);

// Admin only routes
router.post("/", authenticateToken, requireAdmin, createPet);
router.put("/:id", authenticateToken, requireAdmin, updatePet);
router.patch("/:id/adoption-status", authenticateToken, requireAdmin, updateAdoptionStatus);
router.delete("/:id", authenticateToken, requireAdmin, deletePet);

export default router;
