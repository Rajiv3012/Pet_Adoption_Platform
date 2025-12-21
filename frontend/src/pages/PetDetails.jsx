import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { petsAPI } from "../services/api";
import api from "../services/api";
import MedicalInfo from "../components/MedicalInfo";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adoptOpen, setAdoptOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        console.log("Fetching pet with ID:", id);
        const res = await petsAPI.getPetById(id);
        console.log("Pet data received:", res.data);
        setPet(res.data);
      } catch (err) {
        console.error("Error loading pet:", err);
        console.error("Error details:", err.response?.data);
        setFeedback({ type: "error", text: "Unable to load pet. Please try later." });
        setPet(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const openAdopt = () => {
    setFeedback(null);
    setAdoptOpen(true);
  };

  const closeAdopt = () => {
    setAdoptOpen(false);
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setFeedback({ type: "error", text: "Name and email are required." });
      return;
    }
    try {
      setSubmitting(true);
      setFeedback(null);
      const payload = { petId: id, name: form.name, email: form.email, message: form.message };
      const res = await api.post("/adoption-requests", payload);
      setFeedback({ type: "success", text: "Adoption request submitted. We'll contact you soon." });
      setTimeout(closeAdopt, 1400);
    } catch (err) {
      console.error("Adopt error:", err);
      const msg = err?.response?.data?.msg || "Failed to submit request";
      setFeedback({ type: "error", text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading adorable pet...</p>
      </div>
    </div>
  );

  if (!pet) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center">
        <div className="text-6xl mb-4">😢</div>
        <div className="text-2xl font-bold text-gray-800 mb-2">Pet not found</div>
        <Link to="/pets" className="text-pink-600 hover:text-pink-700 font-semibold">← Back to Pets</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-6">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        {/* Hero Section with Pet Image - Premium Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="lg:flex">
            {/* Pet Image */}
            <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img 
                src={pet.image || "https://via.placeholder.com/800x600"} 
                alt={pet.name} 
                className="w-full h-full min-h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                  pet.adoptionStatus === 'available' ? 'bg-green-500 text-white' :
                  pet.adoptionStatus === 'pending' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {pet.adoptionStatus?.charAt(0).toUpperCase() + pet.adoptionStatus?.slice(1)}
                </span>
              </div>
            </div>

            {/* Pet Information */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
              {/* Name & Title */}
              <div className="mb-4">
                <h1 className="text-3xl font-black text-gray-900 mb-1 flex items-center gap-2">
                  {pet.name}
                  <span className="text-2xl">
                    {pet.type === 'Dog' ? '🐕' : '🐱'}
                  </span>
                </h1>
                <p className="text-base text-gray-600 font-medium">{pet.breed}</p>
                <div className="h-0.5 w-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-2"></div>
              </div>

              {/* Quick Stats Grid - Premium Style */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Age</p>
                  <p className="text-lg font-bold text-gray-900">{pet.age} years</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Gender</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{pet.gender}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Size</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{pet.size}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Color</p>
                  <p className="text-lg font-bold text-gray-900">{pet.color}</p>
                </div>
              </div>

              {/* Health Status - Premium Style */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Health Status</h3>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${
                    pet.isVaccinated ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {pet.isVaccinated ? '✓ Vaccinated' : '○ Not Vaccinated'}
                  </span>
                  <span className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${
                    pet.isNeutered ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {pet.isNeutered ? '✓ Spayed/Neutered' : '○ Not Spayed/Neutered'}
                  </span>
                </div>
              </div>

              {/* Adoption Fee - Premium Style */}
              <div className="mb-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Adoption Fee</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-medium text-gray-600">₹</span>
                      <span className="text-3xl font-black text-gray-900">{pet.adoptionFee}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Premium Style */}
              <div className="flex flex-col gap-3 mt-auto">
                {pet.adoptionStatus === 'available' && (
                  <button
                    onClick={openAdopt}
                    className="w-full px-6 py-3 rounded-lg bg-pink-600 text-white font-bold text-sm shadow-md hover:bg-pink-700 hover:shadow-lg active:scale-98 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Adopt {pet.name}
                  </button>
                )}

                <Link 
                  to="/pets" 
                  className="w-full px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-center"
                >
                  ← Back to Pets
                </Link>
              </div>

              {feedback && (
                <div className={`mt-3 p-2.5 rounded-lg font-semibold text-xs ${
                  feedback.type === "error" ? "bg-red-100 text-red-700 border border-red-300" : "bg-green-100 text-green-700 border border-green-300"
                }`}>
                  {feedback.text}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section - Premium Style */}
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About {pet.name}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{pet.description}</p>
        </div>

        {/* Special Needs - Premium Style */}
        {pet.specialNeeds && (
          <div className="bg-amber-50 border border-amber-200 shadow-sm rounded-xl p-6">
            <h3 className="text-base font-bold text-amber-900 mb-2">Special Needs</h3>
            <p className="text-sm text-amber-800 leading-relaxed">{pet.specialNeeds}</p>
          </div>
        )}

        {/* Shelter Information - Premium Style */}
        {pet.shelterId && (
          <div className="bg-pink-50 border border-pink-200 shadow-sm rounded-xl p-6">
            <h3 className="text-base font-bold text-pink-900 mb-3">Shelter Information</h3>
            <p className="text-base font-semibold text-pink-800 mb-1">{pet.shelterId.name}</p>
            <p className="text-sm text-pink-700">{pet.shelterId.address}, {pet.shelterId.city}, {pet.shelterId.state}</p>
          </div>
        )}

        {/* Medical Information */}
        <MedicalInfo petId={pet._id} petName={pet.name} />
      </div>

      {/* Adopt Modal */}
      {adoptOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 transform animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-gray-900">Adopt {pet.name} 💕</h3>
              <button 
                onClick={closeAdopt} 
                className="text-gray-400 hover:text-gray-800 text-2xl font-bold transition-colors hover:rotate-90 transform duration-300"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="w-full border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 p-3 rounded-lg transition-all duration-300 outline-none" 
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  type="email" 
                  className="w-full border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 p-3 rounded-lg transition-all duration-300 outline-none" 
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  rows="4" 
                  className="w-full border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 p-3 rounded-lg transition-all duration-300 outline-none resize-none" 
                  placeholder="Tell us why you'd be a great match..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={closeAdopt} 
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Request"}
                </button>
              </div>
            </form>

            {feedback && feedback.type === "error" && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold border-2 border-red-300">
                {feedback.text}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
