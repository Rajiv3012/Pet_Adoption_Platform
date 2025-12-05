import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </div>
  );
}
