import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import Auth from "./component/Auth";
import Main from "./component/Main";
import Navbar from "./component/Navbar";
import Products from "./component/Products";
import Services from "./component/Services";
import NotFound from "./component/NotFound";
import Register from "./component/Register";
import { ThemeProvider } from "@mui/material";
import DefaultTheme from "./theme/DefaultTheme";
import Payment from "./component/Payment";
import PaymentSuccess from "./component/PaymentSuccess";
import io from "socket.io-client";
import Chat from "./component/Chat";
import Chats from "./component/Chats";
import Admin from "./component/Admin";

const socket = io.connect("http://localhost:3000");

function IndexRoutes() {
  const { token } = useContext(AuthContext);
  return token ? <AuthRoutes /> : <GuestRoutes />
}
const AuthRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/main/:id" Component={Main} />
        <Route path="/products" Component={Products} />
        <Route path="/services" Component={Services} />
        <Route path="/payment" Component={Payment} />
        <Route path="/payment/success" Component={PaymentSuccess} />
        <Route path="/admin" Component={Admin} />
        <Route path="/chats" Component={Chats} />
        <Route 
          path="/chat/:id"
          element={
            <Chat 
              socket={socket}
            />
          }
        />
        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  )
}

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Auth} />
      <Route path="/login" Component={Auth} />
      <Route path="/register" Component={Register} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={DefaultTheme}>
          <IndexRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
