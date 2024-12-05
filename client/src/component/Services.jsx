import { useEffect, useState, useContext } from "react";
import {
  Divider,
  Grid2,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import client from "../api/Api";
import ServicesTooltip from "./ServicesTooltip";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Services() {
  const [services, setServices] = useState([]);
  const [sacola, setSacola] = useState([]);
  const [openDialogServicesAdd, setOpenDialogServicesAdd] = useState(false);
  const { role } = useContext(AuthContext);

  const handleDialogServicesAddClick = () => {
    setOpenDialogServicesAdd(true);
  };
  const handleDialogServicesAddClose = () => {
    setOpenDialogServicesAdd(false);
  };

  // Submit Adição de Serviços
  const handleSubmitServicesAdd = async (data) => {
    await client.post(`/services`, data).then(() => {
      handleDialogServicesAddClose();
      location.reload();
    });
  };

  const listServices = async () => {
    try {
      const res = await client.get("/services");
      if (res.data) {
        setServices(res.data.services);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listServices();
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md shadow-md p-5 w-[1000px]">
        {role == "Admin" ? (
          <div>
            <div className="mb-2 w-full flex justify-center">
              <Button
                variant="contained"
                onClick={() => {
                  setOpenDialogServicesAdd(true);
                }}
              >
                Adicionar Serviço
              </Button>
            </div>
            <Divider variant="middle" component="div" />
            <div className="my-2"></div>
          </div>
        ) : (
          <div></div>
        )}
        
        <Grid2 container rowSpacing={1} columnSpacing={1}>
          {services.map((service) => (
            <Grid2 key={service.id} size={4}>
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image={service.image}
                  title={service.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {service.name}
                  </Typography>
                  <Typography variant="body2">{service.desc}</Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    R${service.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink to={"/payment"} state={{ products: sacola }}>
                    <Button size="small" onClick={() => {
                      sacola.push(service);
                    }}>
                      Comprar Serviço
                    </Button>
                  </NavLink>
                  {role == "Admin" ? (
                    <ServicesTooltip service={service} />
                  ) : (
                    <div></div>
                  )}
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </div>

      {/* Dialogo para adição de serviços */}
      <Dialog
        open={openDialogServicesAdd}
        onClose={handleDialogServicesAddClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.price = parseFloat(formJson.price);
            handleSubmitServicesAdd(formJson);
          },
        }}
      >
        <DialogTitle>Adicionar Serviço</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite as informações referentes ao seu novo serviço.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome do Serviço"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="desc"
            name="desc"
            label="Descrição do Serviço"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="image"
            name="image"
            label="URL de Imagem"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Preço do Serviço"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ step: "0.01" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogServicesAddClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
