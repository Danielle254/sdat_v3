"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import logo from "../public/logo.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavLinksList from "./NavLinksList";
import Divider from "@mui/material/Divider";
import Link from "next/link";

type NavBarProps = {
  isLoggedIn: boolean;
  googleLogin: () => void;
  handleLogout: () => void;
};

export default function NavBar({
  isLoggedIn,
  googleLogin,
  handleLogout,
}: NavBarProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              src={logo}
              height={30}
              alt=""
              width={30}
              style={{ marginRight: "5px" }}
            />
            <Typography
              variant="h1"
              component="div"
              sx={{ flexGrow: 1 }}
              fontSize="h5.fontSize"
            >
              Service Dogs Around Town
            </Typography>
          </Link>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
            <Box sx={{ width: 300 }} role="presentation">
              <IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(false)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <ChevronRightIcon />
              </IconButton>
              <Divider />
              <NavLinksList
                isLoggedIn={isLoggedIn}
                googleLogin={googleLogin}
                handleLogout={handleLogout}
              />
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
