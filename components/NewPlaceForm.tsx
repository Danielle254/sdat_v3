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

export default function NewPlaceForm() {
  return (
    <>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold" }}
        fontSize="h5.fontSize"
        gutterBottom={true}
      >
        Biz Name
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        Address
      </Typography>
      <Divider sx={{ my: 2 }} />
      <form>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Issues
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          Did you experience any of these difficulties during your visit?
        </Typography>
        <FormGroup>
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
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          For You
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
          />
          <TextField
            multiline
            minRows={4}
            id="outlined-textarea"
            label="Private Note"
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
        <FormGroup>
          <Typography component="legend">Overall Rating</Typography>
          <Rating name="rating" precision={1} size="large" />
          <FormControlLabel
            control={<Switch color="success" />}
            label="Recommend to Other Service Dog Handlers"
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
        <Button variant="contained" type="submit" sx={{ mt: 4 }}>
          Submit
        </Button>
      </form>
    </>
  );
}
