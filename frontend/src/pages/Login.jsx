import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("All fields are required");
        return;
      }

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-3 rounded focus:outline-blue-600"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded focus:outline-blue-600"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-700 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
