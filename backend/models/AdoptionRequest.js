import mongoose from "mongoose";

const AdoptionRequestSchema = new mongoose.Schema(
  {
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null }
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionRequest", AdoptionRequestSchema);
