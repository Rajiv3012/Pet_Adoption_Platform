import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export default function ShelterCard({ shelter }) {
  // Calculate capacity percentage and status
  const capacityPercentage = (shelter.currentOccupancy / shelter.capacity) * 100;
  
  const getCapacityStatus = () => {
    if (capacityPercentage <= 60) return { label: 'Low Capacity', color: 'bg-green-100 text-green-800', barColor: 'bg-green-500' };
    if (capacityPercentage <= 85) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800', barColor: 'bg-yellow-500' };
    return { label: 'Almost Full', color: 'bg-red-100 text-red-800', barColor: 'bg-red-500' };
  };

  const status = getCapacityStatus();

  const handleViewPets = () => {
    // Navigate to pets page with shelter filter
    window.location.href = `/pets?shelter=${encodeURIComponent(shelter.name)}`;
  };

  const handleContactShelter = () => {
    // Open email client
    window.location.href = `mailto:${shelter.email}`;
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
            {shelter.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-gray-600 text-sm leading-relaxed">
            {shelter.address}, {shelter.city}, {shelter.state} {shelter.zipCode}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          <a 
            href={`tel:${shelter.phone}`}
            className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition-colors duration-200 group/phone"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium group-hover/phone:underline">{shelter.phone}</span>
          </a>
          
          <a 
            href={`mailto:${shelter.email}`}
            className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition-colors duration-200 group/email"
          >
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium group-hover/email:underline">{shelter.email}</span>
          </a>
        </div>

        {/* Operating Hours */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <h4 className="font-semibold text-gray-700 text-sm">Operating Hours</h4>
          </div>
          <div className="text-xs text-gray-600 space-y-1 ml-6">
            <p>
              <span className="font-medium text-gray-700">Mon-Fri:</span> {shelter.operatingHours?.monday || "9:00 AM - 5:00 PM"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Weekends:</span> {shelter.operatingHours?.saturday || "10:00 AM - 4:00 PM"}
            </p>
          </div>
        </div>

        {/* Capacity Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Capacity</span>
            <span className="text-sm text-gray-600">
              {shelter.currentOccupancy}/{shelter.capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${status.barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${capacityPercentage}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
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
          <motion.button
            onClick={handleViewPets}
            className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            View Pets
          </motion.button>
          
          <motion.button
            onClick={handleContactShelter}
            className="flex-1 border-2 border-pink-600 text-pink-600 py-3 px-4 rounded-xl font-semibold text-sm hover:bg-pink-50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Shelter
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}