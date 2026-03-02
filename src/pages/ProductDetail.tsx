import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Star, Shield, ArrowLeft, MessageSquare, Share2, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const sampleProducts = [
  { id: "sample-1", title: "Fender Stratocaster '62 Reissue", price: 145000, condition: "Excellent", category: "Guitars & Basses", seller: "VintageAxes", rating: 4.9, verified: true, description: "A stunning reissue of the legendary 1962 Fender Stratocaster. This guitar features an alder body, maple neck with rosewood fingerboard, and three vintage-style single-coil pickups.", images: ["https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=800&fit=crop"], sellerAvatar: "VA", sellerRating: 4.9, sellerListings: 34, memberSince: "2023" },
  { id: "sample-2", title: "Roland Juno-106 Synthesizer", price: 280000, condition: "Good", category: "Synthesizers", seller: "SynthWizard", rating: 5.0, verified: true, description: "Classic analog polysynth in good working condition. All voice chips have been tested and are functioning perfectly.", images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop"], sellerAvatar: "SW", sellerRating: 5.0, sellerListings: 12, memberSince: "2022" },
  { id: "sample-3", title: "Sennheiser HD 650 Headphones", price: 28000, condition: "Like New", category: "Headphones", seller: "AudioPhile99", rating: 4.8, verified: false, description: "Open-back audiophile headphones in like-new condition. Used for less than 20 hours.", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop"], sellerAvatar: "AP", sellerRating: 4.8, sellerListings: 8, memberSince: "2024" },
  { id: "sample-4", title: "Yamaha HS8 Studio Monitors (Pair)", price: 52000, condition: "Excellent", category: "Speakers & Monitors", seller: "StudioGear", rating: 4.7, verified: true, description: "A pair of Yamaha HS8 monitors in excellent condition. Flat frequency response, perfect for mixing and mastering.", images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop"], sellerAvatar: "SG", sellerRating: 4.7, sellerListings: 21, memberSince: "2023" },
  { id: "sample-5", title: "Shure SM7B Microphone", price: 34000, condition: "Like New", category: "Microphones", seller: "ProAudioDeals", rating: 4.9, verified: true, description: "Industry-standard dynamic microphone. Perfect for vocals, podcasting, and broadcasting.", images: ["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=800&fit=crop"], sellerAvatar: "PA", sellerRating: 4.9, sellerListings: 45, memberSince: "2021" },
  { id: "sample-6", title: "Pioneer CDJ-2000NXS2", price: 160000, condition: "Good", category: "DJ Equipment", seller: "DJDepot", rating: 4.6, verified: false, description: "Professional DJ multi-player in good condition. Fully functional with minor wear from club use.", images: ["https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop"], sellerAvatar: "DD", sellerRating: 4.6, sellerListings: 15, memberSince: "2023" },
];

interface ProductData {
  id: string;
  title: string;
  price: number;
  condition: string;
  category: string;
  seller: string;
  rating: number;
  verified: boolean;
  description: string;
  images: string[];
  sellerAvatar: string;
  sellerRating: number;
  sellerListings: number;
  memberSince: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [offerOpen, setOfferOpen] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      // Check sample products first
      const sample = sampleProducts.find((p) => p.id === id);
      if (sample) {
        setProduct(sample);
        setLoading(false);
        return;
      }

      // Fetch from database
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", data.seller_id)
          .single();

        const sellerName = profile?.display_name || "Seller";

        setProduct({
          id: data.id,
          title: data.title,
          price: data.price,
          condition: data.condition,
          category: data.category,
          seller: sellerName,
          rating: 0,
          verified: false,
          description: data.description || "",
          images: (data.images as string[]) || [],
          sellerAvatar: sellerName.slice(0, 2).toUpperCase(),
          sellerRating: 0,
          sellerListings: 1,
          memberSince: new Date(data.created_at).getFullYear().toString(),
        });
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      title: product.title,
      price: product.price / 100,
      condition: product.condition,
      image: product.images[0],
      seller: product.seller,
    });
    toast.success(`${product.title} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex items-center justify-center px-4 pt-32 pb-16">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Product not found</h1>
          <p className="mt-2 text-muted-foreground">The item you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/shop" className="flex items-center gap-1 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <span>/</span>
          <span>{product.category}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={`${product.title} - Image ${selectedImage + 1}`}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === i ? "border-primary" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <Badge variant="secondary" className="mb-3 w-fit">{product.condition}</Badge>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{product.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>

            <p className="mt-4 font-display text-3xl font-bold text-primary">
              ${(product.price / 100).toLocaleString()}
            </p>

            {product.rating > 0 && (
              <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{product.rating}</span>
              </div>
            )}

            <Separator className="my-6" />

            <p className="leading-relaxed text-foreground/80">{product.description}</p>

            <Separator className="my-6" />

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">Seller</h3>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                  {product.sellerAvatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-foreground">{product.seller}</span>
                    {product.verified && <Shield className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {product.sellerRating > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" /> {product.sellerRating}
                      </span>
                    )}
                    <span>{product.sellerListings} listings</span>
                    <span>Since {product.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1 gap-2 text-base" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => setOfferOpen(true)}>
                <MessageSquare className="h-5 w-5" />
                Make Offer
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Heart className="h-5 w-5" />
                Save
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {offerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
                onClick={() => setOfferOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 shadow-xl"
              >
                <h2 className="font-display text-xl font-bold text-foreground">Make an Offer</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send an offer for <span className="font-medium text-foreground">{product.title}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Listed at <span className="font-semibold text-primary">${(product.price / 100).toLocaleString()}</span>
                </p>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Your Offer ($)</label>
                  <input
                    type="number"
                    placeholder={String(Math.round(product.price / 100 * 0.9))}
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Message (optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Add a message to the seller..."
                    className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1" size="lg" onClick={() => setOfferOpen(false)}>
                    Send Offer
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setOfferOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
