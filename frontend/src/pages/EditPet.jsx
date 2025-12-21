import { useState, useEffect, useContext } from "react";
import { motion } from 'framer-motion';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { adminAPI, sheltersAPI } from "../services/api";
import { ArrowLeft, Upload, X } from 'lucide-react';

export default function EditPet() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    gender: "male",
    size: "medium",
    color: "",
    weight: "",
    description: "",
    image: "",
    shelterId: "",
    isVaccinated: false,
    isNeutered: false,
    adoptionFee: "",
    adoptionStatus: "available"
  });
  
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  // Check admin access
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  // Load pet data and shelters
  useEffect(() => {
    loadPetData();
    loadShelters();
  }, [id]);

  const loadPetData = async () => {
    try {
      setLoadingData(true);
      const response = await adminAPI.getAllPets();
      const pet = response.data.pets.find(p => p._id === id);
      
      if (!pet) {
        setError("Pet not found");
        return;
      }
      
      setFormData({
        name: pet.name || "",
        type: pet.type || "Dog",
        breed: pet.breed || "",
        age: pet.age?.toString() || "",
        gender: pet.gender || "male",
        size: pet.size || "medium",
        color: pet.color || "",
        weight: pet.weight?.toString() || "",
        description: pet.description || "",
        image: pet.image || "",
        shelterId: pet.shelterId?._id || pet.shelterId || "",
        isVaccinated: pet.isVaccinated || false,
        isNeutered: pet.isNeutered || false,
        adoptionFee: pet.adoptionFee?.toString() || "",
        adoptionStatus: pet.adoptionStatus || "available"
      });
    } catch (error) {
      console.error("Error loading pet:", error);
      setError("Failed to load pet data");
    } finally {
      setLoadingData(false);
    }
  };

  const loadShelters = async () => {
    try {
      const response = await sheltersAPI.getAllShelters();
      setShelters(response.data);
    } catch (error) {
      console.error("Error loading shelters:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      const requiredFields = ['name', 'type', 'breed', 'age', 'gender', 'size', 'color', 'description', 'shelterId', 'adoptionFee'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      // Prepare data for submission
      const petData = {
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight) || 0,
        adoptionFee: parseFloat(formData.adoptionFee)
      };

      await adminAPI.updatePet(id, petData);
      navigate("/admin/manage-pets");
    } catch (error) {
      console.error("Error updating pet:", error);
      setError(error.response?.data?.message || "Failed to update pet");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pet data...</p>
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
              onClick={() => navigate("/admin/manage-pets")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Manage Pets</span>
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Edit Pet</h1>
          <p className="text-gray-600 mt-1">Update pet information and details</p>
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
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Buddy"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Breed *
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Golden Retriever"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age (years) *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="3"
                    min="0"
                    max="30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color *
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Golden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="65"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Tell us about this pet's personality, behavior, and any special needs..."
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="https://example.com/pet-image.jpg"
              />
              {formData.image && (
                <div className="mt-4">
                  <img 
                    src={formData.image} 
                    alt="Pet preview" 
                    className="w-32 h-32 object-cover rounded-xl border border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Shelter and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shelter *
                </label>
                <select
                  name="shelterId"
                  value={formData.shelterId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a shelter</option>
                  {shelters.map(shelter => (
                    <option key={shelter._id} value={shelter._id}>
                      {shelter.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adoption Status *
                </label>
                <select
                  name="adoptionStatus"
                  value={formData.adoptionStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="adopted">Adopted</option>
                </select>
              </div>
            </div>

            {/* Health and Adoption Fee */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isVaccinated"
                  checked={formData.isVaccinated}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Vaccinated
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isNeutered"
                  checked={formData.isNeutered}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Spayed/Neutered
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adoption Fee (₹) *
                </label>
                <input
                  type="number"
                  name="adoptionFee"
                  value={formData.adoptionFee}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="250"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/manage-pets")}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Pet"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}