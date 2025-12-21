import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Users, Heart } from 'lucide-react';
import { sheltersAPI } from "../services/api";
import ShelterCard from "../components/ShelterCard";

export default function Shelters() {
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  const loadShelters = async () => {
    try {
      const res = await sheltersAPI.getAllShelters();
      setShelters(res.data);
      setFilteredShelters(res.data);
    } catch (err) {
      console.error("Error loading shelters:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadShelters();
  }, []);

  // Filter shelters based on search and filters
  useEffect(() => {
    let filtered = shelters;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(shelter =>
        shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Capacity filter
    if (capacityFilter !== 'all') {
      filtered = filtered.filter(shelter => {
        const percentage = (shelter.currentOccupancy / shelter.capacity) * 100;
        switch (capacityFilter) {
          case 'low': return percentage <= 60;
          case 'moderate': return percentage > 60 && percentage <= 85;
          case 'high': return percentage > 85;
          default: return true;
        }
      });
    }

    // City filter
    if (cityFilter !== 'all') {
      filtered = filtered.filter(shelter => shelter.city === cityFilter);
    }

    setFilteredShelters(filtered);
  }, [shelters, searchTerm, capacityFilter, cityFilter]);

  // Get unique cities for filter dropdown
  const uniqueCities = [...new Set(shelters.map(shelter => shelter.city))].sort();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading shelters...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Hero Header Section */}
      <motion.section 
        className="relative py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Partner Shelters
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            Discover verified animal shelters across the country. Each partner shelter is committed to 
            providing the highest standard of care for rescued pets while they wait for their forever homes.
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 justify-center mb-1">
                <Heart className="w-5 h-5 text-pink-600" />
                <div className="text-2xl font-bold text-pink-600">{shelters.length}</div>
              </div>
              <div className="text-gray-600 text-sm">Partner Shelters</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 justify-center mb-1">
                <Users className="w-5 h-5 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">
                  {shelters.reduce((sum, shelter) => sum + shelter.currentOccupancy, 0)}
                </div>
              </div>
              <div className="text-gray-600 text-sm">Pets in Care</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 justify-center mb-1">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">{uniqueCities.length}</div>
              </div>
              <div className="text-gray-600 text-sm">Cities Covered</div>
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search shelters by name or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={capacityFilter}
                    onChange={(e) => setCapacityFilter(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white min-w-[140px]"
                  >
                    <option value="all">All Capacity</option>
                    <option value="low">Low Capacity</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">Almost Full</option>
                  </select>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white min-w-[120px]"
                  >
                    <option value="all">All Cities</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredShelters.length} of {shelters.length} shelters
            </div>
          </div>
        </div>
      </motion.section>

      {/* Shelters Grid */}
      <motion.section 
        className="px-6 pb-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto">
          {filteredShelters.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No shelters found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || capacityFilter !== 'all' || cityFilter !== 'all' 
                  ? "Try adjusting your search or filters to find more shelters."
                  : "No shelters available right now. Please check back later."
                }
              </p>
              {(searchTerm || capacityFilter !== 'all' || cityFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCapacityFilter('all');
                    setCityFilter('all');
                  }}
                  className="bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredShelters.map((shelter, index) => (
                <motion.div
                  key={shelter._id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <ShelterCard shelter={shelter} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}