import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  googleId: { type: String, unique: true, sparse: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
