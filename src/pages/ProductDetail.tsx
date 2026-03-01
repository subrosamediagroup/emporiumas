import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Star, Shield, ArrowLeft, MessageSquare, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allProducts = [
  { id: 1, title: "Fender Stratocaster '62 Reissue", price: 1450, condition: "Excellent", category: "Guitars & Basses", seller: "VintageAxes", rating: 4.9, verified: true, description: "A stunning reissue of the legendary 1962 Fender Stratocaster. This guitar features an alder body, maple neck with rosewood fingerboard, and three vintage-style single-coil pickups. Plays beautifully with low action and incredible tone.", images: ["https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&h=800&fit=crop"], sellerAvatar: "VA", sellerRating: 4.9, sellerListings: 34, memberSince: "2023" },
  { id: 2, title: "Roland Juno-106 Synthesizer", price: 2800, condition: "Good", category: "Synthesizers", seller: "SynthWizard", rating: 5.0, verified: true, description: "Classic analog polysynth in good working condition. All voice chips have been tested and are functioning perfectly. Includes original power cable and manual.", images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop"], sellerAvatar: "SW", sellerRating: 5.0, sellerListings: 12, memberSince: "2022" },
  { id: 3, title: "Sennheiser HD 650 Headphones", price: 280, condition: "Like New", category: "Headphones", seller: "AudioPhile99", rating: 4.8, verified: false, description: "Open-back audiophile headphones in like-new condition. Used for less than 20 hours. Comes with original box and all accessories.", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop"], sellerAvatar: "AP", sellerRating: 4.8, sellerListings: 8, memberSince: "2024" },
  { id: 4, title: "Yamaha HS8 Studio Monitors (Pair)", price: 520, condition: "Excellent", category: "Speakers & Monitors", seller: "StudioGear", rating: 4.7, verified: true, description: "A pair of Yamaha HS8 monitors in excellent condition. Flat frequency response, perfect for mixing and mastering. Minor cosmetic marks on one cabinet.", images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop"], sellerAvatar: "SG", sellerRating: 4.7, sellerListings: 21, memberSince: "2023" },
  { id: 5, title: "Shure SM7B Microphone", price: 340, condition: "Like New", category: "Microphones", seller: "ProAudioDeals", rating: 4.9, verified: true, description: "Industry-standard dynamic microphone. Perfect for vocals, podcasting, and broadcasting. Includes windscreen and mounting bracket.", images: ["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=800&fit=crop"], sellerAvatar: "PA", sellerRating: 4.9, sellerListings: 45, memberSince: "2021" },
  { id: 6, title: "Pioneer CDJ-2000NXS2", price: 1600, condition: "Good", category: "DJ Equipment", seller: "DJDepot", rating: 4.6, verified: false, description: "Professional DJ multi-player in good condition. Fully functional with minor wear from club use. Great for any serious DJ setup.", images: ["https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop"], sellerAvatar: "DD", sellerRating: 4.6, sellerListings: 15, memberSince: "2023" },
  { id: 7, title: "Gibson Les Paul Standard '50s", price: 2100, condition: "Excellent", category: "Guitars & Basses", seller: "AxeHouse", rating: 4.8, verified: true, description: "Beautiful Les Paul Standard with vintage '50s profile neck. Rich, warm tone from the Burstbucker pickups. Minor pick marks on the pickguard.", images: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=800&fit=crop"], sellerAvatar: "AH", sellerRating: 4.8, sellerListings: 28, memberSince: "2022" },
  { id: 8, title: "Moog Subsequent 37", price: 1350, condition: "Like New", category: "Synthesizers", seller: "SynthLab", rating: 4.9, verified: true, description: "Moog's flagship paraphonic analog synthesizer. Barely used, in pristine condition. Incredible bass and lead sounds.", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=800&fit=crop"], sellerAvatar: "SL", sellerRating: 4.9, sellerListings: 19, memberSince: "2023" },
  { id: 9, title: "Audio-Technica ATH-M50x", price: 120, condition: "Good", category: "Headphones", seller: "BudgetAudio", rating: 4.5, verified: false, description: "Popular studio monitoring headphones. Some wear on the ear pads but still very comfortable. Sound quality is excellent.", images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"], sellerAvatar: "BA", sellerRating: 4.5, sellerListings: 6, memberSince: "2024" },
  { id: 10, title: "KRK Rokit 5 G4 (Pair)", price: 280, condition: "Excellent", category: "Speakers & Monitors", seller: "HomeStudioPro", rating: 4.6, verified: true, description: "Great entry-level studio monitors with built-in DSP. Clean sound with good low-end response for their size.", images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop"], sellerAvatar: "HS", sellerRating: 4.6, sellerListings: 11, memberSince: "2023" },
  { id: 11, title: "Neumann U87 Ai", price: 2600, condition: "Excellent", category: "Microphones", seller: "VocalBooth", rating: 5.0, verified: true, description: "The gold standard of studio condenser microphones. Pristine condition with original shock mount, windscreen, and wooden case.", images: ["https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop"], sellerAvatar: "VB", sellerRating: 5.0, sellerListings: 7, memberSince: "2022" },
  { id: 12, title: "Native Instruments Traktor S4 MK3", price: 650, condition: "Like New", category: "DJ Equipment", seller: "BeatMaster", rating: 4.7, verified: true, description: "All-in-one DJ controller with motorized jog wheels. Barely used, comes with Traktor Pro 3 license.", images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800&h=800&fit=crop"], sellerAvatar: "BM", sellerRating: 4.7, sellerListings: 22, memberSince: "2023" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [offerOpen, setOfferOpen] = useState(false);

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
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/shop" className="flex items-center gap-1 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <span>/</span>
          <span>{product.category}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image Gallery */}
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
            {/* Thumbnails */}
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

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge variant="secondary" className="mb-3 w-fit">{product.condition}</Badge>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{product.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>

            <p className="mt-4 font-display text-3xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </p>

            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{product.rating}</span>
            </div>

            <Separator className="my-6" />

            <p className="leading-relaxed text-foreground/80">{product.description}</p>

            <Separator className="my-6" />

            {/* Seller Info */}
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
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" /> {product.sellerRating}
                    </span>
                    <span>{product.sellerListings} listings</span>
                    <span>Since {product.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1 gap-2 text-base" onClick={() => setOfferOpen(true)}>
                <MessageSquare className="h-5 w-5" />
                Make an Offer
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

        {/* Offer Modal */}
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
                  Listed at <span className="font-semibold text-primary">${product.price.toLocaleString()}</span>
                </p>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Your Offer ($)</label>
                  <input
                    type="number"
                    placeholder={String(Math.round(product.price * 0.9))}
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
