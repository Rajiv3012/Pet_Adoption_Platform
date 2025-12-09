import { useEffect, useState } from "react";
import api from "../api/client";

export default function MyRequests() {

  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const res = await api.get(`/adoption-requests/user/${user.id}`);
      setRequests(res.data);
    } catch (err) {
      console.log("USER REQUEST ERROR:", err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Adoption Requests</h1>

      {requests.length === 0 ? (
        <p>No requests submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div key={req._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{req.petId?.name}</h2>

              <p className="text-gray-600 mt-2">{req.message}</p>

              <p className="mt-3 font-semibold">
                Status:{" "}
                {req.status === "pending" && (
                  <span className="text-yellow-600">Pending</span>
                )}
                {req.status === "approved" && (
                  <span className="text-green-600">Approved ✔</span>
                )}
                {req.status === "rejected" && (
                  <span className="text-red-600">Rejected ✘</span>
                )}
              </p>

              {req.petId?.adopted && req.status === "approved" && (
                <p className="mt-2 text-green-700 font-bold">
                  🎉 This pet has been adopted by you!
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
