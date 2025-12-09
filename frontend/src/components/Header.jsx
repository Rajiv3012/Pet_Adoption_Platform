import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-700 text-white py-4 shadow">
      <nav className="container mx-auto flex justify-between items-center px-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Pet Adoption
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">

          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/pets" className="hover:text-gray-200">Pets</Link>

          {/* ⭐ Admin Dashboard link (only for admin users) */}
          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="hover:text-gray-200 font-semibold">
              Admin Panel
            </Link>
          )}

          {/* ⭐ My Requests (only for normal logged-in users) */}
          {user && user.role !== "admin" && (
            <Link to="/my-requests" className="hover:text-gray-200">
              My Requests
            </Link>
          )}

          {/* Authentication */}
          {user ? (
            <>
              <span className="font-semibold text-yellow-300">
                Hi, {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Always visible when NOT logged in */}
              <Link to="/admin/login" className="hover:text-gray-200">
                Admin Login
              </Link>

              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>

              <Link to="/register" className="hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}
