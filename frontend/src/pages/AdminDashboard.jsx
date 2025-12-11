import { useEffect, useState } from "react";
import api from "../api/client";
import AdminLayout from "../layouts/AdminLayout.jsx";


export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log("ADMIN STATS ERROR:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) return <p className="text-center p-6">Loading...</p>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Total Pets</h2>
          <p className="text-3xl">{stats.totalPets}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Pending</h2>
          <p className="text-3xl text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Approved</h2>
          <p className="text-3xl text-green-600">{stats.approved}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Rejected</h2>
          <p className="text-3xl text-red-600">{stats.rejected}</p>
        </div>

      </div>
    </AdminLayout>
  );
}
