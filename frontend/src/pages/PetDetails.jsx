import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  const { user } = useContext(AuthContext || {}); // if you have AuthContext

  // form fields
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error("Error loading pet:", err);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleRequest = async () => {
    if (!name || !email) {
      setMsg("Name and email are required.");
      return;
    }
    setSending(true);
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.post(
        "/adoption-requests",
        { pet: id, name, email, message },
        { headers }
      );
      setMsg(res.data.msg || "Request sent");
      setShowForm(false);
      setMessage("");
    } catch (err) {
      console.error("Request error:", err);
      setMsg(err?.response?.data?.msg || "Could not send request");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!pet) return <div className="min-h-screen flex items-center justify-center">Pet not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded shadow overflow-hidden md:flex">
        <img src={pet.image || "https://via.placeholder.com/600x400"} alt={pet.name} className="w-full md:w-1/2 h-80 object-cover" />
        <div className="p-6 md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
          <p className="text-gray-600 mb-4">{pet.type} • Age: {pet.age}</p>
          <p className="text-gray-800 mb-6">{pet.description}</p>

          <div className="flex gap-4">
            <button onClick={() => setShowForm(true)} className="bg-blue-700 text-white px-4 py-2 rounded">Request Adoption</button>
            <a href="/pets" className="px-4 py-2 border rounded">Back to list</a>
          </div>

          {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
        </div>
      </div>

      {/* Modal / Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-3">Adoption Request for {pet.name}</h2>

            <label className="block text-sm font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded mb-3" />

            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded mb-3" />

            <label className="block text-sm font-medium">Message (optional)</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border p-2 rounded mb-4" rows={4} />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleRequest} disabled={sending} className="px-4 py-2 bg-blue-700 text-white rounded">
                {sending ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
