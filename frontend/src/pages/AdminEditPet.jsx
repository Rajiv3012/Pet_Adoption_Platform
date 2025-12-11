import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function AdminEditPet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPet = async () => {
    try {
      const res = await api.get(`/pets/${id}`);
      setPet(res.data);
    } catch (err) {
      console.log("LOAD PET ERROR:", err);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/pets/${id}`, pet);
      alert("Pet updated successfully!");
      navigate("/admin/pets");
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("Update failed");
    }
  };

  useEffect(() => {
    loadPet();
  }, []);

  if (loading || !pet) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Edit Pet</h1>

      <label className="block mb-2 font-semibold">Name</label>
      <input
        className="w-full p-2 border mb-4"
        value={pet.name}
        onChange={(e) => setPet({ ...pet, name: e.target.value })}
      />

      <label className="block mb-2 font-semibold">Type</label>
      <input
        className="w-full p-2 border mb-4"
        value={pet.type}
        onChange={(e) => setPet({ ...pet, type: e.target.value })}
      />

      <label className="block mb-2 font-semibold">Age</label>
      <input
        type="number"
        className="w-full p-2 border mb-4"
        value={pet.age}
        onChange={(e) => setPet({ ...pet, age: e.target.value })}
      />

      <label className="block mb-2 font-semibold">Image URL</label>
      <input
        className="w-full p-2 border mb-4"
        value={pet.image}
        onChange={(e) => setPet({ ...pet, image: e.target.value })}
      />

      <label className="block mb-2 font-semibold">Description</label>
      <textarea
        className="w-full p-2 border mb-4"
        value={pet.description}
        onChange={(e) => setPet({ ...pet, description: e.target.value })}
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Update Pet
      </button>
    </div>
  );
}
