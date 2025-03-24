import React from "react";
import { useState } from "react";
import ModalBox from "./ModalBox";
import Typography from "@mui/material/Typography";
import { PlaceType } from "../../types/place";
import { List, ListItem, Rating, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import BlockIcon from "@mui/icons-material/Block";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import TableBarOutlinedIcon from "@mui/icons-material/TableBarOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

type DetailViewProps = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  place: PlaceType;
  author: string;
};

export default function DetailView({
  modalOpen,
  handleCloseModal,
  place,
  author,
}: DetailViewProps) {
  const [editMode, setEditMode] = useState(false);
  const [editPlaceData, setEditPlaceData] = useState(place);
  const today = new Date().toJSON().slice(0, 10);
  return (
    <>
      <ModalBox modalOpen={modalOpen} handleCloseModal={handleCloseModal}>
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
          {author === place.author && place.isFavorite && (
            <FavoriteIcon color="error" />
          )}
        </Stack>
        <Typography variant="body1" gutterBottom>
          {place.address}
        </Typography>
        <Stack direction="column" sx={{ my: 2 }} spacing={1}>
          <Rating readOnly value={place.rating} size="large" />
          {place.recommended && (
            <Chip
              icon={<ThumbUpIcon />}
              label="Recommended"
              color="success"
              size="small"
              sx={{ maxWidth: "min-content", px: 1 }}
            />
          )}
        </Stack>
        <Typography variant="body1">{place.review}</Typography>
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
          <ListItem disableGutters>
            {place.accessIssues && (
              <Chip label="Access Issues" icon={<BlockIcon />} color="error" />
            )}
          </ListItem>
          <ListItem disableGutters>
            {place.safetyIssues && (
              <Chip
                label="Safety Issues"
                icon={<ErrorOutlineOutlinedIcon />}
                color="error"
              />
            )}
          </ListItem>
          <ListItem disableGutters>
            {place.staffIssues && (
              <Chip
                label="Rude or Untrained Staff"
                icon={<SupervisorAccountOutlinedIcon />}
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
            )}
          </ListItem>
          <ListItem disableGutters>
            {place.floorIssues && (
              <Chip
                label="Sticky or Hazardous Floor"
                icon={<DashboardOutlinedIcon />}
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
            )}
          </ListItem>
          <ListItem disableGutters>
            {place.spaceIssues && (
              <Chip
                label="Insufficient Space for Service Dog"
                icon={<TableBarOutlinedIcon />}
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
            )}
          </ListItem>
        </List>
        {author === place.author && place.privateNote.length > 1 && (
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
              Private Note <VisibilityIcon fontSize="small" />
            </Typography>
            <Typography variant="body1">{place.privateNote}</Typography>
          </>
        )}
      </ModalBox>
    </>
  );
}
