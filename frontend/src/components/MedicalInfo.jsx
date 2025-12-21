import { useState, useEffect } from "react";
import { medicalAPI } from "../services/api";

export default function MedicalInfo({ petId, petName }) {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("records");

  useEffect(() => {
    if (petId) {
      loadMedicalData();
    }
  }, [petId]);

  const loadMedicalData = async () => {
    try {
      setLoading(true);
      const [recordsRes, vaccinationsRes] = await Promise.all([
        medicalAPI.getMedicalRecordsByPet(petId),
        medicalAPI.getVaccinationHistory(petId)
      ]);
      
      setMedicalRecords(recordsRes.data);
      setVaccinations(vaccinationsRes.data);
    } catch (error) {
      console.error("Error loading medical data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRecordTypeIcon = (type) => {
    const icons = {
      vaccination: "💉",
      treatment: "🏥",
      checkup: "🩺",
      surgery: "⚕️",
      medication: "💊"
    };
    return icons[type] || "📋";
  };

  const getRecordTypeColor = (type) => {
    const colors = {
      vaccination: "bg-green-100 text-green-800",
      treatment: "bg-pink-100 text-pink-800",
      checkup: "bg-purple-100 text-purple-800",
      surgery: "bg-red-100 text-red-800",
      medication: "bg-yellow-100 text-yellow-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-pink-600 text-white p-6">
        <h3 className="text-xl font-bold">Medical Information</h3>
        <p className="text-pink-100 mt-1">Health records for {petName}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("records")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "records"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Medical Records ({medicalRecords.length})
          </button>
          <button
            onClick={() => setActiveTab("vaccinations")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "vaccinations"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Vaccinations ({vaccinations.length})
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "records" && (
          <div className="space-y-4">
            {medicalRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📋</div>
                <p>No medical records available</p>
              </div>
            ) : (
              medicalRecords.map((record) => (
                <div key={record._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getRecordTypeIcon(record.recordType)}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{record.title}</h4>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRecordTypeColor(record.recordType)}`}>
                          {record.recordType.charAt(0).toUpperCase() + record.recordType.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{formatDate(record.date)}</p>
                      {record.cost > 0 && <p className="font-medium">₹{record.cost}</p>}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{record.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Veterinarian:</span>
                      <p className="text-gray-800">{record.veterinarian}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Clinic:</span>
                      <p className="text-gray-800">{record.clinic}</p>
                    </div>
                  </div>

                  {record.nextAppointment && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        <span className="font-medium">Next Appointment:</span> {formatDate(record.nextAppointment)}
                      </p>
                    </div>
                  )}

                  {record.medications && record.medications.length > 0 && (
                    <div className="mt-3">
                      <h5 className="font-medium text-gray-700 mb-2">Medications:</h5>
                      <div className="space-y-2">
                        {record.medications.map((med, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                            <span className="font-medium">{med.name}</span>
                            {med.dosage && <span className="text-gray-600"> - {med.dosage}</span>}
                            {med.frequency && <span className="text-gray-600"> ({med.frequency})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.notes && (
                    <div className="mt-3 p-3 bg-pink-50 border border-pink-200 rounded-md">
                      <p className="text-sm text-pink-800">
                        <span className="font-medium">Notes:</span> {record.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "vaccinations" && (
          <div className="space-y-4">
            {vaccinations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">💉</div>
                <p>No vaccination records available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vaccinations.map((vaccination, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{vaccination.vaccine}</h4>
                      <span className="text-2xl">💉</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Date Given:</span>
                        <p className="text-gray-800">{formatDate(vaccination.dateGiven)}</p>
                      </div>

                      {vaccination.nextDue && (
                        <div>
                          <span className="font-medium text-gray-600">Next Due:</span>
                          <p className="text-gray-800">{formatDate(vaccination.nextDue)}</p>
                        </div>
                      )}

                      {vaccination.batchNumber && (
                        <div>
                          <span className="font-medium text-gray-600">Batch Number:</span>
                          <p className="text-gray-800">{vaccination.batchNumber}</p>
                        </div>
                      )}

                      <div>
                        <span className="font-medium text-gray-600">Veterinarian:</span>
                        <p className="text-gray-800">{vaccination.veterinarian}</p>
                      </div>

                      <div>
                        <span className="font-medium text-gray-600">Clinic:</span>
                        <p className="text-gray-800">{vaccination.clinic}</p>
                      </div>
                    </div>

                    {vaccination.nextDue && new Date(vaccination.nextDue) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                      <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-md">
                        <p className="text-xs text-orange-800 font-medium">
                          ⚠️ Due for renewal within 30 days
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
