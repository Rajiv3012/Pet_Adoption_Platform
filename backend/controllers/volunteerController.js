import Volunteer from "../models/Volunteer.js";
import Shelter from "../models/Shelter.js";

// Get all volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const { shelterId, status, experience } = req.query;
    
    let filter = {};
    if (shelterId) filter.shelterId = shelterId;
    if (status) filter.status = status;
    if (experience) filter.experience = experience;

    const volunteers = await Volunteer.find(filter)
      .populate('shelterId', 'name address city state')
      .sort({ createdAt: -1 });

    res.json(volunteers);
  } catch (error) {
    console.error("Get volunteers error:", error);
    res.status(500).json({ msg: "Error fetching volunteers" });
  }
};

// Get single volunteer by ID
export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .populate('shelterId', 'name address city state phone email');
    
    if (!volunteer) {
      return res.status(404).json({ msg: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (error) {
    console.error("Get volunteer error:", error);
    res.status(500).json({ msg: "Error fetching volunteer details" });
  }
};

// Get volunteers by shelter
export const getVolunteersByShelter = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ shelterId: req.params.shelterId })
      .populate('shelterId', 'name address city state')
      .sort({ createdAt: -1 });

    res.json(volunteers);
  } catch (error) {
    console.error("Get volunteers by shelter error:", error);
    res.status(500).json({ msg: "Error fetching shelter volunteers" });
  }
};

// Create new volunteer application
export const createVolunteer = async (req, res) => {
  try {
    const {
      name, email, phone, address, dateOfBirth, shelterId,
      skills, availability, experience, interests, emergencyContact
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !dateOfBirth || !shelterId) {
      return res.status(400).json({ msg: "Missing required volunteer fields" });
    }

    // Verify shelter exists
    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(400).json({ msg: "Invalid shelter ID" });
    }

    // Check if volunteer already exists with this email
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ msg: "Volunteer with this email already exists" });
    }

    const newVolunteer = new Volunteer({
      name, email, phone, address, dateOfBirth, shelterId,
      skills, availability, experience, interests, emergencyContact
    });

    const savedVolunteer = await newVolunteer.save();
    await savedVolunteer.populate('shelterId', 'name address city state');

    res.status(201).json(savedVolunteer);
  } catch (error) {
    console.error("Create volunteer error:", error);
    res.status(500).json({ msg: "Error creating volunteer application" });
  }
};

// Update volunteer (Admin only for status/background check, volunteer can update own info)
export const updateVolunteer = async (req, res) => {
  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('shelterId', 'name address city state');

    if (!updatedVolunteer) {
      return res.status(404).json({ msg: "Volunteer not found" });
    }

    res.json(updatedVolunteer);
  } catch (error) {
    console.error("Update volunteer error:", error);
    res.status(500).json({ msg: "Error updating volunteer" });
  }
};

// Update volunteer status (Admin only)
export const updateVolunteerStatus = async (req, res) => {
  try {
    const { status, backgroundCheck } = req.body;
    
    let updateData = {};
    if (status && ["active", "inactive", "suspended"].includes(status)) {
      updateData.status = status;
    }
    if (backgroundCheck && ["pending", "approved", "rejected"].includes(backgroundCheck)) {
      updateData.backgroundCheck = backgroundCheck;
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('shelterId', 'name address city state');

    if (!volunteer) {
      return res.status(404).json({ msg: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (error) {
    console.error("Update volunteer status error:", error);
    res.status(500).json({ msg: "Error updating volunteer status" });
  }
};

// Update volunteer hours (Admin only)
export const updateVolunteerHours = async (req, res) => {
  try {
    const { hoursToAdd } = req.body;
    
    if (hoursToAdd == null || hoursToAdd < 0) {
      return res.status(400).json({ msg: "Invalid hours value" });
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { $inc: { hoursCompleted: hoursToAdd } },
      { new: true }
    ).populate('shelterId', 'name address city state');

    if (!volunteer) {
      return res.status(404).json({ msg: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (error) {
    console.error("Update volunteer hours error:", error);
    res.status(500).json({ msg: "Error updating volunteer hours" });
  }
};

// Delete volunteer (Admin only)
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ msg: "Volunteer not found" });
    }

    res.json({ msg: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Delete volunteer error:", error);
    res.status(500).json({ msg: "Error deleting volunteer" });
  }
};