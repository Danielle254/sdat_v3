import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function PlacesAutocomplete(/* { onPlaceSelect } */) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  /*   const inputRef = useRef(); */
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places /* || !inputRef.current */) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
      componentRestrictions: { country: ["us"] },
      types: ["establishment"],
    };

    /* setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options)); */
  }, [places]);

  /*   useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
      inputRef.current.value = "";
    });
  }, [onPlaceSelect, placeAutocomplete]); */

  return (
    <TextField
      placeholder="Search for a Business"
      variant="standard"
      sx={{
        zIndex: "10",
        position: "absolute",
        top: "10px",
        right: "10px",
        borderRadius: "25px",
        bgcolor: "primary.light",
        py: 1,
        px: 2,
        width: { xs: "90%", sm: "40ch" },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
          disableUnderline: true,
        },
      }}
    />
  );
}
