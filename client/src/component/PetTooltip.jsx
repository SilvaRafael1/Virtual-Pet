import { useState } from 'react'
import { Delete, Edit } from "@mui/icons-material"
import { 
  Tooltip, 
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import client from "../api/Api";

export default function PetTooltip({userid, pet}) {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = (event) => {
    event.preventDefault();
    setOpenDialogDelete(true)
  }
  const handleDeleteClose = () => {
    setError("")
    setOpenDialogDelete(false)
  }
  
  const handleEdit = (event) => {
    event.preventDefault();
    setOpenDialogEdit(true)
  }
  const handleEditClose = () => {
    setOpenDialogEdit(false)
  }

  return (
    <div>
      <Tooltip title="Editar" onClick={handleEdit}>
        <IconButton size='small'>
          <Edit fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title="Excluir" onClick={handleDelete}>
        <IconButton size='small'>
          <Delete fontSize='small' color='red' />
        </IconButton>
      </Tooltip>

      {/* Dialogo para deletar */}
      <Dialog
        open={openDialogDelete}
        onClose={handleDeleteClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            client.delete(`user/${userid}/pets/${pet.id}`).then((response) => {
              if (response.data == "Pet excluído") {
                handleDeleteClose();
                location.reload();
              } else {
                setError(response.data)
              }
            })
          }
        }}
      >
        <DialogTitle>Deletar Arquivo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Tem certeza que deseja deletar o arquivo com o nome de <b>{pet.name}</b>.<br /></span>
            <span className='text-red-500'>
              {error ? error : ""}
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancelar</Button>
          <Button type='submit' variant="contained">Deletar</Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialogo para editar */}
      <Dialog
        open={openDialogEdit}
        onClose={handleEditClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            client.post(`user/${userid}/pets/${pet.id}`, formJson).then(() => {
              handleEditClose();
              location.reload();
            })
          }
        }}
      >
        <DialogTitle>Renomear Arquivo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Você irá editar <b>{pet.name}</b> para:<br /></span>
            <span className='text-red-500'>
              {error ? error : ""}
            </span>
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
            defaultValue={pet.name}
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
            defaultValue={pet.type}
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
            defaultValue={pet.race}
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
            defaultValue={pet.size}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button type='submit' variant="contained">Renomear</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
