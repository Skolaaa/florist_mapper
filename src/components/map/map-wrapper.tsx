"use client";

import dynamic from "next/dynamic";
import { Florist } from "../florist/florist-card";

// Dynamic import for Leaflet map to avoid server-side rendering issues
const Map = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
      Loading Map...
    </div>
  ),
});

interface MapWrapperProps {
  center: [number, number];
  zoom: number;
  florists: Florist[];
}

export default function MapWrapper(props: MapWrapperProps) {
  return <Map {...props} />;
}
