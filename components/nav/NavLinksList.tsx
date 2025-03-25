import * as React from "react";
import {
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
          <ListItemButton
            onClick={isLoggedIn ? handleLogout : googleLogin}
            component="button"
            divider
          >
            <ListItemIcon>
              <Google />
            </ListItemIcon>
            <ListItemText
              primary={isLoggedIn ? "Logout" : "Login with Google"}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/info" component="a">
            <ListItemIcon>
              <Pets />
            </ListItemIcon>
            <ListItemText primary="About this App" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" divider>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
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
