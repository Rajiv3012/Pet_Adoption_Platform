import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";
import PetCard from "../components/PetCard";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const loadPets = async () => {
    try {
      const res = await api.get("/pets");
      let data = res.data;

      if (searchQuery) {
        data = data.filter((p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.type.toLowerCase().includes(searchQuery) ||
          String(p.age).includes(searchQuery)
        );
      }

      setPets(data);
    } catch (err) {
      console.log("Error loading pets:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPets();
  }, [searchQuery]);

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

      {/* SEARCH BAR */}
      <div className="max-w-lg mx-auto mb-10">
        <form>
          <input
            name="search"
            placeholder="Search pets..."
            defaultValue={searchQuery}
            className="w-full p-3 border rounded-lg shadow focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </form>
      </div>

      {pets.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No pets found matching your search.
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
