"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Florist, FloristCard } from "@/components/florist/florist-card";
import MapWrapper from "@/components/map/map-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateDistance, geocodeLocation } from "@/lib/utils";
import floristsData from "@/data/florists.json";
import { Search, Map as MapIcon, List } from "lucide-react";

// Default center (London) if no location
const DEFAULT_CENTER: [number, number] = [51.505, -0.09];

function DiscoveryPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(13);
  const [sortedFlorists, setSortedFlorists] = useState<Florist[]>(floristsData as Florist[]);
  const [showMapMobile, setShowMapMobile] = useState(false);

  // Initialize from search param
  const handleSearch = async (query: string) => {
    if (!query) return;

    // Geocode
    const location = await geocodeLocation(query);
    if (location) {
      const { lat, lng } = location;
      const newCenter: [number, number] = [lat, lng];
      setUserLocation(newCenter);
      setMapCenter(newCenter);
      setZoom(14);

      // Calculate distances and sort
      const floristsWithDistance = floristsData.map((f) => ({
        ...f,
        distance: calculateDistance(lat, lng, f.lat, f.lng),
      }));

      const sorted = floristsWithDistance.sort((a, b) => a.distance - b.distance);
      setSortedFlorists(sorted);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    } else {
      // If no search, maybe try to use user location or just show default list
      // For now, we just show the list unsorted relative to user (since we don't know where they are)
      // or we can treat default center as "user location" for demo purposes?
      // Let's NOT sort by distance if we don't have a location.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Bar / Header */}
      <header className="flex-none border-b bg-white z-10 p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <h1 className="text-xl font-serif font-bold text-primary hidden md:block">FloristFinder</h1>

          <form onSubmit={onSearchSubmit} className="flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search location..."
                className="pl-9 bg-secondary border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" variant="default">Search</Button>
          </form>

          {/* Mobile Map Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMapMobile(!showMapMobile)}
          >
            {showMapMobile ? <List className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content: Split Screen */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Left: List View */}
        <div className={`
          flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300
          ${showMapMobile ? "hidden md:block" : "block"}
          md:w-1/2 lg:w-2/5 xl:w-1/3 md:border-r bg-background
        `}>
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                {userLocation ? "Florists near you" : "All Florists"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {sortedFlorists.length} results
              </span>
            </div>

            {/* Filters placeholder */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {["Price: Any", "Rating: 4.5+", "Delivery", "Pickup"].map((filter) => (
                <Button key={filter} variant="outline" size="sm" className="whitespace-nowrap rounded-full text-xs h-8">
                  {filter}
                </Button>
              ))}
            </div>

            <div className="grid gap-6">
              {sortedFlorists.map((florist) => (
                <FloristCard key={florist.id} florist={florist} />
              ))}
              {sortedFlorists.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No florists found in this area.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Map View */}
        <div className={`
          absolute inset-0 z-0 md:static md:block md:flex-1
          ${showMapMobile ? "block" : "hidden"}
        `}>
          <MapWrapper center={mapCenter} zoom={zoom} florists={sortedFlorists} />
        </div>

      </div>
    </div>
  );
}

export default function DiscoveryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiscoveryPageContent />
    </Suspense>
  );
}
