import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Listen for localStorage changes (for cross-tab sync and login updates)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          // Only update if the user data has actually changed
          setUser(prevUser => {
            if (JSON.stringify(prevUser) !== JSON.stringify(parsedUser)) {
              return parsedUser;
            }
            return prevUser;
          });
          setToken(prevToken => prevToken !== storedToken ? storedToken : prevToken);
        } else {
          setUser(prevUser => prevUser !== null ? null : prevUser);
          setToken(prevToken => prevToken !== null ? null : prevToken);
        }
      } catch (error) {
        console.error("Error handling storage change:", error);
        setUser(null);
        setToken(null);
      }
    };

    // Listen for storage events (cross-tab)
    window.addEventListener('storage', handleStorageChange);
    
    // Check once on mount, but don't use interval to avoid constant re-renders
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login method
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  // Logout method
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
