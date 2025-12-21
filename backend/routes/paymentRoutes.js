import express from "express";
import {
  createOrder,
  verifyPayment,
  getPaymentDetails,
  handlePaymentFailure
} from "../controllers/paymentController.js";
import { authenticateToken, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Razorpay order (public route - no auth required for donations)
router.post("/create-order", createOrder);

// Verify payment signature (public route)
router.post("/verify-payment", verifyPayment);

// Handle payment failure (public route)
router.post("/payment-failure", handlePaymentFailure);

// Get payment details (optional auth - for user's own payments)
router.get("/payment/:payment_id", optionalAuth, getPaymentDetails);

export default router;