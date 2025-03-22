import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

interface MapHandlerProps {
  place: google.maps.places.PlaceResult;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

export default function MapHandler({ place, marker }: MapHandlerProps): void {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;
    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);
  return null;
}
