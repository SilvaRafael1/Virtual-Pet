import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Add, ShoppingBagOutlined, Shuffle } from "@mui/icons-material";
import DefaultTheme from "../theme/DefaultTheme";

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={DefaultTheme}>
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
                      to={"/main"}
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
                        to={"/getPedidos"}
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
                        to={"/produtos/random"}
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
    </ThemeProvider>
  );
}
