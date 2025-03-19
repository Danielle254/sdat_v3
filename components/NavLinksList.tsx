import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
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
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
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
              }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Info" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
