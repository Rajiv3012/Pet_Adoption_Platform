import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  // Detect admin login from localStorage
  const [admin, setAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("admin")) || null;
  });

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    setAdmin(storedAdmin);
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    window.location.href = "/admin/login";
  };

  return (
    <header className="bg-blue-700 text-white py-4 shadow">
      <nav className="container mx-auto flex justify-between items-center px-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Pet Adoption
        </Link>

        <div className="flex items-center space-x-6">
          
          {/* Normal Navigation */}
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/pets" className="hover:text-gray-200">Pets</Link>

          {/* -------------------------
               ADMIN NAVIGATION
          -------------------------- */}
          {admin && (
            <>
              <Link to="/admin/dashboard" className="hover:text-gray-200">
                Admin Panel
              </Link>

              <button
                onClick={handleAdminLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout (Admin)
              </button>
            </>
          )}

          {/* -------------------------
               USER NAVIGATION
          -------------------------- */}
          {!admin && user && (
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
          )}

          {/* -------------------------
               WHEN NO ONE IS LOGGED IN
          -------------------------- */}
          {!admin && !user && (
            <>
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
