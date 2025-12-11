import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true }, // URL/path
  description: { type: String, default: "" },
  adopted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Pet", PetSchema);
