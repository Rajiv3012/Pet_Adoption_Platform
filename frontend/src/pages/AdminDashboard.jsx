import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-5xl mx-auto">
      
      <h1 className="text-4xl font-bold mb-6 text-blue-700">
        Admin Dashboard
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Welcome, <span className="font-semibold">{user?.name}</span> 👋  
        Manage your platform efficiently.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Add New Pet */}
        <Link
          to="/admin/add-pet"
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition block"
        >
          <h3 className="text-xl font-semibold mb-2">Add New Pet</h3>
          <p className="text-gray-600">Create and add a new pet listing.</p>
        </Link>

        {/* Manage Pets */}
        <Link
          to="/admin/manage-pets"
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition block"
        >
          <h3 className="text-xl font-semibold mb-2">Manage Pets</h3>
          <p className="text-gray-600">Edit or delete pet profiles.</p>
        </Link>

        {/* Adoption Requests */}
        <Link
          to="/admin/adoption-requests"
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition block"
        >
          <h3 className="text-xl font-semibold mb-2">Adoption Requests</h3>
          <p className="text-gray-600">Review and approve adoption requests.</p>
        </Link>

      </div>
    </div>
  );
}
