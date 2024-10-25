import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import Auth from "./component/Auth";
const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Routes>
          <>
            <Route path="/login" Component={Auth} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
      </Routes>
    </>
  );

}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
