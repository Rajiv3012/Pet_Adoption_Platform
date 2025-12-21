import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  shelterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Shelter", 
    required: true 
  },
  skills: [{ 
    type: String 
  }],
  availability: {
    monday: { available: Boolean, timeSlots: [String] },
    tuesday: { available: Boolean, timeSlots: [String] },
    wednesday: { available: Boolean, timeSlots: [String] },
    thursday: { available: Boolean, timeSlots: [String] },
    friday: { available: Boolean, timeSlots: [String] },
    saturday: { available: Boolean, timeSlots: [String] },
    sunday: { available: Boolean, timeSlots: [String] }
  },
  experience: { 
    type: String, 
    enum: ["none", "beginner", "intermediate", "advanced"], 
    default: "none" 
  },
  interests: [{ 
    type: String 
  }],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  backgroundCheck: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  status: { 
    type: String, 
    enum: ["active", "inactive", "suspended"], 
    default: "active" 
  },
  hoursCompleted: { 
    type: Number, 
    default: 0 
  },
  startDate: { 
    type: Date, 
    default: Date.now 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Volunteer", VolunteerSchema);