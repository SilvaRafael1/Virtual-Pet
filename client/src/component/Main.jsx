import { useEffect, useState } from "react";
import client from "../api/Api";
import { useParams } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { If, Then, Else } from "react-if";
import { Add } from "@mui/icons-material";

export default function Main() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);
  console.log(pets);

  // Dialog Adição de Pets
  const [openDialogPetAdd, setOpenDialogPetAdd] = useState(false);
  const handleDialogPetAddClick = () => {
    setOpenDialogPetAdd(true);
  };
  const handleDialogPetAddClose = () => {
    setOpenDialogPetAdd(false);
  };

  // Submit Adição de Pets
  const handleSubmitPetAdd = async (data) => {
    await client.post(`/user/${id}/pets/`, data).then(() => {
      handleDialogPetAddClose();
      location.reload();
    });
  };

  const listUser = async () => {
    try {
      const res = await client.get(`/user/${id}`);
      if (res.data) {
        setUser(res.data.user);
        setPets(res.data.user.pets);
      } else {
        setUser([]);
        setPets([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listUser();
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md p-5 w-[1000px]">
        <div>
          <div className="text-3xl font-bold">{user.name}</div>
          <div className="my-2 font-thin">{user.email}</div>
        </div>
        <div>
          <Divider variant="middle" component="div" />
        </div>
        <div className="flex flex-row">
          <div className="w-[50%] p-4">
            <div className="flex flex-row justify-between">
              <div className="font-semibold">Pets</div>
              <div
                onClick={() => {
                  handleDialogPetAddClick(true);
                }}
              >
                <Add fontSize="small" />
              </div>
            </div>
            <div>
              <If condition={user.pets}>
                <Then>
                  <div className="my-4">
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <b>Nome</b>
                            </TableCell>
                            <TableCell align="right">
                              <b>Tipo</b>
                            </TableCell>
                            <TableCell align="right">
                              <b>Raça</b>
                            </TableCell>
                            <TableCell align="right">
                              <b>Porte</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pets.map((pet) => (
                            <TableRow
                              key={pet.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {pet.name}
                              </TableCell>
                              <TableCell align="right">{pet.type}</TableCell>
                              <TableCell align="right">{pet.race}</TableCell>
                              <TableCell align="right">{pet.size}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Then>
                <Else>Você não adicionou nenhum PET até o momento.</Else>
              </If>
            </div>
          </div>
          <Divider
            variant="fullWidth"
            component="div"
            orientation="vertical"
            flexItem
          />
          <div className="w-[50%] p-4 font-semibold">Últimas Compras</div>
        </div>
      </div>

      {/* Dialogo para adição de pets */}
      <Dialog
        open={openDialogPetAdd}
        onClose={handleDialogPetAddClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleSubmitPetAdd(formJson);
          },
        }}
      >
        <DialogTitle>Adicionar Pet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite as informações referentes ao seu pet.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome do Pet"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="type"
            name="type"
            label="Tipo do Pet (ex.: Cachorro, Gato, etc.)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="race"
            name="race"
            label="Raça do Pet"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="size"
            name="size"
            label="Porte do Pet (ex.: Pequeno, Médio, Grande)"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogPetAddClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
