import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  googleLogin: (googleData) => api.post("/auth/google", googleData),
  getProfile: () => api.get("/auth/profile"),
};

// Pets API
export const petsAPI = {
  getAllPets: (filters = {}) => api.get("/pets", { params: filters }),
  getPetById: (id) => api.get(`/pets/${id}`),
  createPet: (petData) => api.post("/pets", petData),
  updatePet: (id, petData) => api.put(`/pets/${id}`, petData),
  deletePet: (id) => api.delete(`/pets/${id}`),
  updateAdoptionStatus: (id, status) => 
    api.patch(`/pets/${id}/adoption-status`, { adoptionStatus: status }),
};

// Shelters API
export const sheltersAPI = {
  getAllShelters: () => api.get("/shelters"),
  getShelterById: (id) => api.get(`/shelters/${id}`),
  getPetsByShelter: (id) => api.get(`/shelters/${id}/pets`),
  createShelter: (shelterData) => api.post("/shelters", shelterData),
  updateShelter: (id, shelterData) => api.put(`/shelters/${id}`, shelterData),
  deleteShelter: (id) => api.delete(`/shelters/${id}`),
};

// Medical Records API
export const medicalAPI = {
  getMedicalRecordsByPet: (petId) => api.get(`/medical/pet/${petId}`),
  getMedicalRecordById: (id) => api.get(`/medical/${id}`),
  getVaccinationHistory: (petId) => api.get(`/medical/pet/${petId}/vaccinations`),
  createMedicalRecord: (recordData) => api.post("/medical", recordData),
  updateMedicalRecord: (id, recordData) => api.put(`/medical/${id}`, recordData),
  deleteMedicalRecord: (id) => api.delete(`/medical/${id}`),
};

// Donations API
export const donationsAPI = {
  getAllDonations: (filters = {}) => api.get("/donations", { params: filters }),
  getDonationById: (id) => api.get(`/donations/${id}`),
  getDonationStats: () => api.get("/donations/stats"),
  createDonation: (donationData) => api.post("/donations", donationData),
  updateDonationStatus: (id, status) => 
    api.patch(`/donations/${id}/status`, { paymentStatus: status }),
};

// Volunteers API
export const volunteersAPI = {
  getAllVolunteers: (filters = {}) => api.get("/volunteers", { params: filters }),
  getVolunteerById: (id) => api.get(`/volunteers/${id}`),
  getVolunteersByShelter: (shelterId) => api.get(`/volunteers/shelter/${shelterId}`),
  createVolunteer: (volunteerData) => api.post("/volunteers", volunteerData),
  updateVolunteer: (id, volunteerData) => api.put(`/volunteers/${id}`, volunteerData),
  updateVolunteerStatus: (id, statusData) => 
    api.patch(`/volunteers/${id}/status`, statusData),
  updateVolunteerHours: (id, hoursToAdd) => 
    api.patch(`/volunteers/${id}/hours`, { hoursToAdd }),
  deleteVolunteer: (id) => api.delete(`/volunteers/${id}`),
};

// Payment API (Razorpay)
export const paymentAPI = {
  createOrder: (orderData) => api.post("/payments/create-order", orderData),
  verifyPayment: (paymentData) => api.post("/payments/verify-payment", paymentData),
  handlePaymentFailure: (failureData) => api.post("/payments/payment-failure", failureData),
  getPaymentDetails: (paymentId) => api.get(`/payments/payment/${paymentId}`),
};

// Admin API
export const adminAPI = {
  // Pet management
  getAllPets: () => api.get("/admin/pets"),
  createPet: (petData) => api.post("/admin/pets", petData),
  updatePet: (id, petData) => api.put(`/admin/pets/${id}`, petData),
  deletePet: (id) => api.delete(`/admin/pets/${id}`),
  
  // Shelter management
  getAllShelters: () => api.get("/admin/shelters"),
  
  // Dashboard stats
  getStats: () => api.get("/admin/stats"),
};

export default api;