import mongoose from "mongoose";

const AdoptionRequestSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

  // fallback details if user is not logged in
  name: { type: String, required: true },
  email: { type: String, required: true },

  message: { type: String, default: "" },
  status: { type: String, enum: ["pending","accepted","rejected"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("AdoptionRequest", AdoptionRequestSchema);
