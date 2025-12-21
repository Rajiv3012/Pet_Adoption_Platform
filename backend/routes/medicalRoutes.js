import express from "express";
import {
  getMedicalRecordsByPet,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getVaccinationHistory
} from "../controllers/medicalController.js";
import { authenticateToken, requireAdmin, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public/User routes (read-only)
router.get("/pet/:petId", optionalAuth, getMedicalRecordsByPet);
router.get("/pet/:petId/vaccinations", optionalAuth, getVaccinationHistory);
router.get("/:id", optionalAuth, getMedicalRecordById);

// Admin only routes
router.post("/", authenticateToken, requireAdmin, createMedicalRecord);
router.put("/:id", authenticateToken, requireAdmin, updateMedicalRecord);
router.delete("/:id", authenticateToken, requireAdmin, deleteMedicalRecord);

export default router;