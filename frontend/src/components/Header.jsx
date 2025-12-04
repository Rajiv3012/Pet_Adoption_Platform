import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-blue-600 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Pet Adoption</h1>

      <nav className="space-x-6">
        <Link className="hover:text-yellow-300" to="/">Home</Link>
        <Link className="hover:text-yellow-300" to="/pets">Pets</Link>

        {!user ? (
          <>
            <Link className="hover:text-yellow-300" to="/login">Login</Link>
            <Link className="hover:text-yellow-300" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link className="hover:text-yellow-300" to="/dashboard">Dashboard</Link>
            <button className="hover:text-yellow-300" onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
