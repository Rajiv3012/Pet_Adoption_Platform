import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import shelterRoutes from "./routes/shelterRoutes.js";
import medicalRoutes from "./routes/medicalRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import adminRoutes from "./routes/admin.js";
import passport from "./config/passport.js";
import googleAuthRoutes from "./routes/googleAuth.js";

const app = express();

// Middleware
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/medical", medicalRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin", adminRoutes);

// Root route
app.get("/", (req, res) => res.send("Backend is running 🚀"));

// Start Server after DB connection
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Backend running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

start();