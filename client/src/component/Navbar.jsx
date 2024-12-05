import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBagOutlined, Shuffle, Chat, AdminPanelSettings } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { id, role } = useContext(AuthContext);

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
                  
                  {role == "User" ? (
                    <ListItemText inset>
                      <Typography color="inherit" variant="h6">
                        <NavLink
                          to={`/chat/${id}`}
                          className="nav-link flex items-center"
                        >
                          <Chat />
                          Chat
                        </NavLink>
                      </Typography>
                    </ListItemText>
                  ) : (
                    <div></div>
                  )}
                  
                  {role == "Vet" ? (
                    <ListItemText inset>
                      <Typography color="inherit" variant="h6">
                        <NavLink
                          to={`/chats/`}
                          className="nav-link flex items-center"
                        >
                          <Chat />
                          Chats
                        </NavLink>
                      </Typography>
                    </ListItemText>
                  ) : (
                    <div></div>
                  )}
                  
                  {role == "Admin" ? (
                    <ListItemText inset>
                      <Typography color="inherit" variant="h6">
                        <NavLink
                          to={`/admin`}
                          className="nav-link flex items-center"
                        >
                          <AdminPanelSettings />
                          Admin
                        </NavLink>
                      </Typography>
                    </ListItemText>
                  ) : (
                    <div></div>
                  )}
                </>
              </ListItem>
            </List>
            <div className="cursor-pointer" onClick={() => {
              localStorage.clear()
              window.location = "/login"
            }}>Sair</div>
          </div>
        </Toolbar>
      </AppBar>
  );
}
