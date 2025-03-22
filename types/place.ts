export interface PlaceType {
  name: string | undefined;
  address: string | undefined;
  coords: Coords | undefined;
  author: string;
  isFavorite: boolean;
  dateVisited: string;
  accessIssues: boolean;
  safetyIssues: boolean;
  staffIssues: boolean;
  floorIssues: boolean;
  spaceIssues: boolean;
  privateNote: string;
  rating: number | null;
  recommended: boolean;
  review: string;
  id: string;
}

type Coords = {
  lat: number;
  lng: number;
};

export interface SearchedPlaceType {
  name: string;
  address: string;
  coordinates: google.maps.LatLng;
}
