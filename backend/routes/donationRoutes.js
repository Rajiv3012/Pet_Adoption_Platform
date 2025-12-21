import express from "express";
import {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonationStatus,
  getDonationStats
} from "../controllers/donationController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", createDonation);

// Admin only routes
router.get("/", authenticateToken, requireAdmin, getAllDonations);
router.get("/stats", authenticateToken, requireAdmin, getDonationStats);
router.get("/:id", authenticateToken, requireAdmin, getDonationById);
router.patch("/:id/status", authenticateToken, requireAdmin, updateDonationStatus);

export default router;
