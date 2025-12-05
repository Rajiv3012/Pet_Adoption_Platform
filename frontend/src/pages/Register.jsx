import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");

      if (password !== confirm) {
        setError("Passwords do not match");
        return;
      }

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError("Email already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create an Account
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border p-3 rounded focus:outline-blue-600"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-3 rounded focus:outline-blue-600"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded focus:outline-blue-600"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded focus:outline-blue-600"
            placeholder="********"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
        >
          Register
        </button>

        {/* Switch to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
