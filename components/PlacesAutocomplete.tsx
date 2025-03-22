import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import type { SearchedPlaceType } from "../types/place";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: SearchedPlaceType) => void;
}

export default function PlacesAutocomplete({
  onPlaceSelect,
}: PlaceAutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
      componentRestrictions: { country: ["us"] },
      types: ["establishment"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      if (typeof placeAutocomplete.getPlace() !== "undefined") {
        onPlaceSelect({
          name: placeAutocomplete.getPlace().name!,
          address: placeAutocomplete.getPlace().formatted_address!,
          coordinates: placeAutocomplete.getPlace().geometry?.location!,
        });
      }
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <input
      ref={inputRef}
      className="autocomplete"
      placeholder="Search for a Business"
    />
  );
}
