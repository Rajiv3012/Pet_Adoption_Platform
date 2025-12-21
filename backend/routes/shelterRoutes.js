import express from "express";
import {
  getAllShelters,
  getShelterById,
  getPetsByShelter,
  createShelter,
  updateShelter,
  deleteShelter
} from "../controllers/shelterController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllShelters);
router.get("/:id", getShelterById);
router.get("/:id/pets", getPetsByShelter);

// Admin only routes
router.post("/", authenticateToken, requireAdmin, createShelter);
router.put("/:id", authenticateToken, requireAdmin, updateShelter);
router.delete("/:id", authenticateToken, requireAdmin, deleteShelter);

export default router;