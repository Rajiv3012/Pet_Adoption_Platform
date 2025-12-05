import { useParams } from "react-router-dom";

export default function PetDetails() {
  const { id } = useParams();

  // Dummy pet info (later replaced with backend API)
  const pet = {
    id,
    name: "Bella",
    species: "Cat",
    breed: "Persian",
    age: 2,
    gender: "Female",
    description:
      "Bella is a gentle and affectionate cat who loves cozy spots and warm cuddles. Perfect for a calm household.",
    image: "https://placekitten.com/600/400",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        
        {/* IMAGE */}
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        {/* PET NAME */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Meet {pet.name}
        </h1>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <p><strong>Species:</strong> {pet.species}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age} years</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mt-6 leading-relaxed">
          {pet.description}
        </p>

        {/* ADOPTION BUTTON */}
        <div className="mt-8">
          <button
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition"
          >
            Request Adoption
          </button>
        </div>
      </div>
    </div>
  );
}
