import AdminDashboard from "./AdminDashboard";
import api from "../api/client";
import { useEffect, useState } from "react";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    const res = await api.get("/adoption-requests");
    setRequests(res.data);
  };

  const approve = async (id) => {
    await api.put(`/adoption-requests/${id}/approve`);
    load();
  };

  const reject = async (id) => {
    await api.put(`/adoption-requests/${id}/reject`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Adoption Requests</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="p-3">Pet</th>
            <th className="p-3">User</th>
            <th className="p-3">Message</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="border-b">
              <td className="p-3">{r.petId?.name}</td>
              <td className="p-3">{r.userId?.email}</td>
              <td className="p-3">{r.message}</td>
              <td className="p-3 uppercase">{r.status}</td>
              <td className="p-3 flex gap-3">
                {r.status === "pending" ? (
                  <>
                    <button className="bg-green-500 p-2 text-white" onClick={() => approve(r._id)}>
                      Approve
                    </button>
                    <button className="bg-red-500 p-2 text-white" onClick={() => reject(r._id)}>
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400">No action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
