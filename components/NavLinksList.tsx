import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GoogleIcon from "@mui/icons-material/Google";
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";

export default function NavLinksList() {
  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <GoogleIcon />
              </ListItemIcon>
              <ListItemText primary="Login with Google" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              href="/info"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary="About this App" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
