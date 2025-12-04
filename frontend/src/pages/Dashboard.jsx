import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <h1 className="text-2xl text-center mt-10 text-red-600">Access Denied</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
    </div>
  );
}
