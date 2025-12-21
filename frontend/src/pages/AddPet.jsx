import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { adminAPI } from "../services/api";

export default function AddPet() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    description: "",
    image: "",
    shelterId: "",
    gender: "",
    size: "",
    color: "",
    weight: "",
    isVaccinated: false,
    isNeutered: false,
    specialNeeds: "",
    adoptionFee: ""
  });

  // Redirect if not admin - improved logic to prevent continuous reloading
  useEffect(() => {
    const checkAuth = () => {
      if (authChecked) return;

      if (user !== null) {
        if (user.role !== "admin") {
          navigate("/");
          return;
        }
        setAuthChecked(true);
        return;
      }

      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        
        if (!storedUser || !storedToken) {
          navigate("/login");
          return;
        }
        
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== "admin") {
          navigate("/");
          return;
        }
        
        setAuthChecked(true);
      } catch (error) {
        console.error("Error checking auth:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [user, navigate, authChecked]);

  // Fetch shelters for dropdown - only run when auth is confirmed
  useEffect(() => {
    if (!authChecked) return;

    const fetchShelters = async () => {
      try {
        const response = await adminAPI.getAllShelters();
        setShelters(response.data.shelters || []);
      } catch (error) {
        console.error("Error fetching shelters:", error);
        setError("Failed to load shelters");
      }
    };

    fetchShelters();
  }, [authChecked]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      const requiredFields = ["name", "type", "breed", "age", "description", "image", "shelterId", "gender", "size", "color", "adoptionFee"];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
        setLoading(false);
        return;
      }

      // Convert numeric fields
      const petData = {
        ...formData,
        age: parseInt(formData.age),
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        adoptionFee: parseFloat(formData.adoptionFee)
      };

      const response = await adminAPI.createPet(petData);
      
      setSuccess("Pet added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        type: "",
        breed: "",
        age: "",
        description: "",
        image: "",
        shelterId: "",
        gender: "",
        size: "",
        color: "",
        weight: "",
        isVaccinated: false,
        isNeutered: false,
        specialNeeds: "",
        adoptionFee: ""
      });

      // Redirect to admin dashboard after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);

    } catch (error) {
      console.error("Error adding pet:", error);
      setError(error.response?.data?.msg || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Admin Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Pet</h1>
          <p className="text-gray-600">Fill in the details to add a new pet to the adoption platform</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter pet name"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select pet type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter breed"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter age"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select gender</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select size</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter color"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter weight"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Shelter and Image */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shelter & Image</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shelter *
                  </label>
                  <select
                    name="shelterId"
                    value={formData.shelterId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select shelter</option>
                    {shelters.map((shelter) => (
                      <option key={shelter._id} value={shelter._id}>
                        {shelter.name}{shelter.city && shelter.state ? ` - ${shelter.city}, ${shelter.state}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter image URL"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Neutered/Spayed
                  </label>
                </div>
              </div>
            </div>

            {/* Description and Special Needs */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Describe the pet's personality, behavior, and any other relevant information"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Needs
                  </label>
                  <textarea
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Any special care requirements or medical conditions"
                  />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter adoption fee"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding Pet...
                  </div>
                ) : (
                  "Add Pet"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}