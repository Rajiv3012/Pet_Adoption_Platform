import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-red-700 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        <nav className="flex flex-col space-y-3">
          <Link to="/admin/dashboard" className="hover:text-yellow-300">
            Dashboard
          </Link>
          <Link to="/admin/requests" className="hover:text-yellow-300">
            Adoption Requests
          </Link>
          <Link to="/admin/pets" className="hover:text-yellow-300">
            Manage Pets
          </Link>
        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}
