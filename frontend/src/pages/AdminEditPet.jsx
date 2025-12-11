import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminEditPet() {
  const { id } = useParams();
  const nav = useNavigate();

  const [pet, setPet] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get(`/pets/${id}`);
      setPet(res.data);
      setName(res.data.name);
      setType(res.data.type);
      setAge(res.data.age);
      setDescription(res.data.description);
    } catch (err) {
      console.error(err);
      alert("Failed to load pet");
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, [id]);

  const handleUpdate = async () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("type", type);
    fd.append("age", age);
    fd.append("description", description);
    if (imageFile) fd.append("image", imageFile);

    try {
      await api.put(`/pets/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" }});
      alert("Pet updated");
      nav("/admin/pets");
    } catch (err) {
      console.error("UPDATE ERR:", err);
      alert(err.response?.data?.msg || "Failed to update");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Edit Pet</h1>

      <div className="max-w-lg space-y-3">
        <img src={pet.image} alt={pet.name} className="w-48 h-48 object-cover rounded"/>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border p-2 rounded"/>
        <input value={type} onChange={e=>setType(e.target.value)} placeholder="Type" className="w-full border p-2 rounded"/>
        <input value={age} onChange={e=>setAge(e.target.value)} placeholder="Age" type="number" className="w-full border p-2 rounded"/>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded"/>
        <input type="file" onChange={e=>setImageFile(e.target.files[0])} />
        <div className="flex gap-3">
          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
          <button onClick={()=>nav("/admin/pets")} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </AdminLayout>
  );
}
