import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
