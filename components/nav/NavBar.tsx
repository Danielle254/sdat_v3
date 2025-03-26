"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
} from "@mui/material";
import { Menu, ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import logo from "../../public/logo.png";
import NavLinksList from "./NavLinksList";

import Link from "next/link";

export default function NavBar() {
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
            <Menu />
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
                <ChevronRight />
              </IconButton>
              <NavLinksList />
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
