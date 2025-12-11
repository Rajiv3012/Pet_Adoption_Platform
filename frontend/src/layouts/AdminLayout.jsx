import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        <nav className="flex flex-col space-y-3">
          <Link to="/admin/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link to="/admin/requests" className="hover:text-yellow-300">Adoption Requests</Link>
          <Link to="/admin/pets" className="hover:text-yellow-300">Manage Pets</Link>
          <Link to="/admin/pets/add" className="hover:text-yellow-300">Add New Pet</Link>

          <Link
            to="/admin/login"
            onClick={() => {
              localStorage.removeItem("admin");
              localStorage.removeItem("adminToken");
            }}
            className="text-red-400 hover:text-red-600 mt-4"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
