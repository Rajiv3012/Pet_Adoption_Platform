import mongoose from "mongoose";
import dotenv from "dotenv";
import MedicalRecord from "./models/MedicalRecord.js";
import Pet from "./models/Pet.js";

dotenv.config();

const seedMedicalRecords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing medical records
    await MedicalRecord.deleteMany({});

    // Get all pets
    const pets = await Pet.find();
    if (pets.length === 0) {
      console.log("No pets found. Please seed pets first.");
      process.exit(1);
    }

    const medicalRecords = [];

    // Create sample medical records for each pet
    for (const pet of pets) {
      // Vaccination record
      medicalRecords.push({
        petId: pet._id,
        recordType: "vaccination",
        title: "Annual Vaccination",
        description: "Complete annual vaccination including rabies, DHPP, and bordetella vaccines.",
        veterinarian: "Dr. Sarah Johnson",
        clinic: "City Animal Hospital",
        date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
        nextAppointment: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Next year
        vaccinations: [
          {
            vaccine: "Rabies",
            dateGiven: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
            nextDue: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            batchNumber: "RB2024-001"
          },
          {
            vaccine: "DHPP",
            dateGiven: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
            nextDue: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            batchNumber: "DH2024-002"
          }
        ],
        cost: 85,
        notes: "Pet responded well to vaccinations. No adverse reactions observed."
      });

      // Health checkup record
      medicalRecords.push({
        petId: pet._id,
        recordType: "checkup",
        title: "Routine Health Checkup",
        description: "Comprehensive health examination including weight check, dental inspection, and overall wellness assessment.",
        veterinarian: "Dr. Michael Chen",
        clinic: "Pet Care Plus",
        date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000), // Random date within last 60 days
        nextAppointment: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
        cost: 65,
        notes: "Overall health is excellent. Recommend dental cleaning in next 6 months."
      });

      // Treatment record (for some pets)
      if (Math.random() > 0.5) {
        medicalRecords.push({
          petId: pet._id,
          recordType: "treatment",
          title: "Skin Allergy Treatment",
          description: "Treatment for seasonal skin allergies with prescribed medications and dietary recommendations.",
          veterinarian: "Dr. Emily Rodriguez",
          clinic: "Animal Wellness Center",
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
          medications: [
            {
              name: "Apoquel",
              dosage: "5.4mg",
              frequency: "Twice daily",
              duration: "14 days"
            },
            {
              name: "Medicated Shampoo",
              dosage: "As needed",
              frequency: "2-3 times per week",
              duration: "Ongoing"
            }
          ],
          cost: 120,
          notes: "Significant improvement observed after 1 week of treatment. Continue medication as prescribed."
        });
      }

      // Surgery record (for fewer pets)
      if (Math.random() > 0.7) {
        medicalRecords.push({
          petId: pet._id,
          recordType: "surgery",
          title: pet.isNeutered ? "Spay/Neuter Surgery" : "Minor Surgery",
          description: pet.isNeutered 
            ? "Routine spay/neuter surgery performed successfully with no complications."
            : "Minor surgical procedure to remove benign growth. Full recovery expected.",
          veterinarian: "Dr. Robert Kim",
          clinic: "Advanced Pet Surgery",
          date: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000), // Random date within last 180 days
          medications: [
            {
              name: "Pain Relief",
              dosage: "As prescribed",
              frequency: "Twice daily",
              duration: "7 days"
            },
            {
              name: "Antibiotics",
              dosage: "250mg",
              frequency: "Once daily",
              duration: "10 days"
            }
          ],
          cost: pet.isNeutered ? 200 : 350,
          notes: "Surgery completed successfully. Follow-up appointment scheduled for suture removal."
        });
      }

      // Medication record (for some pets)
      if (Math.random() > 0.6) {
        medicalRecords.push({
          petId: pet._id,
          recordType: "medication",
          title: "Ongoing Medication Management",
          description: "Regular medication for chronic condition management and monitoring.",
          veterinarian: "Dr. Lisa Thompson",
          clinic: "Companion Animal Clinic",
          date: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000), // Random date within last 14 days
          nextAppointment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          medications: [
            {
              name: "Joint Support Supplement",
              dosage: "1 tablet",
              frequency: "Daily",
              duration: "Ongoing"
            }
          ],
          cost: 45,
          notes: "Pet is responding well to medication. Continue current dosage."
        });
      }
    }

    // Insert all medical records
    const createdRecords = await MedicalRecord.insertMany(medicalRecords);

    console.log("✅ Medical records created successfully!");
    console.log(`Created ${createdRecords.length} medical records for ${pets.length} pets`);
    
    // Show breakdown by type
    const recordTypes = createdRecords.reduce((acc, record) => {
      acc[record.recordType] = (acc[record.recordType] || 0) + 1;
      return acc;
    }, {});
    
    console.log("Record types breakdown:");
    Object.entries(recordTypes).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count} records`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding medical records:", error);
    process.exit(1);
  }
};

seedMedicalRecords();