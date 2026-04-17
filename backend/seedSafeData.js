import mongoose from "mongoose";
import dotenv from "dotenv";
import Shelter from "./models/Shelter.js";
import Pet from "./models/Pet.js";
import MedicalRecord from "./models/MedicalRecord.js";

dotenv.config();

const shelterSeeds = [
  {
    name: "Happy Paws Animal Shelter",
    address: "123 MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    zipCode: "560001",
    phone: "+91-80-4000-1111",
    email: "info@happypaws.org",
    capacity: 80,
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
  },
  {
    name: "Loving Hearts Pet Rescue",
    address: "45 Park Street",
    city: "Kolkata",
    state: "West Bengal",
    zipCode: "700016",
    phone: "+91-33-4100-2222",
    email: "contact@lovinghearts.org",
    capacity: 60,
    coordinates: { latitude: 22.5726, longitude: 88.3639 },
  },
];

const petSeeds = [
  {
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "male",
    size: "large",
    color: "Golden",
    weight: 30,
    description: "Friendly and energetic dog who loves long walks.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
    isVaccinated: true,
    isNeutered: true,
    adoptionFee: 3500,
    adoptionStatus: "available",
    shelterName: "Happy Paws Animal Shelter",
  },
  {
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: 2,
    gender: "female",
    size: "small",
    color: "Cream and Brown",
    weight: 4,
    description: "Playful and affectionate cat, great with families.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    isVaccinated: true,
    isNeutered: true,
    adoptionFee: 2500,
    adoptionStatus: "available",
    shelterName: "Loving Hearts Pet Rescue",
  },
  {
    name: "Max",
    type: "Dog",
    breed: "Indie",
    age: 4,
    gender: "male",
    size: "medium",
    color: "Brown",
    weight: 18,
    description: "Calm, obedient, and perfect for first-time adopters.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    isVaccinated: true,
    isNeutered: false,
    adoptionFee: 3000,
    adoptionStatus: "available",
    shelterName: "Happy Paws Animal Shelter",
  },
];

function buildMedicalRecord(pet) {
  const now = new Date();
  const lastMonth = new Date(now);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  return {
    petId: pet._id,
    recordType: "checkup",
    title: "Routine Health Checkup",
    description: "General wellness checkup with basic vitals and examination.",
    veterinarian: "Dr. Ananya Mehta",
    clinic: "City Pet Care Clinic",
    date: lastMonth,
    nextAppointment: new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()),
    medications: [],
    vaccinations: [],
    cost: 1200,
    notes: "Pet is healthy and active. Continue standard diet and exercise.",
  };
}

async function seedSafeData() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const shelterByName = new Map();
    let createdShelters = 0;

    for (const shelter of shelterSeeds) {
      let existing = await Shelter.findOne({ name: shelter.name });
      if (!existing) {
        existing = await Shelter.create({ ...shelter, currentOccupancy: 0 });
        createdShelters += 1;
      }
      shelterByName.set(shelter.name, existing);
    }

    let createdPets = 0;
    const touchedShelterIds = new Set();

    for (const petSeed of petSeeds) {
      const shelter = shelterByName.get(petSeed.shelterName);
      if (!shelter) continue;

      const existingPet = await Pet.findOne({
        name: petSeed.name,
        shelterId: shelter._id,
      });

      if (!existingPet) {
        const { shelterName, ...petDoc } = petSeed;
        await Pet.create({ ...petDoc, shelterId: shelter._id });
        createdPets += 1;
      }

      touchedShelterIds.add(String(shelter._id));
    }

    for (const shelterId of touchedShelterIds) {
      const occupancy = await Pet.countDocuments({ shelterId });
      await Shelter.findByIdAndUpdate(shelterId, { currentOccupancy: occupancy });
    }

    const pets = await Pet.find({ name: { $in: petSeeds.map((p) => p.name) } });

    let createdMedicalRecords = 0;
    for (const pet of pets) {
      const count = await MedicalRecord.countDocuments({ petId: pet._id });
      if (count === 0) {
        await MedicalRecord.create(buildMedicalRecord(pet));
        createdMedicalRecords += 1;
      }
    }

    console.log("Safe seeding complete");
    console.log(`Shelters created: ${createdShelters}`);
    console.log(`Pets created: ${createdPets}`);
    console.log(`Medical records created: ${createdMedicalRecords}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Safe seed failed:", error.message);
    process.exit(1);
  }
}

seedSafeData();
