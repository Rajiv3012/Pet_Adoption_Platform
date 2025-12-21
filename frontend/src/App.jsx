import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DonationModal from "./components/DonationModal";

import Home from "./pages/Home";
import Adoption from "./pages/Adoption";
import Volunteer from "./pages/Volunteer";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Shelters from "./pages/Shelters";
import About from "./pages/About";
import Donation from "./pages/Donation";
import MedicalRecords from "./pages/MedicalRecords";
import AuthCallback from "./pages/AuthCallback";
import Welcome from "./pages/Welcome";
import AdminDashboard from "./pages/AdminDashboard";
import AddPet from "./pages/AddPet";
import ManagePets from "./pages/ManagePets";
import EditPet from "./pages/EditPet";
import ManageShelters from "./pages/ManageShelters";
import AddShelter from "./pages/AddShelter";
import EditShelter from "./pages/EditShelter";
import ManageMedicalRecords from "./pages/ManageMedicalRecords";
import AddMedicalRecord from "./pages/AddMedicalRecord";
import EditMedicalRecord from "./pages/EditMedicalRecord";

export default function App() {
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onDonateClick={() => setDonationModalOpen(true)} />

      <main className="flex-1 p-6 pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<Adoption />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/about" element={<About />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-pet" element={<AddPet />} />
          <Route path="/admin/manage-pets" element={<ManagePets />} />
          <Route path="/admin/edit-pet/:id" element={<EditPet />} />
          <Route path="/admin/manage-shelters" element={<ManageShelters />} />
          <Route path="/admin/add-shelter" element={<AddShelter />} />
          <Route path="/admin/edit-shelter/:id" element={<EditShelter />} />
          <Route path="/admin/manage-medical-records" element={<ManageMedicalRecords />} />
          <Route path="/admin/add-medical-record" element={<AddMedicalRecord />} />
          <Route path="/admin/edit-medical-record/:id" element={<EditMedicalRecord />} />
        </Routes>
      </main>

      <Footer />
      
      <DonationModal 
        isOpen={donationModalOpen} 
        onClose={() => setDonationModalOpen(false)} 
      />
    </div>
  );
}
