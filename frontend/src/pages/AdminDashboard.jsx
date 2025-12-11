import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

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

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Total Pets</h2>
          <p className="text-3xl">{stats.totalPets}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
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

      {/* QUICK ACTIONS */}
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          to="/admin/requests"
          className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 text-center"
        >
          Review Adoption Requests
        </Link>

        <Link
          to="/admin/pets"
          className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 text-center"
        >
          Manage Pets
        </Link>

        <Link
          to="/admin/pets/add"
          className="bg-purple-600 text-white p-6 rounded-lg shadow hover:bg-purple-700 text-center"
        >
          Add New Pet
        </Link>

      </div>
    </div>
  );
}
