import React, { useState, useContext } from "react";
import {
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Button,
  Checkbox,
  TextField,
  Switch,
  Rating,
} from "@mui/material";
import { Favorite, Visibility, FavoriteBorder } from "@mui/icons-material";
import { MapContext } from "../../context";

type EditPlaceType = {
  placeId: string;
  disableEdit: () => void;
};

export default function EditPlace({ placeId, disableEdit }: EditPlaceType) {
  const today = new Date().toJSON().slice(0, 10);
  const { updatePlace, places } = useContext(MapContext);
  const place = places.find((place) => place.id === placeId);
  const [editPlaceData, setEditPlaceData] = useState(place);

  function handleEditFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    const inputType = e.currentTarget.type;

    if (inputType === "checkbox") {
      setEditPlaceData({
        ...editPlaceData,
        [name]: e.target.checked,
      });
    } else {
      setEditPlaceData({
        ...editPlaceData,
        [name]: value,
      });
    }
  }

  function handleEditRatingChange(
    e: React.SyntheticEvent,
    value: number | null
  ): void {
    setEditPlaceData({
      ...editPlaceData,
      rating: value,
    });
  }
  return (
    <>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold" }}
        fontSize="h5.fontSize"
        gutterBottom={true}
      >
        {place.name}
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        {place.address}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={(e) => {
          disableEdit();
          e.preventDefault();
          updatePlace(editPlaceData);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            marginBottom: "16px",
          }}
        >
          <label htmlFor="visit-date" style={{ fontSize: "16px" }}>
            Date Visited
          </label>
          <input
            required
            id="visit-date"
            type="date"
            name="dateVisited"
            max={today}
            min="2020-01-01"
            style={{
              maxWidth: "200px",
              padding: "4px 0",
              fontSize: "16px",
              cursor: "pointer",
            }}
            value={editPlaceData.dateVisited}
            onChange={handleEditFormChange}
          />
        </div>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Issues
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          Did you experience any of these difficulties during your visit?
        </Typography>
        <FormGroup sx={{ my: 2 }}>
          <FormControlLabel
            control={
              <Switch
                onChange={handleEditFormChange}
                checked={editPlaceData.accessIssues}
                name="accessIssues"
              />
            }
            label="Access Issues"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleEditFormChange}
                checked={editPlaceData.safetyIssues}
                name="safetyIssues"
              />
            }
            label="Safety Issues"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleEditFormChange}
                checked={editPlaceData.staffIssues}
                name="staffIssues"
              />
            }
            label="Rude or Untrained Staff"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleEditFormChange}
                checked={editPlaceData.floorIssues}
                name="floorIssues"
              />
            }
            label="Dirty/Hazardous Floor"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleEditFormChange}
                checked={editPlaceData.spaceIssues}
                name="spaceIssues"
              />
            }
            label="Insufficient Space for Service Dog"
          />
        </FormGroup>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          For You <Visibility fontSize="small" />
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          These details are visible only to you.
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="error"
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={editPlaceData.isFavorite}
                onChange={handleEditFormChange}
                name="isFavorite"
              />
            }
            label="Favorite"
            sx={{ mt: 2 }}
          />
          <TextField
            multiline
            minRows={4}
            label="Private Note"
            name="privateNote"
            sx={{ my: 2 }}
            onChange={handleEditFormChange}
            value={editPlaceData.privateNote}
          />
        </FormGroup>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold" }}
          gutterBottom={true}
        >
          For Others
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          These details are visible to other users.
        </Typography>
        <FormGroup sx={{ my: 2 }}>
          <Typography component="legend">Overall Rating</Typography>
          <Rating
            name="rating"
            precision={1}
            size="large"
            onChange={handleEditRatingChange}
            value={editPlaceData.rating}
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleEditFormChange}
                checked={editPlaceData.recommended}
                name="recommended"
              />
            }
            label="Recommend to Other Service Dog Handlers"
            sx={{ my: 2 }}
          />
          <Typography variant="body1">Review</Typography>
          <TextField
            multiline
            minRows={4}
            placeholder="Describe your experience"
            required={true}
            onChange={handleEditFormChange}
            name="review"
            value={editPlaceData.review}
          />
        </FormGroup>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </>
  );
}
