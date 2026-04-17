import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@petadoption.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

async function ensureAdminUser() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    let user = await User.findOne({ email: ADMIN_EMAIL });

    if (!user) {
      user = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`Created admin user: ${user.email}`);
    } else {
      user.name = ADMIN_NAME;
      user.password = hashedPassword;
      user.role = "admin";
      await user.save();
      console.log(`Updated existing user as admin: ${user.email}`);
    }

    await mongoose.disconnect();
    console.log("Done");
    process.exit(0);
  } catch (error) {
    console.error("ensureAdminUser failed:", error.message);
    process.exit(1);
  }
}

ensureAdminUser();
