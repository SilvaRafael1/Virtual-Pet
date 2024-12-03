import { useState, useContext } from "react";
import client from "../api/Api"
import { AuthContext } from "../context/AuthContext";
import { Box, Button, FormControl, FormLabel, TextField, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DefaultTheme from "../theme/DefaultTheme";
import { LockOpen, Undo } from "@mui/icons-material";

export default function Auth() {
  const [errorMessage, setErrorMessage] = useState(null);
  const { setToken, setRole, setId, setAddress } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const response = await client.post("/auth/login", formJson);
      setToken(response.data.user.token);
      setRole(response.data.user.role);
      setId(response.data.user.id);
      setAddress(response.data.user.address);
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("address", response.data.user.address);
    } catch (error) {
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Um erro inesperado aconteceu, por favor tente novamente mais tarde.");
      }
    }
  };

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <div className=" bg-[#fff] w-full max-w-[550px]">
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
              marginTop: 2
            }}
            onSubmit={handleSubmit}
          >
            <div className="flex w-full justify-center">
              <div className="text-4xl font-bold font-serif text-[#273469]">VIRTUAL Pet</div>
            </div>
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <TextField
                id="email"
                type="text"
                name="email"
                placeholder="Seu e-mail"
                autoFocus
                required
                fullWidth
                variant="outlined"
                margin='dense'
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="Sua senha"
                required
                fullWidth
                variant="outlined"
                margin='dense'
              />
            </FormControl>
            <div className="flex justify-center">
              {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
            </div>
            <div className="flex w-full justify-center">
              <Link to={"/register"}>
                <div className="font-semibold text-[#273469]">Não possui conta? Clique aqui para registrar-se</div>
              </Link>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LockOpen />}
            >
              Entrar
            </Button>
          </Box>
        </div>
      </div>
    </ThemeProvider>

  );
};