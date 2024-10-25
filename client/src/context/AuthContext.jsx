import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedId = localStorage.getItem("id");
    setToken(storedToken);
    setRole(storedRole);
    setId(storedId);
    setLoading(false); 
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, role, setRole, loading, id, setId }}>
      {children}
    </AuthContext.Provider>
  );
};