import React from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import cityState from "../utils/cityState";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

type InfoWindowContentProps = {
  type: "newPlace" | "existingPlace";
  name: string;
  address: string;

  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoWindowShown?: React.Dispatch<React.SetStateAction<boolean>>;
  rating?: number;
  recommended?: boolean;
};

export default function InfoWindowContent({
  type,
  name,
  address,
  setModalOpen,
  setInfoWindowShown,
  rating,
  recommended,
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
      <Box
        sx={{
          minWidth: "200px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold" }}
          gutterBottom={true}
        >
          {name}
        </Typography>
        <Rating readOnly value={rating} size="small" />
        {recommended && (
          <Chip
            icon={<ThumbUpIcon />}
            label="Recommended"
            color="success"
            size="small"
            sx={{ maxWidth: "min-content", px: 1 }}
          />
        )}
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
