import mongoose from "mongoose";
import dotenv from "dotenv";
import MedicalRecord from "./models/MedicalRecord.js";
import Pet from "./models/Pet.js";

dotenv.config();

const seedMedicalData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get existing pets
    const pets = await Pet.find();
    if (pets.length === 0) {
      console.log("No pets found. Please run seedData.js first.");
      process.exit(1);
    }

    // Clear existing medical records
    await MedicalRecord.deleteMany({});

    // Create sample medical records
    const medicalRecords = [];

    // Records for first pet (Buddy)
    if (pets[0]) {
      medicalRecords.push(
        {
          petId: pets[0]._id,
          recordType: "vaccination",
          title: "Annual Vaccination Package",
          description: "Complete annual vaccination including rabies, DHPP, and bordetella vaccines.",
          veterinarian: "Dr. Sarah Johnson",
          clinic: "Happy Paws Veterinary Clinic",
          date: new Date("2024-03-15"),
          nextAppointment: new Date("2025-03-15"),
          vaccinations: [
            {
              vaccine: "Rabies",
              dateGiven: new Date("2024-03-15"),
              nextDue: new Date("2025-03-15"),
              batchNumber: "RAB2024-001"
            },
            {
              vaccine: "DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)",
              dateGiven: new Date("2024-03-15"),
              nextDue: new Date("2025-03-15"),
              batchNumber: "DHPP2024-002"
            }
          ],
          cost: 85,
          notes: "Pet responded well to vaccinations. No adverse reactions observed."
        },
        {
          petId: pets[0]._id,
          recordType: "checkup",
          title: "Annual Health Checkup",
          description: "Comprehensive health examination including blood work and dental check.",
          veterinarian: "Dr. Sarah Johnson",
          clinic: "Happy Paws Veterinary Clinic",
          date: new Date("2024-06-10"),
          nextAppointment: new Date("2025-06-10"),
          cost: 120,
          notes: "Overall excellent health. Slight tartar buildup on teeth - recommend dental cleaning in 6 months."
        }
      );
    }

    // Records for second pet (Whiskers)
    if (pets[1]) {
      medicalRecords.push(
        {
          petId: pets[1]._id,
          recordType: "vaccination",
          title: "Feline Vaccination Series",
          description: "Core feline vaccines including FVRCP and rabies.",
          veterinarian: "Dr. Michael Chen",
          clinic: "City Animal Hospital",
          date: new Date("2024-04-20"),
          nextAppointment: new Date("2025-04-20"),
          vaccinations: [
            {
              vaccine: "FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)",
              dateGiven: new Date("2024-04-20"),
              nextDue: new Date("2025-04-20"),
              batchNumber: "FVRCP2024-003"
            },
            {
              vaccine: "Rabies",
              dateGiven: new Date("2024-04-20"),
              nextDue: new Date("2025-04-20"),
              batchNumber: "RAB2024-004"
            }
          ],
          cost: 75,
          notes: "Vaccination completed successfully. Cat was calm during procedure."
        },
        {
          petId: pets[1]._id,
          recordType: "surgery",
          title: "Spay Surgery",
          description: "Ovariohysterectomy (spay) surgery performed successfully.",
          veterinarian: "Dr. Emily Rodriguez",
          clinic: "City Animal Hospital",
          date: new Date("2024-02-14"),
          cost: 200,
          medications: [
            {
              name: "Carprofen",
              dosage: "2mg per kg",
              frequency: "Once daily",
              duration: "5 days"
            }
          ],
          notes: "Surgery completed without complications. Recovery was smooth. Sutures removed after 10 days."
        }
      );
    }

    // Records for third pet (Max)
    if (pets[2]) {
      medicalRecords.push(
        {
          petId: pets[2]._id,
          recordType: "treatment",
          title: "Ear Infection Treatment",
          description: "Treatment for bacterial ear infection in both ears.",
          veterinarian: "Dr. Lisa Thompson",
          clinic: "Westside Veterinary Center",
          date: new Date("2024-05-08"),
          nextAppointment: new Date("2024-05-22"),
          medications: [
            {
              name: "Otomax Ointment",
              dosage: "Apply to affected ears",
              frequency: "Twice daily",
              duration: "14 days"
            }
          ],
          cost: 65,
          notes: "Ear infection responding well to treatment. Follow-up in 2 weeks to ensure complete resolution."
        },
        {
          petId: pets[2]._id,
          recordType: "vaccination",
          title: "Canine Vaccination Update",
          description: "Updated vaccinations including rabies and DHPP booster.",
          veterinarian: "Dr. Lisa Thompson",
          clinic: "Westside Veterinary Center",
          date: new Date("2024-01-15"),
          nextAppointment: new Date("2025-01-15"),
          vaccinations: [
            {
              vaccine: "Rabies",
              dateGiven: new Date("2024-01-15"),
              nextDue: new Date("2025-01-15"),
              batchNumber: "RAB2024-005"
            },
            {
              vaccine: "DHPP Booster",
              dateGiven: new Date("2024-01-15"),
              nextDue: new Date("2025-01-15"),
              batchNumber: "DHPP2024-006"
            }
          ],
          cost: 90,
          notes: "All vaccinations up to date. Dog is in excellent health."
        }
      );
    }

    // Records for fourth pet (Luna)
    if (pets[3]) {
      medicalRecords.push(
        {
          petId: pets[3]._id,
          recordType: "vaccination",
          title: "Kitten Vaccination Series - Final",
          description: "Final round of kitten vaccinations completed.",
          veterinarian: "Dr. Amanda White",
          clinic: "Paws & Claws Animal Clinic",
          date: new Date("2024-07-10"),
          nextAppointment: new Date("2025-07-10"),
          vaccinations: [
            {
              vaccine: "FVRCP",
              dateGiven: new Date("2024-07-10"),
              nextDue: new Date("2025-07-10"),
              batchNumber: "FVRCP2024-007"
            },
            {
              vaccine: "Rabies",
              dateGiven: new Date("2024-07-10"),
              nextDue: new Date("2027-07-10"),
              batchNumber: "RAB2024-008"
            },
            {
              vaccine: "FeLV (Feline Leukemia)",
              dateGiven: new Date("2024-07-10"),
              nextDue: new Date("2025-07-10"),
              batchNumber: "FELV2024-001"
            }
          ],
          cost: 95,
          notes: "Kitten vaccination series completed. Very playful and healthy kitten."
        },
        {
          petId: pets[3]._id,
          recordType: "checkup",
          title: "6-Month Wellness Check",
          description: "Routine wellness examination for young cat.",
          veterinarian: "Dr. Amanda White",
          clinic: "Paws & Claws Animal Clinic",
          date: new Date("2024-08-15"),
          nextAppointment: new Date("2025-02-15"),
          cost: 75,
          notes: "Healthy and active kitten. Weight is appropriate for age. Recommend spay surgery at 6 months."
        }
      );
    }

    // Records for fifth pet (Charlie)
    if (pets[4]) {
      medicalRecords.push(
        {
          petId: pets[4]._id,
          recordType: "surgery",
          title: "Neutering Surgery",
          description: "Castration surgery performed successfully.",
          veterinarian: "Dr. Robert Martinez",
          clinic: "Riverside Animal Hospital",
          date: new Date("2023-11-20"),
          cost: 180,
          medications: [
            {
              name: "Rimadyl",
              dosage: "25mg",
              frequency: "Twice daily",
              duration: "7 days"
            },
            {
              name: "Cephalexin",
              dosage: "250mg",
              frequency: "Twice daily",
              duration: "10 days"
            }
          ],
          notes: "Surgery completed successfully. Dog recovered well with no complications. Sutures dissolved naturally."
        },
        {
          petId: pets[4]._id,
          recordType: "vaccination",
          title: "Annual Vaccination Package",
          description: "Complete annual vaccination including rabies, DHPP, and leptospirosis.",
          veterinarian: "Dr. Robert Martinez",
          clinic: "Riverside Animal Hospital",
          date: new Date("2024-03-05"),
          nextAppointment: new Date("2025-03-05"),
          vaccinations: [
            {
              vaccine: "Rabies",
              dateGiven: new Date("2024-03-05"),
              nextDue: new Date("2025-03-05"),
              batchNumber: "RAB2024-009"
            },
            {
              vaccine: "DHPP",
              dateGiven: new Date("2024-03-05"),
              nextDue: new Date("2025-03-05"),
              batchNumber: "DHPP2024-010"
            },
            {
              vaccine: "Leptospirosis",
              dateGiven: new Date("2024-03-05"),
              nextDue: new Date("2025-03-05"),
              batchNumber: "LEPTO2024-001"
            }
          ],
          cost: 110,
          notes: "All vaccinations current. Dog is healthy and well-behaved during examination."
        },
        {
          petId: pets[4]._id,
          recordType: "checkup",
          title: "Senior Dog Wellness Exam",
          description: "Comprehensive health screening for senior dog including blood work.",
          veterinarian: "Dr. Robert Martinez",
          clinic: "Riverside Animal Hospital",
          date: new Date("2024-09-12"),
          nextAppointment: new Date("2025-03-12"),
          cost: 150,
          notes: "Blood work shows all values within normal range. Slight arthritis in hips - recommend joint supplements. Overall excellent health for age."
        }
      );
    }

    // Records for sixth pet (Mittens)
    if (pets[5]) {
      medicalRecords.push(
        {
          petId: pets[5]._id,
          recordType: "vaccination",
          title: "Feline Core Vaccines",
          description: "Annual feline vaccination package.",
          veterinarian: "Dr. Jennifer Lee",
          clinic: "Companion Animal Care Center",
          date: new Date("2024-02-28"),
          nextAppointment: new Date("2025-02-28"),
          vaccinations: [
            {
              vaccine: "FVRCP",
              dateGiven: new Date("2024-02-28"),
              nextDue: new Date("2025-02-28"),
              batchNumber: "FVRCP2024-011"
            },
            {
              vaccine: "Rabies",
              dateGiven: new Date("2024-02-28"),
              nextDue: new Date("2027-02-28"),
              batchNumber: "RAB2024-012"
            }
          ],
          cost: 80,
          notes: "Vaccinations completed. Cat was cooperative during visit."
        },
        {
          petId: pets[5]._id,
          recordType: "surgery",
          title: "Spay Surgery",
          description: "Ovariohysterectomy performed successfully.",
          veterinarian: "Dr. Jennifer Lee",
          clinic: "Companion Animal Care Center",
          date: new Date("2023-08-15"),
          cost: 210,
          medications: [
            {
              name: "Buprenorphine",
              dosage: "0.02mg per kg",
              frequency: "Twice daily",
              duration: "3 days"
            },
            {
              name: "Meloxicam",
              dosage: "0.1mg per kg",
              frequency: "Once daily",
              duration: "5 days"
            }
          ],
          notes: "Surgery successful with no complications. Cat recovered quickly and sutures healed well."
        },
        {
          petId: pets[5]._id,
          recordType: "treatment",
          title: "Dental Cleaning",
          description: "Professional dental cleaning and polishing under anesthesia.",
          veterinarian: "Dr. Jennifer Lee",
          clinic: "Companion Animal Care Center",
          date: new Date("2024-06-20"),
          nextAppointment: new Date("2025-06-20"),
          cost: 250,
          notes: "Dental cleaning completed. Removed moderate tartar buildup. No extractions needed. Teeth and gums are now healthy. Recommend annual dental cleanings."
        },
        {
          petId: pets[5]._id,
          recordType: "checkup",
          title: "Annual Health Examination",
          description: "Complete physical examination and health assessment.",
          veterinarian: "Dr. Jennifer Lee",
          clinic: "Companion Animal Care Center",
          date: new Date("2024-10-05"),
          nextAppointment: new Date("2025-10-05"),
          cost: 95,
          notes: "Cat is in excellent health. Weight is ideal. Coat is shiny and well-groomed. No health concerns noted."
        }
      );
    }

    await MedicalRecord.insertMany(medicalRecords);

    console.log("✅ Medical records created successfully!");
    console.log(`Created ${medicalRecords.length} medical records`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding medical data:", error);
    process.exit(1);
  }
};

seedMedicalData();