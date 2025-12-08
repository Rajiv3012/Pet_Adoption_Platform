import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/admin/login", { username, password });

      // Save admin data
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      console.log("ADMIN LOGIN ERROR:", err);
      setError(err.response?.data?.msg || "Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Admin Login
        </h1>

        {/* USERNAME */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full border p-3 rounded focus:outline-red-600"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded focus:outline-red-600"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        <button
          onClick={handleAdminLogin}
          className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
        >
          Login as Admin
        </button>

      </div>
    </div>
  );
}
