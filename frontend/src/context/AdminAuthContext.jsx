import { createContext, useState, useEffect } from "react";

export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("admin")) || null;
  });

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem("adminToken") || null;
  });

  useEffect(() => {
    if (adminToken) {
      setAdmin(JSON.parse(localStorage.getItem("admin")));
    }
  }, [adminToken]);

  const loginAdmin = (adminData, token) => {
    setAdmin(adminData);
    setAdminToken(token);

    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("adminToken", token);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setAdminToken(null);

    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminToken, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
