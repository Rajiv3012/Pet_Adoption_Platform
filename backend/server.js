import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ROUTES
import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pets.js";
import adoptionRoutes from "./routes/adoptionRequests.js";
import adminRoutes from "./routes/admin.js";
import setupAdminRoutes from "./routes/setupAdmin.js";

dotenv.config();

const app = express();

// -------------------
// MIDDLEWARE
// -------------------
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// -------------------
// ROUTES
// -------------------
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoption-requests", adoptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/setup", setupAdminRoutes);

// -------------------
// MONGODB CONNECTION
// -------------------
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log("MongoDB connected to:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// -------------------
// START SERVER
// -------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
