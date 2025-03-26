import * as React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Google, Pets, Home, Gavel } from "@mui/icons-material";
import { useContext } from "react";
import { MapContext } from "../../src/app/context";

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
            sx={{ ml: 2, borderRadius: "20px", mb: 2 }}
          >
            {isLoggedIn ? "Logout" : "Login with Google"}
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/info" component="a" divider>
            <ListItemIcon>
              <Pets />
            </ListItemIcon>
            <ListItemText primary="About this App" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            href="https://www.ada.gov/topics/service-animals/"
            component="a"
            target="_blank"
          >
            <ListItemIcon>
              <Gavel />
            </ListItemIcon>
            <ListItemText primary="Service Dog Laws" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
