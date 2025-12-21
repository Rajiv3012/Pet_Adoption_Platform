import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  shelterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Shelter", 
    required: true 
  },
  adoptionStatus: { 
    type: String, 
    enum: ["available", "pending", "adopted"], 
    default: "available" 
  },
  gender: { 
    type: String, 
    enum: ["male", "female"], 
    required: true 
  },
  size: { 
    type: String, 
    enum: ["small", "medium", "large"], 
    required: true 
  },
  color: { 
    type: String, 
    required: true 
  },
  weight: { 
    type: Number 
  },
  isVaccinated: { 
    type: Boolean, 
    default: false 
  },
  isNeutered: { 
    type: Boolean, 
    default: false 
  },
  specialNeeds: { 
    type: String 
  },
  adoptionFee: { 
    type: Number, 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Pet", PetSchema);
