import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema({
  petId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Pet", 
    required: true 
  },
  recordType: { 
    type: String, 
    enum: ["vaccination", "treatment", "checkup", "surgery", "medication"], 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  veterinarian: { 
    type: String, 
    required: true 
  },
  clinic: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  nextAppointment: { 
    type: Date 
  },
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String
  }],
  vaccinations: [{
    vaccine: String,
    dateGiven: Date,
    nextDue: Date,
    batchNumber: String
  }],
  cost: { 
    type: Number, 
    default: 0 
  },
  notes: { 
    type: String 
  },
  attachments: [{ 
    type: String 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("MedicalRecord", MedicalRecordSchema);