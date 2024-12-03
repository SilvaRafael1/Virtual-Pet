import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedId = localStorage.getItem("id");
    const storedAddress = localStorage.getItem("address")
    setToken(storedToken);
    setRole(storedRole);
    setId(storedId);
    setAddress(storedAddress);
    setLoading(false); 
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, role, setRole, loading, id, setId, address, setAddress }}>
      {children}
    </AuthContext.Provider>
  );
};