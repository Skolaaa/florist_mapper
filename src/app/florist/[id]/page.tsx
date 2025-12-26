import { Florist } from "@/components/florist/florist-card";
import floristsData from "@/data/florists.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, MapPin, Clock, Truck, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// This is a server component
export default async function FloristDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const florist = (floristsData as any[]).find((f) => f.id === parseInt(id));

  if (!florist) {
    notFound();
  }

  // Cast to Florist type with extended properties
  const shop = florist as Florist & {
    description: string;
    address: string;
    reviews: { user: string; rating: number; comment: string }[];
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Header */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={shop.image}
          alt={shop.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8 text-white">
          <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">{shop.price_tier} • {shop.categories?.join(", ")}</Badge>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">{shop.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{shop.rating}</span>
              <span className="opacity-80">({shop.reviews.length} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{shop.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">

          {/* About Section */}
          <section>
            <h2 className="text-2xl font-serif font-bold mb-4">About the Florist</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {shop.description}
            </p>
            <div className="flex gap-4 mt-6">
              {shop.services?.includes("Delivery") && (
                <div className="flex items-center gap-2 text-sm font-medium bg-secondary/50 px-4 py-2 rounded-lg">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Delivery Available</span>
                </div>
              )}
              {shop.services?.includes("Pickup") && (
                <div className="flex items-center gap-2 text-sm font-medium bg-secondary/50 px-4 py-2 rounded-lg">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <span>Store Pickup</span>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Shop Products */}
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6">Shop Arrangements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {shop.top_sellers.map((product, idx) => (
                <div key={idx} className="group border rounded-xl overflow-hidden hover:shadow-md transition-all">
                  <div className="h-48 bg-secondary/30 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                        {/* Placeholder for product image */}
                        <ShoppingBag className="w-12 h-12" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <span className="font-bold text-primary">${product.price}</span>
                    </div>
                    <Button className="w-full mt-2" variant="outline">Add to Order</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {shop.reviews.map((review, idx) => (
                <div key={idx} className="bg-card border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{review.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="border rounded-xl p-6 bg-card shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-4">Opening Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mon - Fri</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg">Contact Florist</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
