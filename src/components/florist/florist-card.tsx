import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Product = {
  name: string;
  price: number;
};

export type Florist = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  price_tier: string;
  image: string;
  services?: string[];
  categories?: string[];
  top_sellers: Product[];
  distance?: number;
};

interface FloristCardProps {
  florist: Florist;
}

export function FloristCard({ florist }: FloristCardProps) {
  return (
    <Link href={`/florist/${florist.id}`} className="block group">
      <Card className="overflow-hidden border-none shadow-md group-hover:shadow-xl transition-all duration-300 bg-card h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={florist.image}
            alt={florist.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge
            className="absolute top-3 right-3 bg-white/90 text-foreground hover:bg-white/100 backdrop-blur-sm"
            variant="secondary"
          >
            {florist.price_tier}
          </Badge>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{florist.name}</h3>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{florist.rating}</span>
            </div>
          </div>
          {florist.distance !== undefined && (
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{florist.distance} miles away</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="mt-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Top Sellers
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {florist.top_sellers.map((product, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-24 p-2 bg-secondary/50 rounded-lg flex flex-col items-center text-center"
              >
                {/* Placeholder for product image if we had one, using a generic flower icon or just styling */}
                <div className="w-full aspect-square bg-white rounded-md mb-2 overflow-hidden relative">
                   {/* In a real app, product images would go here. We'll use a colored div for now */}
                   <div className="absolute inset-0 bg-primary/20" />
                </div>
                <span className="text-[10px] font-medium line-clamp-2 leading-tight h-8">
                  {product.name}
                </span>
                <span className="text-xs font-bold mt-1 text-primary">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </div>
        </CardContent>
      </Card>
    </Link>
  );
}
