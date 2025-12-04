import { Link } from "react-router-dom";

export default function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={pet.photos?.[0] || "https://via.placeholder.com/300"}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold">{pet.name}</h3>
        <p className="text-gray-600">{pet.breed} • {pet.species}</p>
        <p className="text-gray-700 font-medium mt-2">Age: {pet.ageYears} years</p>

        <Link
          to={`/pets/${pet._id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
