import React from "react";
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

type NewPlaceFormProps = {
  place: google.maps.places.PlaceResult;
};

export default function NewPlaceForm({ place }: NewPlaceFormProps) {
  const today = new Date().toJSON().slice(0, 10);
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
        {place.formatted_address}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <form>
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
            control={<Switch color="error" />}
            label="Access Issues"
          />
          <FormControlLabel
            control={<Switch color="error" />}
            label="Safety Issues"
          />
          <FormControlLabel
            control={<Switch />}
            label="Rude or Untrained Staff"
          />
          <FormControlLabel
            control={<Switch />}
            label="Dirty/Hazardous Floor"
          />
          <FormControlLabel
            control={<Switch />}
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
              />
            }
            label="Favorite"
            sx={{ mt: 2 }}
          />
          <TextField
            multiline
            minRows={4}
            id="outlined-textarea"
            label="Private Note"
            sx={{ my: 2 }}
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
          <Rating name="rating" precision={1} size="large" />
          <FormControlLabel
            control={<Switch color="success" />}
            label="Recommend to Other Service Dog Handlers"
            sx={{ my: 2 }}
          />
          <Typography variant="body1">Review</Typography>
          <TextField
            multiline
            minRows={4}
            placeholder="Describe your experience"
            id="outlined-textarea"
            required={true}
          />
        </FormGroup>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </>
  );
}
