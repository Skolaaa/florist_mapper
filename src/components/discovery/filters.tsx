"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export type FilterState = {
  price: string[];
  services: string[];
  categories: string[];
};

interface FiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const PRICES = ["$", "$$", "$$$"];
const SERVICES = ["Delivery", "Pickup"];
const CATEGORIES = ["Bouquets", "Wedding", "Modern", "Plants", "Luxury", "Events", "Dried"];

export function Filters({ filters, setFilters }: FiltersProps) {

  const toggleFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    setFilters({ ...filters, [key]: updated });
  };

  const clearFilters = () => {
    setFilters({ price: [], services: [], categories: [] });
  };

  const hasActiveFilters =
    filters.price.length > 0 ||
    filters.services.length > 0 ||
    filters.categories.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Filters</span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-xs text-primary hover:text-primary/80"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {/* Price Filters */}
        {PRICES.map((price) => (
          <Badge
            key={price}
            variant={filters.price.includes(price) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => toggleFilter("price", price)}
          >
            {price}
          </Badge>
        ))}

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Service Filters */}
        {SERVICES.map((service) => (
          <Badge
            key={service}
            variant={filters.services.includes(service) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => toggleFilter("services", service)}
          >
            {service}
          </Badge>
        ))}
      </div>

      {/* Category Filters (Scrollable) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <Badge
            key={cat}
            variant={filters.categories.includes(cat) ? "secondary" : "outline"}
            className={`
              cursor-pointer whitespace-nowrap
              ${filters.categories.includes(cat) ? "bg-secondary text-secondary-foreground border-primary" : "text-muted-foreground"}
            `}
            onClick={() => toggleFilter("categories", cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>
    </div>
  );
}
