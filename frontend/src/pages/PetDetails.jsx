import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";

export default function PetDetails() {
  const { id } = useParams();       // Get pet ID from URL
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPet() {
      try {
        const res = await api.get(`/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error("Error loading pet:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPet();
  }, [id]);

  if (loading) return <h1 className="text-2xl text-center mt-10">Loading...</h1>;

  if (!pet) return <h1 className="text-2xl text-center mt-10 text-red-600">Pet not found.</h1>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <img
        src={pet.photos?.[0] || "https://via.placeholder.com/600"}
        alt={pet.name}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <h1 className="text-4xl font-bold text-blue-700 mb-4">{pet.name}</h1>

      <p className="text-lg text-gray-700 mb-2">
        <strong>Species:</strong> {pet.species}
      </p>

      <p className="text-lg text-gray-700 mb-2">
        <strong>Breed:</strong> {pet.breed}
      </p>

      <p className="text-lg text-gray-700 mb-2">
        <strong>Age:</strong> {pet.ageYears} years
      </p>

      <p className="text-gray-600 mt-4">{pet.description}</p>

      <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        Request Adoption
      </button>
    </div>
  );
}
