import Shelter from "../models/Shelter.js";
import Pet from "../models/Pet.js";

// Get all shelters
export const getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (error) {
    console.error("Get shelters error:", error);
    res.status(500).json({ msg: "Error fetching shelters" });
  }
};

// Get single shelter by ID
export const getShelterById = async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id);
    
    if (!shelter) {
      return res.status(404).json({ msg: "Shelter not found" });
    }

    // Get pets count for this shelter
    const petsCount = await Pet.countDocuments({ shelterId: shelter._id });
    const availablePets = await Pet.countDocuments({ 
      shelterId: shelter._id, 
      adoptionStatus: "available" 
    });

    res.json({
      ...shelter.toObject(),
      petsCount,
      availablePets
    });
  } catch (error) {
    console.error("Get shelter by ID error:", error);
    res.status(500).json({ msg: "Error fetching shelter details" });
  }
};

// Get pets by shelter ID
export const getPetsByShelter = async (req, res) => {
  try {
    const pets = await Pet.find({ shelterId: req.params.id })
      .populate('shelterId', 'name address city state');
    
    res.json(pets);
  } catch (error) {
    console.error("Get pets by shelter error:", error);
    res.status(500).json({ msg: "Error fetching shelter pets" });
  }
};

// Create new shelter (Admin only)
export const createShelter = async (req, res) => {
  try {
    const {
      name, address, city, state, zipCode, phone, email, capacity,
      coordinates, operatingHours
    } = req.body;

    // Validate required fields
    if (!name || !address || !city || !state || !zipCode || !phone || !email || capacity == null) {
      return res.status(400).json({ msg: "Missing required shelter fields" });
    }

    const newShelter = new Shelter({
      name, address, city, state, zipCode, phone, email, capacity,
      coordinates, operatingHours
    });

    const savedShelter = await newShelter.save();
    res.status(201).json(savedShelter);
  } catch (error) {
    console.error("Create shelter error:", error);
    res.status(500).json({ msg: "Error creating shelter" });
  }
};

// Update shelter (Admin only)
export const updateShelter = async (req, res) => {
  try {
    const updatedShelter = await Shelter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedShelter) {
      return res.status(404).json({ msg: "Shelter not found" });
    }

    res.json(updatedShelter);
  } catch (error) {
    console.error("Update shelter error:", error);
    res.status(500).json({ msg: "Error updating shelter" });
  }
};

// Delete shelter (Admin only)
export const deleteShelter = async (req, res) => {
  try {
    // Check if shelter has pets
    const petsCount = await Pet.countDocuments({ shelterId: req.params.id });
    if (petsCount > 0) {
      return res.status(400).json({ 
        msg: "Cannot delete shelter with existing pets. Please relocate pets first." 
      });
    }

    const shelter = await Shelter.findByIdAndDelete(req.params.id);
    
    if (!shelter) {
      return res.status(404).json({ msg: "Shelter not found" });
    }

    res.json({ msg: "Shelter deleted successfully" });
  } catch (error) {
    console.error("Delete shelter error:", error);
    res.status(500).json({ msg: "Error deleting shelter" });
  }
};