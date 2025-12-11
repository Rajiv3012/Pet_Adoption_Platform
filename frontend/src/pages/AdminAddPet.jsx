import { useState } from "react";
import api from "../api/client";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminAddPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!image) return alert("Please choose an image");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("type", type);
    fd.append("age", age);
    fd.append("description", description);
    fd.append("image", image);

    try {
      await api.post("/pets", fd, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Pet added");
      // reset or navigate
      setName(""); setType(""); setAge(""); setDescription(""); setImage(null);
    } catch (err) {
      console.error("ADD PET ERR:", err);
      alert(err.response?.data?.msg || "Failed to add pet");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Add Pet</h1>
      <div className="max-w-lg space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border p-2 rounded"/>
        <input value={type} onChange={e=>setType(e.target.value)} placeholder="Type" className="w-full border p-2 rounded"/>
        <input value={age} onChange={e=>setAge(e.target.value)} placeholder="Age" type="number" className="w-full border p-2 rounded"/>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded"/>
        <input type="file" onChange={e=>setImage(e.target.files[0])} />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Add Pet</button>
      </div>
    </AdminLayout>
  );
}
