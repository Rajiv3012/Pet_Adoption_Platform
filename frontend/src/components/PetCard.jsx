import { Link } from "react-router-dom";

export default function PetCard({ pet }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
      
      {/* Image */}
      <img
        src={pet.image || "https://via.placeholder.com/300"}
        alt={pet.name}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold">{pet.name}</h2>
        <p className="text-gray-600 capitalize">{pet.type}</p>
<p className="text-gray-700 mt-2">{pet.description}</p>

        {/* Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-pink-600 font-semibold">Age: {pet.age}</p>

          <Link
            to={`/pets/${pet._id}`}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
