
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const loadPet = async () => {
    try {
      const res = await api.get(`/pets/${id}`);
      setPet(res.data);
    } catch (err) {
      console.log("Error loading pet:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPet();
  }, []);

  const handleAdopt = async () => {
    setError("");
    setSuccess("");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setError("Please login to submit adoption request.");
      return navigate("/login");
    }

    try {
      const res = await api.post("/adoption-requests", {
        petId: pet._id,
        userId: user.id,
        message
      });

      setSuccess("Adoption request submitted successfully!");
    } catch (err) {
      console.log("ADOPT ERROR:", err);
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  if (loading) {
    return <div className="text-center text-xl p-10">Loading...</div>;
  }

  if (!pet) {
    return <div className="text-center text-xl p-10">Pet not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-80 object-cover rounded-lg shadow"
      />

      <h1 className="text-4xl font-bold mt-4">{pet.name}</h1>
      <p className="text-gray-700 text-lg">{pet.type} • {pet.age} years old</p>

      <p className="mt-4 text-gray-600">{pet.description}</p>

      {pet.adopted ? (
        <p className="mt-6 text-xl text-red-600 font-bold">
          This pet has already been adopted.
        </p>
      ) : (
        <>
          <textarea
            className="w-full border p-3 mt-6 rounded"
            placeholder="Why do you want to adopt this pet?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {error && <p className="text-red-600 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">{success}</p>}

          <button
            onClick={handleAdopt}
            className="mt-4 w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
          >
            Adopt This Pet
          </button>
        </>
      )}
    </div>
  );
}
