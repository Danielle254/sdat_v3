import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { PlaceType } from "../types/place";
import { entriesCollection } from "../api/firebase";
import { addDoc } from "firebase/firestore";
import ModalBox from "./ModalBox";
import { v4 as uuidv4 } from "uuid";

interface NewPlaceFormProps {
  name: string | undefined;
  address: string | undefined;
  coords: google.maps.LatLng;
  modalOpen: boolean;
  handleCloseModal: () => void;
}

export default function NewPlaceForm({
  name,
  address,
  coords,
  modalOpen,
  handleCloseModal,
}: NewPlaceFormProps) {
  const today = new Date().toJSON().slice(0, 10);
  const [newPlaceData, setNewPlaceData] = useState<PlaceType>({
    name: name,
    address: address,
    coords: { lat: coords?.lat(), lng: coords?.lng() },
    author: "",
    isFavorite: false,
    dateVisited: "",
    accessIssues: false,
    safetyIssues: false,
    staffIssues: false,
    floorIssues: false,
    spaceIssues: false,
    privateNote: "",
    rating: null,
    recommended: false,
    review: "",
    id: uuidv4(),
  });

  async function addNewPlace(
    e: React.FormEvent<HTMLFormElement>,
    place: PlaceType
  ) {
    e.preventDefault();
    const docRef = await addDoc(entriesCollection, place);
    handleCloseModal();
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    const inputType = e.currentTarget.type;

    if (inputType === "checkbox") {
      setNewPlaceData({
        ...newPlaceData,
        [name]: e.target.checked,
      });
    } else {
      setNewPlaceData({
        ...newPlaceData,
        [name]: value,
      });
    }
  }

  function handleRatingChange(
    e: React.SyntheticEvent,
    value: number | null
  ): void {
    setNewPlaceData({
      ...newPlaceData,
      rating: value,
    });
  }
  return (
    <>
      <ModalBox modalOpen={modalOpen} handleCloseModal={handleCloseModal}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold" }}
          fontSize="h5.fontSize"
          gutterBottom={true}
        >
          {name}
        </Typography>
        <Typography variant="body1" gutterBottom={true}>
          {address}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <form
          onSubmit={(e) => {
            addNewPlace(e, newPlaceData);
            setNewPlaceData({
              name: "",
              address: "",
              coords: null,
              author: "",
              isFavorite: false,
              dateVisited: "",
              accessIssues: false,
              safetyIssues: false,
              staffIssues: false,
              floorIssues: false,
              spaceIssues: false,
              privateNote: "",
              rating: null,
              recommended: false,
              review: "",
              id: "",
            });
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
              value={newPlaceData.dateVisited}
              onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  checked={newPlaceData.accessIssues}
                  name="accessIssues"
                />
              }
              label="Access Issues"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={handleFormChange}
                  checked={newPlaceData.safetyIssues}
                  name="safetyIssues"
                />
              }
              label="Safety Issues"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={handleFormChange}
                  checked={newPlaceData.staffIssues}
                  name="staffIssues"
                />
              }
              label="Rude or Untrained Staff"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={handleFormChange}
                  checked={newPlaceData.floorIssues}
                  name="floorIssues"
                />
              }
              label="Dirty/Hazardous Floor"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={handleFormChange}
                  checked={newPlaceData.spaceIssues}
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
            For You <VisibilityIcon fontSize="small" />
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
                  checked={newPlaceData.isFavorite}
                  onChange={handleFormChange}
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
              onChange={handleFormChange}
              value={newPlaceData.privateNote}
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
              onChange={handleRatingChange}
              value={newPlaceData.rating}
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={handleFormChange}
                  checked={newPlaceData.recommended}
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
              onChange={handleFormChange}
              name="review"
              value={newPlaceData.review}
            />
          </FormGroup>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </ModalBox>
    </>
  );
}
