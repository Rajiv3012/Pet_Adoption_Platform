import { useState, useEffect, useContext } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { sheltersAPI } from "../services/api";
import { Plus, Edit, Trash2, MapPin, Phone, Mail, Users, ArrowLeft, Search } from 'lucide-react';

export default function ManageShelters() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shelterToDelete, setShelterToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Check admin access
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  // Load shelters
  useEffect(() => {
    loadShelters();
  }, []);

  // Filter shelters based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = shelters.filter(shelter =>
        shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShelters(filtered);
    } else {
      setFilteredShelters(shelters);
    }
  }, [shelters, searchTerm]);

  const loadShelters = async () => {
    try {
      setLoading(true);
      const response = await sheltersAPI.getAllShelters();
      setShelters(response.data);
      setFilteredShelters(response.data);
    } catch (error) {
      console.error("Error loading shelters:", error);
      setError("Failed to load shelters");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShelter = async () => {
    if (!shelterToDelete) return;
    
    try {
      setDeleting(true);
      await sheltersAPI.deleteShelter(shelterToDelete._id);
      setShelters(prev => prev.filter(shelter => shelter._id !== shelterToDelete._id));
      setShowDeleteModal(false);
      setShelterToDelete(null);
    } catch (error) {
      console.error("Error deleting shelter:", error);
      setError("Failed to delete shelter");
    } finally {
      setDeleting(false);
    }
  };

  const getCapacityStatus = (shelter) => {
    const percentage = (shelter.currentOccupancy / shelter.capacity) * 100;
    if (percentage <= 60) return { label: 'Low', color: 'bg-green-100 text-green-800' };
    if (percentage <= 85) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'High', color: 'bg-red-100 text-red-800' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shelters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Shelters</h1>
              <p className="text-gray-600 mt-1">Add, edit, and manage shelter locations</p>
            </div>
            
            <button
              onClick={() => navigate("/admin/add-shelter")}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add New Shelter
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search shelters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Shelters Grid */}
        {filteredShelters.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchTerm ? "No shelters found" : "No shelters yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? "Try adjusting your search terms"
                : "Get started by adding your first shelter location"
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate("/admin/add-shelter")}
                className="bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-colors"
              >
                Add First Shelter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredShelters.map((shelter, index) => {
              const status = getCapacityStatus(shelter);
              const capacityPercentage = (shelter.currentOccupancy / shelter.capacity) * 100;
              
              return (
                <motion.div
                  key={shelter._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{shelter.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                        {status.label} Capacity
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        {shelter.address}, {shelter.city}, {shelter.state} {shelter.zipCode}
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{shelter.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{shelter.email}</span>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Capacity</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {shelter.currentOccupancy}/{shelter.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-full rounded-full ${
                            capacityPercentage <= 60 ? 'bg-green-500' :
                            capacityPercentage <= 85 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${capacityPercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(capacityPercentage)}% occupied
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/admin/edit-shelter/${shelter._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      
                      <button
                        onClick={() => {
                          setShelterToDelete(shelter);
                          setShowDeleteModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Shelter</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{shelterToDelete?.name}"? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setShelterToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteShelter}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}