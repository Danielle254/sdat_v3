export interface NewPlaceType {
  name: string | undefined;
  address: string | undefined;
  coords: google.maps.LatLng | undefined;
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
}

export interface ExistingPlaceType {
  name: string | undefined;
  address: string | undefined;
  coords: google.maps.LatLng;
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
