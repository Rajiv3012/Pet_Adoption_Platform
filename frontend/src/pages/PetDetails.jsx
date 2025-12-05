import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/client";

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
        const res = await api.get(`/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error("Error loading pet:", err);
        setFeedback({ type: "error", text: "Unable to load pet. Please try later." });
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
      // optionally close modal after a delay
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-medium">Loading pet...</div>
    </div>
  );

  if (!pet) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg text-red-600">Pet not found.</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={pet.image || "https://via.placeholder.com/800x600"} alt={pet.name} className="w-full h-96 object-cover" />
          </div>

          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
            <p className="text-gray-600 mb-4">{pet.type} • Age: <span className="font-semibold">{pet.age}</span></p>
            <p className="text-gray-800 leading-relaxed mb-6">{pet.description}</p>

            <div className="flex gap-4">
              <button
                onClick={openAdopt}
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
              >
                Adopt
              </button>

              <Link to="/pets" className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">Back to list</Link>
            </div>

            {feedback && (
              <div className={`mt-6 p-3 rounded ${feedback.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                {feedback.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Adopt Modal */}
      {adoptOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Adopt {pet.name}</h3>
              <button onClick={closeAdopt} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your name</label>
                <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="mt-1 block w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="4" className="mt-1 block w-full border p-2 rounded" />
              </div>

              <div className="flex justify-end items-center gap-3">
                <button type="button" onClick={closeAdopt} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={submitting} className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60">
                  {submitting ? "Sending..." : "Send Request"}
                </button>
              </div>
            </form>

            {feedback && feedback.type === "error" && (
              <div className="mt-3 text-sm text-red-600">{feedback.text}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
