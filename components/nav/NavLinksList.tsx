import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GoogleIcon from "@mui/icons-material/Google";
import PetsIcon from "@mui/icons-material/Pets";
import HomeIcon from "@mui/icons-material/Home";
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
          >
            <ListItemIcon>
              <GoogleIcon />
            </ListItemIcon>
            <ListItemText
              primary={isLoggedIn ? "Logout" : "Login with Google"}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/info">
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="About this App" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
