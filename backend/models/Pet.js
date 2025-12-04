import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    ageYears: { type: Number },
    description: { type: String },
    photos: { type: [String], default: [] },
    status: { type: String, default: "available" }
  },
  { timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
