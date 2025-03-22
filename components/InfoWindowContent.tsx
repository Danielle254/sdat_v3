import React from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import cityState from "../utils/cityState";
import Rating from "@mui/material/Rating";

type InfoWindowContentProps = {
  type: "newPlace" | "existingPlace";
  name: string;
  address: string;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoWindowShown?: React.Dispatch<React.SetStateAction<boolean>>;
  rating?: number;
};

export default function InfoWindowContent({
  type,
  name,
  address,
  setModalOpen,
  setInfoWindowShown,
  rating,
}: InfoWindowContentProps) {
  if (type === "newPlace") {
    return (
      <Box sx={{ minWidth: "200px" }}>
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
          fullWidth
        >
          Review
        </Button>
      </Box>
    );
  }

  if (type === "existingPlace") {
    return (
      <Box sx={{ minWidth: "200px" }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold" }}
          gutterBottom={true}
        >
          {name}
        </Typography>
        <Rating readOnly value={rating} size="small" />
        <Typography variant="body2" gutterBottom={true}>
          {cityState(address)}
        </Typography>
        <Button variant="contained" fullWidth>
          View
        </Button>
      </Box>
    );
  }
}
