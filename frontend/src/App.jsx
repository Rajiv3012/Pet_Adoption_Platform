import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PetDetails from "./pages/PetDetails";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pets from "./pages/Pets";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-60">
        <Header />

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/pets/:id" element={<PetDetails />} />

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
