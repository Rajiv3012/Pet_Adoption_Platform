import { useState, useEffect, useContext } from "react";
import { motion } from 'framer-motion';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { medicalAPI, petsAPI } from "../services/api";
import { ArrowLeft, Plus, X } from 'lucide-react';

export default function EditMedicalRecord() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    petId: "",
    recordType: "checkup",
    title: "",
    description: "",
    veterinarian: "",
    clinic: "",
    date: "",
    nextAppointment: "",
    medications: [],
    vaccinations: [],
    cost: "",
    notes: ""
  });
  
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Medication form
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: ""
  });

  // Vaccination form
  const [newVaccination, setNewVaccination] = useState({
    vaccine: "",
    dateGiven: new Date().toISOString().split('T')[0],
    nextDue: "",
    batchNumber: ""
  });

  // Check admin access
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  // Load data
  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load pets
      const petsResponse = await petsAPI.getAllPets();
      setPets(petsResponse.data);

      // Load medical record
      const recordResponse = await medicalAPI.getMedicalRecordById(id);
      const record = recordResponse.data;
      
      // Format dates for input fields
      const formattedRecord = {
        ...record,
        date: record.date ? new Date(record.date).toISOString().split('T')[0] : "",
        nextAppointment: record.nextAppointment ? new Date(record.nextAppointment).toISOString().split('T')[0] : "",
        cost: record.cost || "",
        medications: record.medications || [],
        vaccinations: record.vaccinations || []
      };

      setFormData(formattedRecord);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load medical record");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setFormData(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication]
      }));
      setNewMedication({ name: "", dosage: "", frequency: "", duration: "" });
    }
  };

  const handleRemoveMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleAddVaccination = () => {
    if (newVaccination.vaccine && newVaccination.dateGiven) {
      setFormData(prev => ({
        ...prev,
        vaccinations: [...prev.vaccinations, newVaccination]
      }));
      setNewVaccination({ vaccine: "", dateGiven: new Date().toISOString().split('T')[0], nextDue: "", batchNumber: "" });
    }
  };

  const handleRemoveVaccination = (index) => {
    setFormData(prev => ({
      ...prev,
      vaccinations: prev.vaccinations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Validate required fields
      const requiredFields = ['petId', 'recordType', 'title', 'description', 'veterinarian', 'clinic', 'date'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setSaving(false);
        return;
      }

      // Prepare data for submission
      const recordData = {
        ...formData,
        cost: parseFloat(formData.cost) || 0
      };

      await medicalAPI.updateMedicalRecord(id, recordData);
      navigate("/admin/manage-medical-records");
    } catch (error) {
      console.error("Error updating medical record:", error);
      setError(error.response?.data?.msg || "Failed to update medical record");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading medical record...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/admin/manage-medical-records")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Medical Records</span>
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Edit Medical Record</h1>
          <p className="text-gray-600 mt-1">Update medical record information</p>
        </div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pet *
                  </label>
                  <select
                    name="petId"
                    value={formData.petId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a pet</option>
                    {pets.map(pet => (
                      <option key={pet._id} value={pet._id}>
                        {pet.name} ({pet.breed})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Record Type *
                  </label>
                  <select
                    name="recordType"
                    value={formData.recordType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="checkup">Checkup</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="treatment">Treatment</option>
                    <option value="surgery">Surgery</option>
                    <option value="medication">Medication</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Annual Vaccination"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Detailed description of the medical procedure or treatment..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veterinarian *
                  </label>
                  <input
                    type="text"
                    name="veterinarian"
                    value={formData.veterinarian}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Dr. Sarah Johnson"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic *
                  </label>
                  <input
                    type="text"
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="City Animal Hospital"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Appointment
                  </label>
                  <input
                    type="date"
                    name="nextAppointment"
                    value={formData.nextAppointment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost (₹)
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>
              </div>
            </div>

            {/* Medications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Medications</h2>
              
              {formData.medications.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.medications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                      <div>
                        <div className="font-medium text-blue-900">{med.name}</div>
                        <div className="text-sm text-blue-700">
                          {med.dosage} - {med.frequency} {med.duration && `for ${med.duration}`}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedication(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Medication name"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Frequency"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newMedication.duration}
                  onChange={(e) => setNewMedication({...newMedication, duration: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={handleAddMedication}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Medication
              </button>
            </div>

            {/* Vaccinations */}
            {formData.recordType === 'vaccination' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Vaccinations</h2>
                
                {formData.vaccinations.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {formData.vaccinations.map((vac, index) => (
                      <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <div>
                          <div className="font-medium text-green-900">{vac.vaccine}</div>
                          <div className="text-sm text-green-700">
                            Given: {vac.dateGiven ? new Date(vac.dateGiven).toLocaleDateString() : 'N/A'} 
                            {vac.nextDue && ` | Next: ${new Date(vac.nextDue).toLocaleDateString()}`}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveVaccination(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Vaccine name"
                    value={newVaccination.vaccine}
                    onChange={(e) => setNewVaccination({...newVaccination, vaccine: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Date given"
                    value={newVaccination.dateGiven}
                    onChange={(e) => setNewVaccination({...newVaccination, dateGiven: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Next due"
                    value={newVaccination.nextDue}
                    onChange={(e) => setNewVaccination({...newVaccination, nextDue: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Batch number"
                    value={newVaccination.batchNumber}
                    onChange={(e) => setNewVaccination({...newVaccination, batchNumber: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddVaccination}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Vaccination
                </button>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any additional notes or observations..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/manage-medical-records")}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {saving ? "Updating..." : "Update Medical Record"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}