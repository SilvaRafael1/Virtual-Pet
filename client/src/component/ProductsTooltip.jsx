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

export default function ProductsTooltip ({product}) {
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
            client.delete(`/product/${product.id}`).then((response) => {
              if (response.data == "Produto excluído") {
                handleDeleteClose();
                location.reload();
              } else {
                setError(response.data)
              }
            })
          }
        }}
      >
        <DialogTitle>Deletar Produto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Tem certeza que deseja deletar o produto com o nome de <b>{product.name}</b>.<br /></span>
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
            formJson.price = parseFloat(formJson.price)
            client.post(`/product/${product.id}`, formJson).then(() => {
              handleEditClose();
              location.reload();
            })
          }
        }}
      >
        <DialogTitle>Renomear Produto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Você irá editar <b>{product.name}</b> para:<br /></span>
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
            label="Nome do Produto"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={product.name}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="desc"
            name="desc"
            label="Descrição do Produto"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={product.desc}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="image"
            name="image"
            label="URL da imagem"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={product.image}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Preço do Produto"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ step: "0.01" }}
            defaultValue={product.price}
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