import { useEffect, useState } from "react";
import api from "../api/client";
import PetCard from "../components/PetCard";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPets = async () => {
  try {
    const res = await api.get("/pets");
    console.log("PETS FROM BACKEND:", res.data);
    setPets(res.data);
  } catch (err) {
    console.log("Error loading pets:", err);
  }
  setLoading(false);
};


  useEffect(() => {
    loadPets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading pets...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Available Pets
      </h1>

      {pets.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No pets available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}
