"use client";

import { createContext } from "react";

type MapContextType = {
  isLoggedIn: boolean;
  userId: string;
};

const MapContext = createContext<MapContextType | null>(null);

export default MapContext;
