import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { adminAPI } from "../services/api";

export default function ManagePets() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

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

  // Fetch pets - only run when auth is confirmed
  useEffect(() => {
    if (!authChecked) return;

    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getAllPets();
        setPets(response.data.pets || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Failed to load pets");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [authChecked]);

  const handleDeletePet = async (petId, petName) => {
    if (!window.confirm(`Are you sure you want to delete ${petName}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleteLoading(petId);
      await adminAPI.deletePet(petId);
      setPets(pets.filter(pet => pet._id !== petId));
    } catch (error) {
      console.error("Error deleting pet:", error);
      alert("Failed to delete pet. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Pets</h1>
              <p className="text-gray-600">View, edit, and delete pets in the system</p>
            </div>
            <button
              onClick={() => navigate("/admin/add-pet")}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
            >
              Add New Pet
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Pets Grid */}
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <img 
                  src={pet.image} 
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                      <p className="text-gray-600">{pet.breed} • {pet.age} years old</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pet.adoptionStatus === 'available' ? 'bg-green-100 text-green-800' :
                      pet.adoptionStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {pet.adoptionStatus}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gender:</span>
                      <span className="text-gray-900 capitalize">{pet.gender}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-900 capitalize">{pet.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Color:</span>
                      <span className="text-gray-900">{pet.color}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Adoption Fee:</span>
                      <span className="text-gray-900 font-medium">₹{pet.adoptionFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shelter:</span>
                      <span className="text-gray-900">{pet.shelterId?.name}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/admin/edit-pet/${pet._id}`)}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/pets/${pet._id}`)}
                      className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeletePet(pet._id, pet.name)}
                      disabled={deleteLoading === pet._id}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteLoading === pet._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No pets found</h3>
            <p className="text-gray-600 mb-6">Start by adding your first pet to the platform</p>
            <button
              onClick={() => navigate("/admin/add-pet")}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
            >
              Add New Pet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}