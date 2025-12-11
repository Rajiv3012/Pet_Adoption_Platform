import { useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function AdminAddPet() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!name || !type || !age || !image) {
      setError("All fields except description are required.");
      return;
    }

    try {
      await api.post("/pets", {
        name,
        type,
        age,
        image,
        description,
      });

      setSuccess("Pet added successfully!");
      setTimeout(() => navigate("/admin/pets"), 1500);
    } catch (err) {
      console.log("ADD PET ERROR:", err);
      setError("Failed to add pet.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-red-700 mb-6">
        Add New Pet
      </h1>

      <div className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          placeholder="Pet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Pet Type (Dog, Cat etc.)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
        >
          Add Pet
        </button>
      </div>
    </div>
  );
}
