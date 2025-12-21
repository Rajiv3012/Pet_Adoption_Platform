import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Stethoscope, 
  Heart, 
  Shield, 
  Activity, 
  FileText,
  Syringe,
  Pill,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  User
} from 'lucide-react';
import { medicalAPI, petsAPI } from "../services/api";

export default function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [pets, setPets] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedPet, setSelectedPet] = useState('all');

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  // Filter records
  useEffect(() => {
    filterRecords();
  }, [medicalRecords, searchTerm, filterType, selectedPet]);

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
          // Pet might not have medical records yet
          console.log(`No medical records for pet ${pet.name}`);
        }
      }

      setMedicalRecords(allRecords);
      setFilteredRecords(allRecords);
    } catch (error) {
      console.error("Error loading medical records:", error);
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
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(record => record.recordType === filterType);
    }

    // Pet filter
    if (selectedPet !== 'all') {
      filtered = filtered.filter(record => record.petInfo?._id === selectedPet);
    }

    setFilteredRecords(filtered);
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
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-xl font-semibold text-gray-700">Loading medical records...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Title */}
          <motion.div
            variants={typewriterVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            {"Medical Records".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                style={{
                  background: "linear-gradient(90deg, #2563EB, #059669, #DC2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            Comprehensive health records for all pets in our care. Track vaccinations, treatments, 
            checkups, and medical history to ensure the best possible care for our furry friends.
          </motion.p>

          {/* Floating Medical Icons */}
          <motion.div className="flex justify-center gap-8 mb-8">
            {[Stethoscope, Heart, Syringe, Shield].map((Icon, index) => (
              <motion.div
                key={index}
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.5}s` }}
                className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
              >
                <Icon className="w-8 h-8 text-blue-600" />
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">{medicalRecords.length}</div>
              <div className="text-gray-600">Total Records</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600">
                {medicalRecords.filter(r => r.recordType === 'vaccination').length}
              </div>
              <div className="text-gray-600">Vaccinations</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">{pets.length}</div>
              <div className="text-gray-600">Pets Monitored</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.section 
        className="px-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]"
                  >
                    <option value="all">All Types</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="checkup">Checkup</option>
                    <option value="treatment">Treatment</option>
                    <option value="surgery">Surgery</option>
                    <option value="medication">Medication</option>
                  </select>
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={selectedPet}
                    onChange={(e) => setSelectedPet(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]"
                  >
                    <option value="all">All Pets</option>
                    {pets.map(pet => (
                      <option key={pet._id} value={pet._id}>{pet.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredRecords.length} of {medicalRecords.length} medical records
            </div>
          </div>
        </div>
      </motion.section>

      {/* Medical Records Grid */}
      <motion.section 
        className="px-6 pb-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto">
          {filteredRecords.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No medical records found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterType !== 'all' || selectedPet !== 'all' 
                  ? "Try adjusting your search or filters to find more records."
                  : "No medical records available yet. Records will appear here as pets receive medical care."
                }
              </p>
              {(searchTerm || filterType !== 'all' || selectedPet !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setSelectedPet('all');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecords.map((record, index) => {
                const RecordIcon = getRecordTypeIcon(record.recordType);
                
                return (
                  <motion.div
                    key={record._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                    }}
                  >
                    {/* Card Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
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

                        {record.nextAppointment && (
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-600">
                              Next: {formatDate(record.nextAppointment)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {record.description}
                        </p>
                      </div>

                      {/* Medications */}
                      {record.medications && record.medications.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Pill className="w-4 h-4" />
                            Medications
                          </h4>
                          <div className="space-y-2">
                            {record.medications.map((med, idx) => (
                              <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                                <div className="font-medium text-blue-900">{med.name}</div>
                                <div className="text-sm text-blue-700">
                                  {med.dosage} - {med.frequency}
                                  {med.duration && ` for ${med.duration}`}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Vaccinations */}
                      {record.vaccinations && record.vaccinations.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Syringe className="w-4 h-4" />
                            Vaccinations
                          </h4>
                          <div className="space-y-2">
                            {record.vaccinations.map((vac, idx) => (
                              <div key={idx} className="bg-green-50 p-3 rounded-lg">
                                <div className="font-medium text-green-900">{vac.vaccine}</div>
                                <div className="text-sm text-green-700">
                                  Given: {formatDate(vac.dateGiven)}
                                  {vac.nextDue && ` | Next: ${formatDate(vac.nextDue)}`}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cost */}
                      {record.cost && (
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-600">Cost</span>
                          <span className="text-lg font-bold text-green-600">₹{record.cost}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}