import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GoogleIcon from "@mui/icons-material/Google";
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";

type NavLinksProps = {
  isLoggedIn: boolean;
  googleLogin: () => void;
  handleLogout: () => void;
};

export default function NavLinksList({
  isLoggedIn,
  googleLogin,
  handleLogout,
}: NavLinksProps) {
  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
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
