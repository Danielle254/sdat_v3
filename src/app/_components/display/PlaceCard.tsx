import React from "react";
import { Box, Typography, Rating, Chip, Card, Button } from "@mui/material";
import { Favorite, ThumbUp } from "@mui/icons-material";
import cityState from "../../../utils/cityState";

type PlaceCardProps = {
  name: string;
  address: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rating?: number;
  recommended?: boolean;
  resolvePlace?: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult>
  >;
  id: string;
  isFavorite: boolean;
  author: string;
  userId: string;
  setMarker: (input: string) => void;
};

export default function PlaceCard({
  name,
  address,
  rating,
  recommended,
  setModalOpen,
  resolvePlace,
  id,
  author,
  userId,
  isFavorite,
  setMarker,
}: PlaceCardProps) {
  return (
    <>
      <Card
        sx={{
          border: 1,
          borderColor: "lightgray",
          display: "flex",
          flexDirection: "column",
          gap: "1",
          p: 1,
          width: "1",
          "&:hover": {
            border: "1px darkgray solid",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            flexWrap: "nowrap",
          }}
        >
          <button
            onClick={() => {
              setModalOpen(true);
              resolvePlace(null);
              setMarker(id);
            }}
            style={{
              border: "none",
              backgroundColor: "inherit",
              padding: 0,
              cursor: "pointer",
            }}
            className="card-button"
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
          </button>
          {userId === author && isFavorite && (
            <Favorite color="error" fontSize="small" />
          )}
        </Box>
        <Typography variant="body2" gutterBottom={true}>
          {cityState(address)}
        </Typography>
        <Rating readOnly value={rating} size="small" />
        {recommended && (
          <Chip
            icon={<ThumbUp />}
            label="Recommended"
            color="success"
            size="small"
            sx={{ maxWidth: "min-content", px: 1, mt: 1 }}
          />
        )}
      </Card>
    </>
  );
}
