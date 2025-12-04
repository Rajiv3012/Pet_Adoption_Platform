import { useEffect, useState } from "react";
import api from "../api/client";
import PetCard from "../components/PetCard";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPets() {
      try {
        const res = await api.get("/pets");
        setPets(res.data);
      } catch (err) {
        console.error("Error loading pets:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, []);

  if (loading) return <h1 className="text-2xl text-center mt-10">Loading pets...</h1>;

  if (pets.length === 0)
    return (
      <h1 className="text-2xl text-center mt-10 text-gray-500">
        No pets available right now.
      </h1>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Pets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
