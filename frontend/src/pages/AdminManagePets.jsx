// src/pages/AdminManagePets.jsx
import { useEffect, useState } from "react";
import api from "../api/client";

export default function AdminManagePets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPets = async () => {
    try {
      const res = await api.get("/pets");
      setPets(res.data || []);
    } catch (err) {
      console.error("LOAD PETS ERROR:", err);
      setPets([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPets();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading pets...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Manage Pets</h1>

      <div className="mb-4">
        <a
          href="/admin/pets/add"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add New Pet
        </a>
      </div>

      {pets.length === 0 ? (
        <p className="text-gray-600">No pets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.map((p) => (
            <div key={p._id} className="border rounded p-4 shadow-sm">
              <div className="flex gap-4">
                <img
                  src={p.image || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="w-28 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.type} • {p.age} yrs</p>
                  <p className="mt-2 text-sm">{p.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
