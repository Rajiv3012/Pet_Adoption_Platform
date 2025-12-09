import { useEffect, useState } from "react";
import api from "../api/client";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all adoption requests
  const loadRequests = async () => {
    try {
      const res = await api.get("/adoption-requests");
      setRequests(res.data);
    } catch (err) {
      console.log("ADMIN FETCH ERROR:", err);
    }
    setLoading(false);
  };

  // APPROVE REQUEST
  const handleApprove = async (id) => {
    try {
      await api.put(`/adoption-requests/${id}/approve`);
      loadRequests(); // refresh
    } catch (err) {
      console.log("APPROVE ERROR:", err);
    }
  };

  // REJECT REQUEST
  const handleReject = async (id) => {
    try {
      await api.put(`/adoption-requests/${id}/reject`);
      loadRequests(); // refresh
    } catch (err) {
      console.log("REJECT ERROR:", err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Admin Dashboard</h1>

      <table className="w-full border-collapse shadow">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="p-3 text-left">Pet</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="border-b hover:bg-gray-100">
              <td className="p-3 font-semibold">{req.petId?.name}</td>

              <td className="p-3">
                {req.userId?.name}
                <br />
                <span className="text-gray-500">{req.userId?.email}</span>
              </td>

              <td className="p-3">{req.message}</td>

              <td className="p-3 font-bold">
                {req.status === "pending" && (
                  <span className="text-yellow-600">Pending</span>
                )}
                {req.status === "approved" && (
                  <span className="text-green-600">Approved</span>
                )}
                {req.status === "rejected" && (
                  <span className="text-red-600">Rejected</span>
                )}
              </td>

              <td className="p-3">
                {req.status === "pending" ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="italic text-gray-500">No action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
