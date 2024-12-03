import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import Auth from "./component/Auth";
import Main from "./component/Main";
import Navbar from "./component/Navbar";
import Products from "./component/Products";
import NotFound from "./component/NotFound";
import Register from "./component/Register";
import { ThemeProvider } from "@mui/material";
import DefaultTheme from "./theme/DefaultTheme";
import Payment from "./component/Payment";
import PaymentSuccess from "./component/PaymentSuccess";

const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token && <Navbar />}
      <Routes>
        {token ? (
          <>
            <Route exact path="/main/:id" Component={Main} />
            <Route path="/products" Component={Products} />
            <Route path="/payment" Component={Payment} />
            <Route path="/payment/success" Component={PaymentSuccess} />
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
    <ThemeProvider theme={DefaultTheme}>
        <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
