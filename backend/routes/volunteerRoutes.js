import express from "express";
import {
  getAllVolunteers,
  getVolunteerById,
  getVolunteersByShelter,
  createVolunteer,
  updateVolunteer,
  updateVolunteerStatus,
  updateVolunteerHours,
  deleteVolunteer
} from "../controllers/volunteerController.js";
import { authenticateToken, requireAdmin, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", createVolunteer);

// Admin routes
router.get("/", authenticateToken, requireAdmin, getAllVolunteers);
router.get("/shelter/:shelterId", authenticateToken, requireAdmin, getVolunteersByShelter);
router.get("/:id", authenticateToken, requireAdmin, getVolunteerById);
router.put("/:id", authenticateToken, requireAdmin, updateVolunteer);
router.patch("/:id/status", authenticateToken, requireAdmin, updateVolunteerStatus);
router.patch("/:id/hours", authenticateToken, requireAdmin, updateVolunteerHours);
router.delete("/:id", authenticateToken, requireAdmin, deleteVolunteer);

export default router;