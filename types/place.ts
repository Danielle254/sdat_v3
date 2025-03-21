export interface Place {
  name: string | undefined;
  address: string | undefined;
  coords: Coords;
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

type Coords = {
  lat: number | undefined;
  lng: number | undefined;
};
