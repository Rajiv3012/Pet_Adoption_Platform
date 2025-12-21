import Pet from "../models/Pet.js";
import Shelter from "../models/Shelter.js";

// Get all pets with optional filtering
export const getAllPets = async (req, res) => {
  try {
    const { type, breed, age, size, shelterId, adoptionStatus } = req.query;
    
    let filter = {};
    if (type) filter.type = type;
    if (breed) filter.breed = new RegExp(breed, 'i');
    if (age) filter.age = { $lte: parseInt(age) };
    if (size) filter.size = size;
    if (shelterId) filter.shelterId = shelterId;
    if (adoptionStatus) filter.adoptionStatus = adoptionStatus;

    const pets = await Pet.find(filter).populate('shelterId', 'name address city state');
    res.json(pets);
  } catch (error) {
    console.error("Get pets error:", error);
    res.status(500).json({ msg: "Error fetching pets" });
  }
};

// Get single pet by ID
export const getPetById = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "Invalid pet ID format" });
    }

    const pet = await Pet.findById(req.params.id).populate('shelterId');
    
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    console.error("Get pet by ID error:", error);
    res.status(500).json({ msg: "Error fetching pet details" });
  }
};

// Create new pet (Admin only)
export const createPet = async (req, res) => {
  try {
    const {
      name, type, breed, age, description, image, shelterId,
      gender, size, color, weight, isVaccinated, isNeutered,
      specialNeeds, adoptionFee
    } = req.body;

    // Validate required fields
    if (!name || !type || !breed || age == null || !description || 
        !image || !shelterId || !gender || !size || !color || adoptionFee == null) {
      return res.status(400).json({ msg: "Missing required pet fields" });
    }

    // Verify shelter exists
    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(400).json({ msg: "Invalid shelter ID" });
    }

    const newPet = new Pet({
      name, type, breed, age, description, image, shelterId,
      gender, size, color, weight, isVaccinated, isNeutered,
      specialNeeds, adoptionFee
    });

    const savedPet = await newPet.save();
    await savedPet.populate('shelterId', 'name address city state');

    // Update shelter occupancy
    await Shelter.findByIdAndUpdate(shelterId, {
      $inc: { currentOccupancy: 1 }
    });

    res.status(201).json(savedPet);
  } catch (error) {
    console.error("Create pet error:", error);
    res.status(500).json({ msg: "Error creating pet" });
  }
};

// Update pet (Admin only)
export const updatePet = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('shelterId', 'name address city state');

    if (!updatedPet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    res.json(updatedPet);
  } catch (error) {
    console.error("Update pet error:", error);
    res.status(500).json({ msg: "Error updating pet" });
  }
};

// Delete pet (Admin only)
export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    // Update shelter occupancy
    await Shelter.findByIdAndUpdate(pet.shelterId, {
      $inc: { currentOccupancy: -1 }
    });

    res.json({ msg: "Pet deleted successfully" });
  } catch (error) {
    console.error("Delete pet error:", error);
    res.status(500).json({ msg: "Error deleting pet" });
  }
};

// Update adoption status
export const updateAdoptionStatus = async (req, res) => {
  try {
    const { adoptionStatus } = req.body;
    
    if (!["available", "pending", "adopted"].includes(adoptionStatus)) {
      return res.status(400).json({ msg: "Invalid adoption status" });
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { adoptionStatus },
      { new: true }
    ).populate('shelterId', 'name address city state');

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    console.error("Update adoption status error:", error);
    res.status(500).json({ msg: "Error updating adoption status" });
  }
};