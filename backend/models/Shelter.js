import mongoose from "mongoose";

const ShelterSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  state: { 
    type: String, 
    required: true 
  },
  zipCode: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  currentOccupancy: { 
    type: Number, 
    default: 0 
  },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  operatingHours: {
    monday: { type: String, default: "9:00 AM - 5:00 PM" },
    tuesday: { type: String, default: "9:00 AM - 5:00 PM" },
    wednesday: { type: String, default: "9:00 AM - 5:00 PM" },
    thursday: { type: String, default: "9:00 AM - 5:00 PM" },
    friday: { type: String, default: "9:00 AM - 5:00 PM" },
    saturday: { type: String, default: "10:00 AM - 4:00 PM" },
    sunday: { type: String, default: "10:00 AM - 4:00 PM" }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Shelter", ShelterSchema);