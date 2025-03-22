import React from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import cityState from "../utils/cityState";

type InfoWindowContentProps = {
  type: "newPlace" | "existingPlace";
  name: string;
  address: string;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoWindowShown?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InfoWindowContent({
  type,
  name,
  address,
  setModalOpen,
  setInfoWindowShown,
}: InfoWindowContentProps) {
  if (type === "newPlace") {
    return (
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold" }}
          gutterBottom={true}
        >
          {name}
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          {address}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setModalOpen(true);
            setInfoWindowShown(false);
          }}
        >
          Review
        </Button>
      </Box>
    );
  }

  if (type === "existingPlace") {
    return (
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold" }}
          gutterBottom={true}
        >
          {name}
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          {cityState(address)}
        </Typography>
        <Button variant="contained">View Details</Button>
      </Box>
    );
  }
}
