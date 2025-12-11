import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/admin/login", { username, password });

      // Save admin data
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Background security pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-800/20 to-transparent rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Security badge */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-2xl border-4 border-gray-900">
            <i className="fas fa-shield-alt text-white text-2xl"></i>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Card header */}
          <div className="p-8 pb-6 text-center border-b border-gray-700">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-sm">Secure administrative access</p>
          </div>

          {/* Card body */}
          <div className="p-8">
            {/* Username input */}
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-3 flex items-center">
                <i className="fas fa-user-shield mr-2 text-red-500"></i>
                Username
              </label>
              <div className="relative group">
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border-2 border-gray-700 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter admin username"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <i className="fas fa-user-circle text-gray-500"></i>
                </div>
              </div>
            </div>

            {/* Password input */}
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-3 flex items-center">
                <i className="fas fa-key mr-2 text-red-500"></i>
                Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  className="w-full bg-gray-900/50 border-2 border-gray-700 text-white p-4 pl-12 pr-12 rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter admin password"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <i className="fas fa-lock text-gray-500"></i>
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <i className="fas fa-asterisk text-gray-500 text-sm"></i>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center space-x-3 text-red-400">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Login button */}
            <button
              onClick={handleAdminLogin}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                loading 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 hover:shadow-xl transform hover:scale-[1.02] active:scale-95'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">Secure Login</span>
                    <i className="fas fa-arrow-right-to-bracket text-white"></i>
                  </>
                )}
              </div>
            </button>

            {/* Security notice */}
            <div className="mt-8 p-4 bg-gray-900/50 border border-gray-700 rounded-xl">
              <div className="flex items-start space-x-3">
                <i className="fas fa-info-circle text-blue-400 mt-1"></i>
                <div>
                  <p className="text-sm text-gray-400">
                    This portal is restricted to authorized personnel only. 
                    Unauthorized access is prohibited and may be prosecuted.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to home */}
            <div className="mt-6 text-center">
              <a 
                href="/" 
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <i className="fas fa-arrow-left transform group-hover:-translate-x-1 transition-transform duration-300"></i>
                <span>Return to Public Site</span>
              </a>
            </div>
          </div>

          {/* Card footer */}
          <div className="px-8 py-4 bg-gray-900/50 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-500">Secure Connection</span>
              </div>
              <div className="text-xs text-gray-500">
                <i className="fas fa-clock mr-1"></i>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>

        {/* Security elements */}
        <div className="absolute -bottom-6 left-4 w-12 h-12 opacity-20">
          <i className="fas fa-shield text-red-600 text-4xl"></i>
        </div>
        <div className="absolute -top-6 right-4 w-12 h-12 opacity-20">
          <i className="fas fa-lock text-red-600 text-4xl"></i>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">Enter</kbd>
          <span>to submit</span>
        </div>
      </div>
    </div>
  );
}