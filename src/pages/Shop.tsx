import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, Star, Shield, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allProducts = [
  { id: 1, title: "Fender Stratocaster '62 Reissue", price: 1450, condition: "Excellent", category: "Guitars & Basses", seller: "VintageAxes", rating: 4.9, verified: true, image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=400&fit=crop" },
  { id: 2, title: "Roland Juno-106 Synthesizer", price: 2800, condition: "Good", category: "Synthesizers", seller: "SynthWizard", rating: 5.0, verified: true, image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop" },
  { id: 3, title: "Sennheiser HD 650 Headphones", price: 280, condition: "Like New", category: "Headphones", seller: "AudioPhile99", rating: 4.8, verified: false, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
  { id: 4, title: "Yamaha HS8 Studio Monitors (Pair)", price: 520, condition: "Excellent", category: "Speakers & Monitors", seller: "StudioGear", rating: 4.7, verified: true, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop" },
  { id: 5, title: "Shure SM7B Microphone", price: 340, condition: "Like New", category: "Microphones", seller: "ProAudioDeals", rating: 4.9, verified: true, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop" },
  { id: 6, title: "Pioneer CDJ-2000NXS2", price: 1600, condition: "Good", category: "DJ Equipment", seller: "DJDepot", rating: 4.6, verified: false, image: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=400&h=400&fit=crop" },
  { id: 7, title: "Gibson Les Paul Standard '50s", price: 2100, condition: "Excellent", category: "Guitars & Basses", seller: "AxeHouse", rating: 4.8, verified: true, image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop" },
  { id: 8, title: "Moog Subsequent 37", price: 1350, condition: "Like New", category: "Synthesizers", seller: "SynthLab", rating: 4.9, verified: true, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
  { id: 9, title: "Audio-Technica ATH-M50x", price: 120, condition: "Good", category: "Headphones", seller: "BudgetAudio", rating: 4.5, verified: false, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop" },
  { id: 10, title: "KRK Rokit 5 G4 (Pair)", price: 280, condition: "Excellent", category: "Speakers & Monitors", seller: "HomeStudioPro", rating: 4.6, verified: true, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop" },
  { id: 11, title: "Neumann U87 Ai", price: 2600, condition: "Excellent", category: "Microphones", seller: "VocalBooth", rating: 5.0, verified: true, image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=400&fit=crop" },
  { id: 12, title: "Native Instruments Traktor S4 MK3", price: 650, condition: "Like New", category: "DJ Equipment", seller: "BeatMaster", rating: 4.7, verified: true, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
];

const categories = ["All", "Guitars & Basses", "Synthesizers", "Headphones", "Speakers & Monitors", "Microphones", "DJ Equipment"];
const conditions = ["All", "Like New", "Excellent", "Good", "Fair"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $250", min: 0, max: 250 },
  { label: "$250 – $500", min: 250, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { label: "$2,000+", min: 2000, max: Infinity },
];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Rating"];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "All";
  const [category, setCategory] = useState(categoryParam);
  const [condition, setCondition] = useState("All");
  const [priceRange, setPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("Newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let results = allProducts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (condition !== "All" && p.condition !== condition) return false;
      if (p.price < priceRange.min || p.price > priceRange.max) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.seller.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    switch (sortBy) {
      case "Price: Low to High": results.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": results.sort((a, b) => b.price - a.price); break;
      case "Rating": results.sort((a, b) => b.rating - a.rating); break;
    }
    return results;
  }, [category, condition, priceRange, sortBy, searchQuery]);

  const activeFilterCount = [category !== "All", condition !== "All", priceRange.label !== "All"].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("All");
    setCondition("All");
    setPriceRange(priceRanges[0]);
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h4 className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
      {children}
    </div>
  );

  const filterContent = (
    <>
      <FilterSection title="Category">
        <div className="flex flex-col gap-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                category === c
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex flex-col gap-1">
          {priceRanges.map((r) => (
            <button
              key={r.label}
              onClick={() => setPriceRange(r)}
              className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                priceRange.label === r.label
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Condition">
        <div className="flex flex-col gap-1">
          {conditions.map((c) => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                condition === c
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full gap-2">
          <X className="h-3.5 w-3.5" /> Clear Filters
        </Button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {searchQuery ? `Results for "${searchQuery}"` : "Shop Gear"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} items found
              {searchQuery && (
                <button
                  onClick={() => setSearchParams({})}
                  className="ml-2 text-primary hover:text-primary/80"
                >
                  Clear search
                </button>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-border bg-card py-2 pl-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {sortOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            {filterContent}
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-border bg-background p-6 lg:hidden"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-foreground">Filters</h3>
                    <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  {filterContent}
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-foreground">No items match your filters</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your criteria</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item, i) => (
                  <Link to={`/product/${item.id}`} key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30"
                  >
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-muted-foreground backdrop-blur-sm transition-colors hover:text-primary">
                        <Heart className="h-4 w-4" />
                      </button>
                      <Badge className="absolute left-3 top-3 border-none bg-background/70 text-foreground backdrop-blur-sm">
                        {item.condition}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <p className="mb-0.5 text-xs text-muted-foreground">{item.category}</p>
                      <h3 className="mb-1 font-display text-sm font-semibold text-foreground line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="mb-3 font-display text-xl font-bold text-primary">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          {item.verified && <Shield className="h-3.5 w-3.5 text-primary" />}
                          <span>{item.seller}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
