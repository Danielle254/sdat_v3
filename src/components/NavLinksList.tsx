import * as React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Google, Pets, Home, Gavel, Keyboard } from "@mui/icons-material";
import { useContext } from "react";
import { MapContext } from "../app/context";

export default function NavLinksList() {
  const { isLoggedIn, googleLogin, handleLogout } = useContext(MapContext);
  return (
    <>
      <List>
        <ListItem disablePadding>
          <Button
            onClick={isLoggedIn ? handleLogout : googleLogin}
            component="button"
            variant="contained"
            color="info"
            startIcon={<Google />}
            sx={{
              ml: 2,
              borderRadius: "20px",
              mb: 2,
              px: 2,
            }}
          >
            {isLoggedIn ? "Logout" : "Login with Google"}
          </Button>
        </ListItem>
        <ListItem disablePadding sx={{ ml: 1 }}>
          <ListItemButton href="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ ml: -1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ ml: 1 }}>
          <ListItemButton href="/info" component="a">
            <ListItemIcon>
              <Pets />
            </ListItemIcon>
            <ListItemText primary="About this App" sx={{ ml: -1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ ml: 1 }}>
          <ListItemButton href="/keyboardnavigation" component="a" divider>
            <ListItemIcon>
              <Keyboard />
            </ListItemIcon>
            <ListItemText primary="Keyboard Navigation" sx={{ ml: -1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ ml: 1 }}>
          <ListItemButton
            href="https://www.ada.gov/topics/service-animals/"
            component="a"
            target="_blank"
          >
            <ListItemIcon>
              <Gavel />
            </ListItemIcon>
            <ListItemText primary="Service Dog Laws" sx={{ ml: -1 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
