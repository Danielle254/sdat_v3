import React from "react";
import NavBar from "../../components/NavBar";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyboard Navigation",
};

export default function KeyboardNavigation() {
  return (
    <>
      <NavBar />
      <main>
        <Box
          sx={{
            maxWidth: "700px",
            mx: "auto",
            px: 2,
          }}
        >
          <section>
            <Typography variant="h2" fontSize="h5.fontSize" sx={{ my: 4 }}>
              Keyboard Navigation - Adjust the Map View
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Key</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Left Arrow
                    </TableCell>
                    <TableCell align="left">Shift map left</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Right Arrow
                    </TableCell>
                    <TableCell align="left">Shift map right</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Up Arrow
                    </TableCell>
                    <TableCell align="left">Shift map up</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Down Arrow
                    </TableCell>
                    <TableCell align="left">Shift map down</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      +
                    </TableCell>
                    <TableCell align="left">Zoom map in</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      -
                    </TableCell>
                    <TableCell align="left">Zoom map out</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Home
                    </TableCell>
                    <TableCell align="left">Jump map left by 75%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      End
                    </TableCell>
                    <TableCell align="left">Jump map left by 75%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Page Up
                    </TableCell>
                    <TableCell align="left">Jump map up by 75%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Page Down
                    </TableCell>
                    <TableCell align="left">Jump map down by 75%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          <section>
            <Typography
              variant="h2"
              fontSize="h5.fontSize"
              sx={{ mb: 4, mt: 8 }}
            >
              Keyboard Navigation - Interactive Map Elements
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 8 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Key</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Up, Down, Left, Right Arrows
                    </TableCell>
                    <TableCell align="left">
                      Navigate among map markers
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Enter
                    </TableCell>
                    <TableCell align="left">
                      Open Info Window on selected map marker
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Escape
                    </TableCell>
                    <TableCell align="left">Exit an Info Window</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </Box>
      </main>
    </>
  );
}
