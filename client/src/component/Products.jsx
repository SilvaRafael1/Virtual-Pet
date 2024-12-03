import { useEffect, useState } from "react";
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
  Fab,
} from "@mui/material";
import { ShoppingBag, Delete } from "@mui/icons-material";
import client from "../api/Api";
import ProductsTooltip from "./ProductsTooltip";
import { NavLink } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialogProductAdd, setOpenDialogProductAdd] = useState(false);
  const [sacola, setSacola] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0);

  const handleDialogProductAddClick = () => {
    setOpenDialogProductAdd(true);
  };
  const handleDialogProductAddClose = () => {
    setOpenDialogProductAdd(false);
  };

  // Submit Adição de Produtos
  const handleSubmitProductAdd = async (data) => {
    await client.post(`/product`, data).then(() => {
      handleDialogProductAddClose();
      location.reload();
    });
  };

  const listProducts = async () => {
    try {
      const res = await client.get("/product");
      if (res.data) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listProducts();
  }, []);

  return (
    <div className="flex justify-center mt-4">
      {totalProdutos != 0 ? (
        <div className="fixed bottom-8 right-12">
          <NavLink to={"/payment"} state={{ products: sacola }}>
            <Fab color="primary" aria-label="Sacola">
              <ShoppingBag />
            </Fab>
          </NavLink>

          <Fab
            color="secondary"
            aria-label="Quantidade"
            size="small"
            style={{ position: "absolute", left: "40px", bottom: "25px" }}
          >
            {totalProdutos}
          </Fab>

          <Fab
            color="red"
            aria-label="clear"
            size="small"
            style={{ position: "absolute", left: "40px", bottom: "-15px" }}
            onClick={() => {
              setSacola([]);
              setTotalProdutos(0);
            }}
          >
            <Delete />
          </Fab>
        </div>
      ) : (
        <div></div>
      )}
      <div className="border border-solid rounded-md shadow-md p-5 w-[1000px]">
        <div className="mb-2 w-full flex justify-center">
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialogProductAdd(true);
            }}
          >
            Adicionar Produto
          </Button>
        </div>
        <Divider variant="middle" component="div" />
        <div className="my-2"></div>
        <Grid2 container rowSpacing={1} columnSpacing={1}>
          {products.map((product) => (
            <Grid2 key={product.id} size={4}>
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">{product.desc}</Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    R${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      let quant = totalProdutos;
                      quant++;
                      setTotalProdutos(quant);
                      sacola.push(product);
                    }}
                  >
                    Adicionar ao carrinho
                  </Button>
                  <ProductsTooltip product={product} />
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </div>

      {/* Dialogo para adição de produtos */}
      <Dialog
        open={openDialogProductAdd}
        onClose={handleDialogProductAddClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.price = parseFloat(formJson.price);
            handleSubmitProductAdd(formJson);
          },
        }}
      >
        <DialogTitle>Adicionar Produto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite as informações referentes ao seu novo produto.
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
            label="Preço do Produto"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ step: "0.01" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogProductAddClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
