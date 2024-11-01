import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, ShoppingBagOutlined, Shuffle } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { id } = useContext(AuthContext);
  const navigate = useNavigate()
  return (
      <AppBar color="primary" position="static">
        <Toolbar>
          <div className="h-full w-full flex flex-row items-center content-center justify-between">
            <Typography variant="h4" color="inherit">
              Virtual Pet
            </Typography>
            <List component="div">
              <ListItem component="div">
                <ListItemText inset>
                  <Typography color="inherit" variant="h6">
                    <NavLink
                      to={`/main/${id}`}
                      className="nav-link flex items-center"
                    >
                      <Home />
                      Home
                    </NavLink>
                  </Typography>
                </ListItemText>

                <>
                  <ListItemText inset>
                    <Typography color="inherit" variant="h6">
                      <NavLink
                        to={"/products"}
                        className="nav-link flex items-center"
                      >
                        <ShoppingBagOutlined />
                        Produtos
                      </NavLink>
                    </Typography>
                  </ListItemText>
                  <ListItemText inset>
                    <Typography color="inherit" variant="h6">
                      <NavLink
                        to={"/services"}
                        className="nav-link flex items-center"
                      >
                        <Shuffle />
                        Serviços
                      </NavLink>
                    </Typography>
                  </ListItemText>
                </>
              </ListItem>
            </List>
            <div className="cursor-pointer" onClick={() => {
              localStorage.clear()
              navigate(0)
            }}>Sair</div>
          </div>
        </Toolbar>
      </AppBar>
  );
}
