import { useState } from "react";
import client from "../api/Api"
import { Box, Button, FormControl, FormLabel, TextField, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import DefaultTheme from "../theme/DefaultTheme";
import { LockOpen } from "@mui/icons-material";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const response = await client.post("/auth/register", formJson);
      console.log(response)
      window.location.href = "/login"
    } catch (error) {
      console.error("Authentication failed:", error);
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
            <div className="flex flex-col w-full items-center">
              <div className="text-4xl font-bold font-serif text-[#273469]">VIRTUAL Pet</div>
              <div className="text-2xl font-semibold font-serif text-[#30343F]">Registre-se</div>
            </div>
            <FormControl>
              <FormLabel htmlFor="name">Nome Completo</FormLabel>
              <TextField
                id="name"
                type="text"
                name="name"
                placeholder="Insira seu nome"
                autoFocus
                required
                fullWidth
                variant="outlined"
                margin='dense'
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Endereço Completo</FormLabel>
              <TextField
                id="address"
                type="text"
                name="address"
                placeholder="Insira seu endereço completo"
                autoFocus
                required
                fullWidth
                variant="outlined"
                margin='dense'
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <TextField
                id="email"
                type="text"
                name="email"
                placeholder="Insira seu e-mail"
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
                placeholder="Insira sua senha"
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
              <Link to={"/login"}>
                <div className="font-semibold text-[#273469]">Já possui conta? Clique aqui para entrar</div>
              </Link>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LockOpen />}
            >
              Registrar
            </Button>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};