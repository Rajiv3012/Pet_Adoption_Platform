import { useEffect, useState } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";


export default function AdminManagePets() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  const loadPets = async () => {
    const res = await api.get("/pets");
    setPets(res.data);
  };

  useEffect(() => {
    loadPets();
  }, []);

  // DELETE PET
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;

    await api.delete(`/pets/${id}`);
    loadPets(); // refresh list
  };

  const filteredPets = pets.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Pets</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search pet..."
        className="border p-2 w-full mb-6 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="w-full border-collapse shadow bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPets.map((pet) => (
            <tr key={pet._id} className="border-b">
              <td className="p-3">
                <img src={pet.image} className="w-16 h-16 object-cover rounded" />
              </td>

              <td className="p-3 font-semibold">{pet.name}</td>
              <td className="p-3">{pet.type}</td>
              <td className="p-3">{pet.age}</td>

              <td className="p-3">
                {pet.adopted ? (
                  <span className="text-red-600 font-bold">Adopted</span>
                ) : (
                  <span className="text-green-600 font-bold">Available</span>
                )}
              </td>

              <td className="p-3 flex gap-3">
                <Link
                  to={`/admin/pets/edit/${pet._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(pet._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
