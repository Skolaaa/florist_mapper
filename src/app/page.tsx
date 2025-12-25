"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/discovery?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/discovery");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
             {/* Abstract organic shapes or pattern could go here */}
             <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-3xl opacity-30"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="z-10 max-w-3xl w-full space-y-8 animate-in fade-in zoom-in duration-700">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-tight">
            FloristFinder
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Discover independent florists nearby. <br className="hidden md:block" />
            Fresh blooms, locally sourced, delivered with love.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto w-full">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-card rounded-full shadow-lg border border-border/50 p-2">
                <MapPin className="ml-3 w-5 h-5 text-primary" />
                <Input
                  type="text"
                  placeholder="Enter your location (e.g., London)"
                  className="border-none shadow-none focus-visible:ring-0 bg-transparent text-lg h-12"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button size="lg" className="rounded-full px-8 font-semibold text-primary-foreground">
                  Search
                </Button>
              </div>
            </div>
          </form>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
               <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary font-serif font-bold text-xl">1</div>
               <h3 className="font-serif text-lg font-bold mb-2">Discover</h3>
               <p className="text-sm text-muted-foreground">Browse local independent florists and view their signature arrangements.</p>
             </div>
             <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
               <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary font-serif font-bold text-xl">2</div>
               <h3 className="font-serif text-lg font-bold mb-2">Compare</h3>
               <p className="text-sm text-muted-foreground">Check ratings, reviews, and prices to find the perfect match for your needs.</p>
             </div>
             <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
               <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary font-serif font-bold text-xl">3</div>
               <h3 className="font-serif text-lg font-bold mb-2">Order</h3>
               <p className="text-sm text-muted-foreground">Support local businesses by ordering directly for pickup or delivery.</p>
             </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        &copy; {new Date().getFullYear()} FloristFinder. All rights reserved.
      </footer>
    </div>
  );
}
