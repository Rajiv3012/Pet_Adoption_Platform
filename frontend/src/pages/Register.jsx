import { useState } from "react";
import api from "../api/client";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      setMessage("Registration successful! You can login now.");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Create Account</h2>

      <form className="space-y-6" onSubmit={handleRegister}>
        <input className="w-full p-3 border rounded" placeholder="Full Name"
          value={name} onChange={(e) => setName(e.target.value)} />

        <input className="w-full p-3 border rounded" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full p-3 border rounded" placeholder="Password" type="password"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
