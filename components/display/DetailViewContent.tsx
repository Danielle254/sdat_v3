import React, { useContext } from "react";
import {
  Stack,
  Typography,
  Rating,
  Chip,
  List,
  ListItem,
  Button,
  Box,
} from "@mui/material";
import {
  Favorite,
  ThumbUp,
  Block,
  Visibility,
  Edit,
  Delete,
  ErrorOutlineOutlined,
  SupervisorAccountOutlined,
  DashboardOutlined,
  TableBarOutlined,
} from "@mui/icons-material";
import { MapContext } from "../../src/app/context";
import formatAuthorName from "../../utils/formatAuthorName";
import formatDate from "../../utils/formatDate";

type DetailViewContentProps = {
  placeId: string;
  enableEditMode: () => void;
  handleCloseModal: () => void;
  closeInfoWindow: () => void;
};

export default function DetailViewContent({
  placeId,
  enableEditMode,
  handleCloseModal,
  closeInfoWindow,
}: DetailViewContentProps) {
  const { userId, deletePlace, places } = useContext(MapContext);
  const place = places.find((place) => place.id === placeId);
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ flexWrap: "wrap", mb: 1, mt: 4 }}
      >
        <Typography
          variant="h2"
          fontSize="h5.fontSize"
          sx={{ fontWeight: "bold" }}
        >
          {place.name}
        </Typography>
        {userId === place.author && place.isFavorite && (
          <Favorite color="error" />
        )}
      </Stack>
      <Typography variant="body1" gutterBottom>
        {place.address}
      </Typography>
      <Stack direction="column" sx={{ my: 2 }} spacing={1}>
        <Rating readOnly value={place.rating} size="large" />
        {place.recommended && (
          <Chip
            icon={<ThumbUp />}
            label="Recommended"
            color="success"
            size="small"
            sx={{ maxWidth: "min-content", px: 1 }}
          />
        )}
      </Stack>
      <Typography variant="body1">{place.review}</Typography>
      <Typography variant="body1" sx={{ fontStyle: "italic" }}>
        {`${formatAuthorName(place.authorName)} - Visited: ${formatDate(place.dateVisited)}`}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", mt: 3 }}>
        Issues
      </Typography>
      {!place.accessIssues &&
        !place.safetyIssues &&
        !place.floorIssues &&
        !place.staffIssues &&
        !place.spaceIssues && (
          <Typography sx={{ fontStyle: "italic" }} variant="body1">
            No issues
          </Typography>
        )}
      <List>
        {place.accessIssues && (
          <ListItem disableGutters>
            <Chip label="Access Issues" icon={<Block />} color="error" />
          </ListItem>
        )}
        {place.safetyIssues && (
          <ListItem disableGutters>
            <Chip
              label="Safety Issues"
              icon={<ErrorOutlineOutlined />}
              color="error"
            />
          </ListItem>
        )}
        {place.staffIssues && (
          <ListItem disableGutters>
            <Chip
              label="Rude or Untrained Staff"
              icon={<SupervisorAccountOutlined />}
              sx={{
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                },
              }}
            />
          </ListItem>
        )}
        {place.floorIssues && (
          <ListItem disableGutters>
            <Chip
              label="Sticky or Hazardous Floor"
              icon={<DashboardOutlined />}
              sx={{
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                },
              }}
            />
          </ListItem>
        )}
        {place.spaceIssues && (
          <ListItem disableGutters>
            <Chip
              label="Insufficient Space for Service Dog"
              icon={<TableBarOutlined />}
              sx={{
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                },
              }}
            />
          </ListItem>
        )}
      </List>
      {userId === place.author && place.privateNote.length > 1 && (
        <>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mt: 3,
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            Private Note <Visibility fontSize="small" />
          </Typography>
          <Typography variant="body1">{place.privateNote}</Typography>
        </>
      )}
      {userId === place.author && (
        <>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              component="button"
              startIcon={<Edit />}
              onClick={enableEditMode}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              component="button"
              startIcon={<Delete />}
              onClick={() => {
                deletePlace(place.id);
                handleCloseModal();
                closeInfoWindow();
              }}
            >
              Delete
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}
