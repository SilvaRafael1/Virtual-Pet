import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import Auth from "./component/Auth";
import Main from "./component/Main";
import Navbar from "./component/Navbar";
import NotFound from "./component/NotFound";
import Register from "./component/Register";

const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token && <Navbar />}
      <Routes>
        {token ? (
          <>
            <Route exact path="/main/:id" Component={Main} />
            <Route path="*" Component={NotFound} />
          </>
        ) : (
          <>
            <Route path="/login" Component={Auth} />
            <Route path="/register" Component={Register} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
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
