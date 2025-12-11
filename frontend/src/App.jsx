import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAdmin from "./components/RequireAdmin";

// User Pages
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequests";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import AdminManagePets from "./pages/AdminManagePets";
import AdminAddPet from "./pages/AdminAddPet";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Header />

      <main className="flex-1 p-6">
        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-requests" element={<MyRequests />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/requests"
            element={
              <RequireAdmin>
                <AdminRequests />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/pets"
            element={
              <RequireAdmin>
                <AdminManagePets />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/pets/add"
            element={
              <RequireAdmin>
                <AdminAddPet />
              </RequireAdmin>
            }
          />

        </Routes>
        
      </main>

      <Footer />

    </div>
  );
}
