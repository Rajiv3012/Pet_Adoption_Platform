import { useState, useContext } from "react";
import api from "../api/client";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token); // Save to context + localStorage
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>

      <form className="space-y-6" onSubmit={handleLogin}>
        <input className="w-full p-3 border rounded" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full p-3 border rounded" placeholder="Password"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
