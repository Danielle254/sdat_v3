import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0E1B41",
        width: "100%",
        paddingBottom: 12,
        marginTop: 40,
        paddingTop: 12,
      }}
    >
      <Box sx={{ maxWidth: "700px", mx: "auto", px: 2 }}>
        <Typography variant="body1" sx={{ color: "white" }}>
          This website was built with Next.js, React, TypeScript, Material UI,
          the Google Maps API, and Firebase (database and user authentication).{" "}
          <Link
            href="https://github.com/Danielle254/sdat_v3"
            sx={{ color: "white", textDecoration: "underline" }}
          >
            View the Code.
          </Link>{" "}
          <Link
            href="mailto:danielle.lindblom@gmail.com"
            sx={{ color: "white", textDecoration: "underline" }}
          >
            Submit Feedback.
          </Link>
        </Typography>
      </Box>
    </footer>
  );
}
