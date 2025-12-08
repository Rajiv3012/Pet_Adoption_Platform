import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";
import { AuthContext } from "../context/AuthContext";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const res = await api.get(`/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.log("Error loading pet:", err);
      }
      setLoading(false);
    };

    loadPet();
  }, [id]);

  const sendRequest = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setSending(true);

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/adoption-requests",
        { petId: id, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Request sent successfully!");
      setShowForm(false);
      setMessage("");
    } catch (err) {
      console.log(err);
      alert("Failed to send request");
    }

    setSending(false);
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!pet) return <div className="p-10">Pet not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-5">
      <img src={pet.image} className="w-full h-80 object-cover rounded mb-6" />
      <h1 className="text-4xl font-bold mb-2">{pet.name}</h1>
      <p className="text-gray-700">{pet.type} • {pet.age} years old</p>
      <p className="mt-4 text-lg">{pet.description}</p>

      {/* LOGIN CHECK */}
      {!user ? (
        <button
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
          onClick={() => navigate("/login")}
        >
          Login to Request Adoption
        </button>
      ) : (
        <button
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
          onClick={() => setShowForm(true)}
        >
          Request Adoption
        </button>
      )}

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Adoption Request for {pet.name}
            </h2>

            <textarea
              className="w-full border p-2 rounded"
              rows="4"
              placeholder="Your message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex justify-end mt-4 gap-3">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={sendRequest}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
