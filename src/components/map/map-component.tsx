"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Florist } from "../florist/florist-card";

interface MapProps {
  center: [number, number];
  zoom: number;
  florists: Florist[];
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function Map({ center, zoom, florists }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} zoom={zoom} />

      {florists.map((florist) => (
        <Marker key={florist.id} position={[florist.lat, florist.lng]}>
          <Popup>
            <div className="text-center">
              <h3 className="font-serif font-bold">{florist.name}</h3>
              <p className="text-sm">{florist.rating} ★</p>
              <p className="text-xs text-muted-foreground">{florist.price_tier}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
