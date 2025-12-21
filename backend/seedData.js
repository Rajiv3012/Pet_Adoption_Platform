import mongoose from "mongoose";
import dotenv from "dotenv";
import Shelter from "./models/Shelter.js";
import Pet from "./models/Pet.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Shelter.deleteMany({});
    await Pet.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@petadoption.com",
      password: hashedPassword,
      role: "admin"
    });

    // Create sample shelters
    const shelters = await Shelter.insertMany([
      {
        name: "Happy Paws Animal Shelter",
        address: "123 Main Street",
        city: "Springfield",
        state: "IL",
        zipCode: "62701",
        phone: "(555) 123-4567",
        email: "info@happypaws.com",
        capacity: 50,
        currentOccupancy: 0,
        coordinates: {
          latitude: 39.7817,
          longitude: -89.6501
        }
      },
      {
        name: "Loving Hearts Pet Rescue",
        address: "456 Oak Avenue",
        city: "Madison",
        state: "WI",
        zipCode: "53703",
        phone: "(555) 987-6543",
        email: "contact@lovinghearts.org",
        capacity: 75,
        currentOccupancy: 0,
        coordinates: {
          latitude: 43.0731,
          longitude: -89.4012
        }
      },
      {
        name: "Safe Haven Animal Sanctuary",
        address: "789 Pine Road",
        city: "Cedar Rapids",
        state: "IA",
        zipCode: "52402",
        phone: "(555) 456-7890",
        email: "help@safehaven.org",
        capacity: 100,
        currentOccupancy: 0,
        coordinates: {
          latitude: 41.9778,
          longitude: -91.6656
        }
      }
    ]);

    // Create sample pets
    const pets = await Pet.insertMany([
      {
        name: "Buddy",
        type: "Dog",
        breed: "Golden Retriever",
        age: 3,
        gender: "male",
        size: "large",
        color: "Golden",
        weight: 65,
        description: "Friendly and energetic dog who loves to play fetch and go on walks.",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
        shelterId: shelters[0]._id,
        isVaccinated: true,
        isNeutered: true,
        adoptionFee: 250,
        adoptionStatus: "available"
      },
      {
        name: "Whiskers",
        type: "Cat",
        breed: "Domestic Shorthair",
        age: 2,
        gender: "female",
        size: "medium",
        color: "Tabby",
        weight: 8,
        description: "Sweet and gentle cat who loves to cuddle and purr.",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
        shelterId: shelters[0]._id,
        isVaccinated: true,
        isNeutered: true,
        adoptionFee: 150,
        adoptionStatus: "available"
      },
      {
        name: "Max",
        type: "Dog",
        breed: "German Shepherd",
        age: 4,
        gender: "male",
        size: "large",
        color: "Black and Tan",
        weight: 75,
        description: "Loyal and intelligent dog, great with families and children.",
        image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400",
        shelterId: shelters[1]._id,
        isVaccinated: true,
        isNeutered: false,
        adoptionFee: 300,
        adoptionStatus: "available"
      },
      {
        name: "Luna",
        type: "Cat",
        breed: "Siamese",
        age: 1,
        gender: "female",
        size: "small",
        color: "Cream and Brown",
        weight: 6,
        description: "Playful kitten who loves toys and exploring new places.",
        image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400",
        shelterId: shelters[1]._id,
        isVaccinated: true,
        isNeutered: false,
        adoptionFee: 175,
        adoptionStatus: "available"
      },
      {
        name: "Charlie",
        type: "Dog",
        breed: "Labrador Mix",
        age: 5,
        gender: "male",
        size: "medium",
        color: "Chocolate",
        weight: 55,
        description: "Calm and well-trained dog, perfect for a quiet household.",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
        shelterId: shelters[2]._id,
        isVaccinated: true,
        isNeutered: true,
        adoptionFee: 200,
        adoptionStatus: "available"
      },
      {
        name: "Mittens",
        type: "Cat",
        breed: "Persian",
        age: 3,
        gender: "female",
        size: "medium",
        color: "White",
        weight: 10,
        description: "Elegant and calm cat who enjoys quiet environments.",
        image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
        shelterId: shelters[2]._id,
        isVaccinated: true,
        isNeutered: true,
        adoptionFee: 225,
        adoptionStatus: "available"
      }
    ]);

    // Update shelter occupancy
    await Shelter.findByIdAndUpdate(shelters[0]._id, { currentOccupancy: 2 });
    await Shelter.findByIdAndUpdate(shelters[1]._id, { currentOccupancy: 2 });
    await Shelter.findByIdAndUpdate(shelters[2]._id, { currentOccupancy: 2 });

    console.log("✅ Sample data created successfully!");
    console.log(`Created ${shelters.length} shelters`);
    console.log(`Created ${pets.length} pets`);
    console.log("Admin user created - Email: admin@petadoption.com, Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();