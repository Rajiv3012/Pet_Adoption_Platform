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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#2D2D3A] shadow-xl backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-[#FFB347] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <i className="fas fa-paw text-[#E07A5F] text-2xl"></i>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#81B29A] animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                PET FINDER
              </h1>
              <p className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Where love finds a home
              </p>
            </div>
          </Link>

          {/* Navigation Container */}
          <div className="flex items-center space-x-1">
            
            {/* Home Navigation */}
            <Link 
              to="/" 
              className="px-5 py-2.5 rounded-full text-white hover:bg-white/10 transition-all duration-300 group relative"
            >
              <i className="fas fa-home mr-2"></i>
              Home
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            {/* Pets Navigation */}
            <Link 
              to="/pets" 
              className="px-5 py-2.5 rounded-full text-white hover:bg-white/10 transition-all duration-300 group relative"
            >
              <i className="fas fa-paw mr-2"></i>
              Pets
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            {/* -------------------------
                 ADMIN NAVIGATION
            -------------------------- */}
            {admin && (
              <div className="flex items-center space-x-2 ml-4 border-l border-white/20 pl-4">
                {/* Admin Panel Link */}
                <Link 
                  to="/admin/dashboard" 
                  className="px-4 py-2 bg-gradient-to-r from-[#FFB347] to-[#E07A5F] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <i className="fas fa-shield-alt mr-2"></i>
                  Admin Panel
                </Link>

                {/* Admin Logout Button */}
                <button
                  onClick={handleAdminLogout}
                  className="px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#C44569] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center group"
                >
                  <i className="fas fa-sign-out-alt mr-2 transform group-hover:rotate-180 transition-transform duration-300"></i>
                  Logout Admin
                </button>
              </div>
            )}

            {/* -------------------------
                 USER NAVIGATION
            -------------------------- */}
            {!admin && user && (
              <div className="flex items-center space-x-4 ml-4 border-l border-white/20 pl-4">
                {/* User Greeting */}
                <div className="relative group">
                  <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#81B29A] to-[#FFB347] flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Hi, {user.name}
                      </span>
                      <p className="text-xs text-white/70">Welcome back!</p>
                    </div>
                  </div>
                  
                  {/* Dropdown Menu (Optional - can be expanded) */}
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-[#81B29A]/10 hover:text-[#2D2D3A] transition-colors">
                        <i className="fas fa-user mr-3"></i>My Profile
                      </Link>
                      <Link to="/my-pets" className="block px-4 py-3 text-gray-700 hover:bg-[#81B29A]/10 hover:text-[#2D2D3A] transition-colors">
                        <i className="fas fa-heart mr-3"></i>My Favorites
                      </Link>
                    </div>
                  </div>
                </div>

                {/* User Logout Button */}
                <button
                  onClick={logout}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#81B29A] to-[#2D2D3A] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center group"
                >
                  <i className="fas fa-sign-out-alt mr-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                  Logout
                </button>
              </div>
            )}

            {/* -------------------------
                 WHEN NO ONE IS LOGGED IN
            -------------------------- */}
            {!admin && !user && (
              <div className="flex items-center space-x-4 ml-4 border-l border-white/20 pl-4">
                {/* Admin Login Link */}
                <Link 
                  to="/admin/login" 
                  className="px-4 py-2.5 text-white hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center group"
                >
                  <i className="fas fa-shield-alt mr-2 transform group-hover:rotate-12 transition-transform duration-300"></i>
                  Admin Login
                </Link>

                {/* Divider */}
                <div className="h-6 w-px bg-white/30"></div>

                {/* User Login */}
                <Link 
                  to="/login" 
                  className="px-5 py-2.5 bg-gradient-to-r from-[#E07A5F] to-[#FFB347] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </Link>

                {/* User Register */}
                <Link 
                  to="/register" 
                  className="px-5 py-2.5 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center group"
                >
                  <i className="fas fa-user-plus mr-2 transform group-hover:scale-110 transition-transform duration-300"></i>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (Optional for responsive) */}
        <div className="md:hidden mt-4 flex justify-end">
          <button className="text-white hover:bg-white/10 p-2 rounded-lg">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Optional Announcement Bar */}
      
    </header>
  );
}