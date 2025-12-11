import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

export default function AdminManagePets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPets = async () => {
    try {
      const res = await api.get("/pets");
      setPets(res.data);
    } catch (err) {
      console.log("ADMIN PETS LOAD ERROR:", err);
    }
    setLoading(false);
  };

  const deletePet = async (id) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    try {
      await api.delete(`/pets/${id}`);
      loadPets(); // refresh
    } catch (err) {
      console.log("DELETE PET ERROR:", err);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  if (loading) return <p className="text-xl p-6">Loading pets...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-700">Manage Pets</h1>

        <Link
          to="/admin/pets/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          + Add New Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <p className="text-gray-600">No pets available.</p>
      ) : (
        <table className="w-full border-collapse shadow-md">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Adopted</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-semibold">{pet.name}</td>
                <td className="p-3">{pet.type}</td>
                <td className="p-3">{pet.age}</td>

                <td className="p-3">
                  {pet.adopted ? (
                    <span className="text-green-600 font-bold">Yes</span>
                  ) : (
                    <span className="text-yellow-600 font-bold">No</span>
                  )}
                </td>

                <td className="p-3 flex gap-3">
                  {/* Edit button (build later) */}
                 
<Link
  to={`/admin/pets/edit/${pet._id}`}
  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
>
  Edit
</Link>


                  {/* DELETE */}
                  <button
                    onClick={() => deletePet(pet._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}
