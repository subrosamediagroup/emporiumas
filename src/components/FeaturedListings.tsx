import { motion } from "framer-motion";
import { Heart, Star, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const listings = [
  {
    id: 1,
    title: "Fender Stratocaster '62 Reissue",
    price: "$1,450",
    condition: "Excellent",
    seller: "VintageAxes",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=400&fit=crop",
    verified: true,
  },
  {
    id: 2,
    title: "Roland Juno-106 Synthesizer",
    price: "$2,800",
    condition: "Good",
    seller: "SynthWizard",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
    verified: true,
  },
  {
    id: 3,
    title: "Sennheiser HD 650 Headphones",
    price: "$280",
    condition: "Like New",
    seller: "AudioPhile99",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    verified: false,
  },
  {
    id: 4,
    title: "Yamaha HS8 Studio Monitors (Pair)",
    price: "$520",
    condition: "Excellent",
    seller: "StudioGear",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    verified: true,
  },
  {
    id: 5,
    title: "Shure SM7B Microphone",
    price: "$340",
    condition: "Like New",
    seller: "ProAudioDeals",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
    verified: true,
  },
  {
    id: 6,
    title: "Pioneer CDJ-2000NXS2",
    price: "$1,600",
    condition: "Good",
    seller: "DJDepot",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=400&h=400&fit=crop",
    verified: false,
  },
];

const FeaturedListings = () => {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Trending Gear
            </h2>
            <p className="text-muted-foreground">Hot listings picked for you</p>
          </div>
          <a
            href="#"
            className="hidden text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline"
          >
            View all →
          </a>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30"
            >
              <Link to={`/product/${item.id}`}>
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute left-3 top-3 border-none bg-background/70 text-foreground backdrop-blur-sm">
                    {item.condition}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="mb-1 font-display text-sm font-semibold text-foreground line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mb-3 font-display text-xl font-bold text-primary">{item.price}</p>

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
              </Link>
              <button className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-muted-foreground backdrop-blur-sm transition-colors hover:text-primary">
                <Heart className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
