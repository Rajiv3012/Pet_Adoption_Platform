import MedicalRecord from "../models/MedicalRecord.js";
import Pet from "../models/Pet.js";

// Get all medical records for a pet
export const getMedicalRecordsByPet = async (req, res) => {
  try {
    const { petId } = req.params;
    
    // Verify pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    const records = await MedicalRecord.find({ petId })
      .populate('petId', 'name type breed')
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    console.error("Get medical records error:", error);
    res.status(500).json({ msg: "Error fetching medical records" });
  }
};

// Get single medical record
export const getMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('petId', 'name type breed');
    
    if (!record) {
      return res.status(404).json({ msg: "Medical record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error("Get medical record error:", error);
    res.status(500).json({ msg: "Error fetching medical record" });
  }
};

// Create new medical record (Admin only)
export const createMedicalRecord = async (req, res) => {
  try {
    const {
      petId, recordType, title, description, veterinarian, clinic, date,
      nextAppointment, medications, vaccinations, cost, notes, attachments
    } = req.body;

    // Validate required fields
    if (!petId || !recordType || !title || !description || !veterinarian || !clinic || !date) {
      return res.status(400).json({ msg: "Missing required medical record fields" });
    }

    // Verify pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(400).json({ msg: "Invalid pet ID" });
    }

    const newRecord = new MedicalRecord({
      petId, recordType, title, description, veterinarian, clinic, date,
      nextAppointment, medications, vaccinations, cost, notes, attachments
    });

    const savedRecord = await newRecord.save();
    await savedRecord.populate('petId', 'name type breed');

    res.status(201).json(savedRecord);
  } catch (error) {
    console.error("Create medical record error:", error);
    res.status(500).json({ msg: "Error creating medical record" });
  }
};

// Update medical record (Admin only)
export const updateMedicalRecord = async (req, res) => {
  try {
    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('petId', 'name type breed');

    if (!updatedRecord) {
      return res.status(404).json({ msg: "Medical record not found" });
    }

    res.json(updatedRecord);
  } catch (error) {
    console.error("Update medical record error:", error);
    res.status(500).json({ msg: "Error updating medical record" });
  }
};

// Delete medical record (Admin only)
export const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);
    
    if (!record) {
      return res.status(404).json({ msg: "Medical record not found" });
    }

    res.json({ msg: "Medical record deleted successfully" });
  } catch (error) {
    console.error("Delete medical record error:", error);
    res.status(500).json({ msg: "Error deleting medical record" });
  }
};

// Get vaccination history for a pet
export const getVaccinationHistory = async (req, res) => {
  try {
    const { petId } = req.params;
    
    const records = await MedicalRecord.find({ 
      petId, 
      recordType: "vaccination" 
    }).sort({ date: -1 });

    // Extract vaccination details
    const vaccinations = records.reduce((acc, record) => {
      if (record.vaccinations && record.vaccinations.length > 0) {
        acc.push(...record.vaccinations.map(vac => ({
          ...vac.toObject(),
          recordId: record._id,
          recordDate: record.date,
          veterinarian: record.veterinarian,
          clinic: record.clinic
        })));
      }
      return acc;
    }, []);

    res.json(vaccinations);
  } catch (error) {
    console.error("Get vaccination history error:", error);
    res.status(500).json({ msg: "Error fetching vaccination history" });
  }
};