import mongoose from "mongoose";
import dotenv from "dotenv";
import Shelter from "./models/Shelter.js";

dotenv.config();

const seedIndianShelters = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing shelters
    await Shelter.deleteMany({});

    // Create Indian shelters
    const shelters = await Shelter.insertMany([
      {
        name: "Mumbai Animal Welfare",
        address: "Andheri West, Near Metro Station",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400053",
        phone: "+91 22 2673 4567",
        email: "info@mumbaianimalshelter.org",
        capacity: 50,
        currentOccupancy: 32,
        operatingHours: {
          monday: "9:00 AM - 6:00 PM",
          tuesday: "9:00 AM - 6:00 PM",
          wednesday: "9:00 AM - 6:00 PM",
          thursday: "9:00 AM - 6:00 PM",
          friday: "9:00 AM - 6:00 PM",
          saturday: "10:00 AM - 5:00 PM",
          sunday: "10:00 AM - 5:00 PM"
        },
        coordinates: {
          latitude: 19.1136,
          longitude: 72.8697
        }
      },
      {
        name: "Delhi Animal Care",
        address: "Vasant Kunj, Sector C",
        city: "Delhi",
        state: "Delhi",
        zipCode: "110070",
        phone: "+91 11 4567 8901",
        email: "contact@delhianimalcare.org",
        capacity: 60,
        currentOccupancy: 45,
        operatingHours: {
          monday: "8:00 AM - 7:00 PM",
          tuesday: "8:00 AM - 7:00 PM",
          wednesday: "8:00 AM - 7:00 PM",
          thursday: "8:00 AM - 7:00 PM",
          friday: "8:00 AM - 7:00 PM",
          saturday: "9:00 AM - 6:00 PM",
          sunday: "9:00 AM - 6:00 PM"
        },
        coordinates: {
          latitude: 28.5244,
          longitude: 77.1588
        }
      },
      {
        name: "Bengaluru Pet Rescue",
        address: "Koramangala, 5th Block",
        city: "Bengaluru",
        state: "Karnataka",
        zipCode: "560095",
        phone: "+91 80 4123 5678",
        email: "help@bengalurupetrescue.org",
        capacity: 75,
        currentOccupancy: 48,
        operatingHours: {
          monday: "9:00 AM - 6:00 PM",
          tuesday: "9:00 AM - 6:00 PM",
          wednesday: "9:00 AM - 6:00 PM",
          thursday: "9:00 AM - 6:00 PM",
          friday: "9:00 AM - 6:00 PM",
          saturday: "10:00 AM - 4:00 PM",
          sunday: "10:00 AM - 4:00 PM"
        },
        coordinates: {
          latitude: 12.9352,
          longitude: 77.6245
        }
      },
      {
        name: "Chennai Humane Society",
        address: "Adyar, Gandhi Nagar",
        city: "Chennai",
        state: "Tamil Nadu",
        zipCode: "600020",
        phone: "+91 44 2345 6789",
        email: "info@chennaihumane.org",
        capacity: 55,
        currentOccupancy: 38,
        operatingHours: {
          monday: "8:30 AM - 5:30 PM",
          tuesday: "8:30 AM - 5:30 PM",
          wednesday: "8:30 AM - 5:30 PM",
          thursday: "8:30 AM - 5:30 PM",
          friday: "8:30 AM - 5:30 PM",
          saturday: "9:00 AM - 4:00 PM",
          sunday: "9:00 AM - 4:00 PM"
        },
        coordinates: {
          latitude: 13.0067,
          longitude: 80.2574
        }
      },
      {
        name: "Kolkata Animal Shelter",
        address: "Salt Lake, Sector V",
        city: "Kolkata",
        state: "West Bengal",
        zipCode: "700091",
        phone: "+91 33 2234 5678",
        email: "contact@kolkataanimalshelter.org",
        capacity: 65,
        currentOccupancy: 42,
        operatingHours: {
          monday: "9:00 AM - 6:00 PM",
          tuesday: "9:00 AM - 6:00 PM",
          wednesday: "9:00 AM - 6:00 PM",
          thursday: "9:00 AM - 6:00 PM",
          friday: "9:00 AM - 6:00 PM",
          saturday: "10:00 AM - 5:00 PM",
          sunday: "Closed"
        },
        coordinates: {
          latitude: 22.5726,
          longitude: 88.3639
        }
      }
    ]);

    console.log("✅ Indian shelters created successfully!");
    console.log(`Created ${shelters.length} shelters:`);
    shelters.forEach(shelter => {
      console.log(`  - ${shelter.name} (${shelter.city})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding shelters:", error);
    process.exit(1);
  }
};

seedIndianShelters();
