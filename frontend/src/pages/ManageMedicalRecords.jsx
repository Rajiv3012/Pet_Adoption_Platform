import { useState, useEffect, useContext } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { medicalAPI, petsAPI } from "../services/api";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Stethoscope, 
  Syringe, 
  Pill, 
  Activity, 
  FileText,
  Calendar,
  User,
  MapPin
} from 'lucide-react';

export default function ManageMedicalRecords() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [pets, setPets] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Check admin access
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  // Filter records
  useEffect(() => {
    filterRecords();
  }, [medicalRecords, searchTerm, selectedPet]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load pets first
      const petsResponse = await petsAPI.getAllPets();
      const petsData = petsResponse.data;
      setPets(petsData);

      // Load medical records for all pets
      const allRecords = [];
      for (const pet of petsData) {
        try {
          const recordsResponse = await medicalAPI.getMedicalRecordsByPet(pet._id);
          const petRecords = recordsResponse.data.map(record => ({
            ...record,
            petInfo: pet
          }));
          allRecords.push(...petRecords);
        } catch (error) {
          console.log(`No medical records for pet ${pet.name}`);
        }
      }

      setMedicalRecords(allRecords);
      setFilteredRecords(allRecords);
    } catch (error) {
      console.error("Error loading medical records:", error);
      setError("Failed to load medical records");
    } finally {
      setLoading(false);
    }
  };

  const filterRecords = () => {
    let filtered = medicalRecords;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.petInfo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.recordType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Pet filter
    if (selectedPet !== 'all') {
      filtered = filtered.filter(record => record.petInfo?._id === selectedPet);
    }

    setFilteredRecords(filtered);
  };

  const handleDeleteRecord = async () => {
    if (!recordToDelete) return;
    
    try {
      setDeleting(true);
      await medicalAPI.deleteMedicalRecord(recordToDelete._id);
      setMedicalRecords(prev => prev.filter(record => record._id !== recordToDelete._id));
      setShowDeleteModal(false);
      setRecordToDelete(null);
    } catch (error) {
      console.error("Error deleting medical record:", error);
      setError("Failed to delete medical record");
    } finally {
      setDeleting(false);
    }
  };

  const getRecordTypeIcon = (type) => {
    switch (type) {
      case 'vaccination': return Syringe;
      case 'checkup': return Stethoscope;
      case 'treatment': return Pill;
      case 'surgery': return Activity;
      case 'medication': return Pill;
      default: return FileText;
    }
  };

  const getRecordTypeColor = (type) => {
    switch (type) {
      case 'vaccination': return 'bg-green-100 text-green-800';
      case 'checkup': return 'bg-blue-100 text-blue-800';
      case 'treatment': return 'bg-yellow-100 text-yellow-800';
      case 'surgery': return 'bg-red-100 text-red-800';
      case 'medication': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading medical records...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Manage Medical Records</h1>
              <p className="text-gray-600 mt-1">View, edit, and manage pet medical records</p>
            </div>
            
            <button
              onClick={() => navigate("/admin/add-medical-record")}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add Medical Record
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by pet name, record type, or veterinarian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Pet Filter */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedPet}
                  onChange={(e) => setSelectedPet(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white min-w-[140px]"
                >
                  <option value="all">All Pets</option>
                  {pets.map(pet => (
                    <option key={pet._id} value={pet._id}>{pet.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredRecords.length} of {medicalRecords.length} medical records
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Medical Records Grid */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchTerm || selectedPet !== 'all' ? "No records found" : "No medical records yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedPet !== 'all' 
                ? "Try adjusting your search or filters"
                : "Get started by adding your first medical record"
              }
            </p>
            {!searchTerm && selectedPet === 'all' && (
              <button
                onClick={() => navigate("/admin/add-medical-record")}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Add First Medical Record
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRecords.map((record, index) => {
              const RecordIcon = getRecordTypeIcon(record.recordType);
              
              return (
                <motion.div
                  key={record._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <RecordIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{record.petInfo?.name}</h3>
                          <p className="text-sm text-gray-600">{record.petInfo?.breed}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRecordTypeColor(record.recordType)}`}>
                        {record.recordType}
                      </span>
                    </div>

                    {/* Record Details */}
                    <div className="space-y-3 mb-4">
                      <h4 className="font-semibold text-gray-900">{record.title}</h4>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{formatDate(record.date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Dr. {record.veterinarian}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{record.clinic}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                        {record.description}
                      </p>
                    </div>

                    {/* Cost */}
                    {record.cost && (
                      <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-600">Cost</span>
                        <span className="text-lg font-bold text-green-600">₹{record.cost}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/admin/edit-medical-record/${record._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      
                      <button
                        onClick={() => {
                          setRecordToDelete(record);
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
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Medical Record</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this medical record for "{recordToDelete?.petInfo?.name}"? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setRecordToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRecord}
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