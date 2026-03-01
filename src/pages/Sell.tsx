import { useState, useRef, useCallback } from "react";
import { Upload, X, ImagePlus, DollarSign, Tag, Info, Package, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const categories = ["Guitars & Basses", "Synthesizers", "Headphones", "Speakers & Monitors", "Microphones", "DJ Equipment"];
const conditions = ["Like New", "Excellent", "Good", "Fair"];

type ImageFile = { file: File; preview: string };

const Sell = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedPreview, setSelectedPreview] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImages: ImageFile[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (images.length + newImages.length >= 8) return;
      newImages.push({ file, preview: URL.createObjectURL(file) });
    });
    setImages((prev) => [...prev, ...newImages]);
  }, [images.length]);

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      const next = prev.filter((_, i) => i !== index);
      if (selectedPreview >= next.length) setSelectedPreview(Math.max(0, next.length - 1));
      return next;
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = () => {
    if (!title || !price || !category || !condition || images.length === 0) {
      toast.error("Please fill in all required fields and add at least one image.");
      return;
    }
    toast.success("Your listing has been submitted for review!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">List Your Gear</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill out the details below to create your listing.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: Image Upload + Gallery */}
            <div className="lg:col-span-3 space-y-6">
              {/* Upload Area */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ImagePlus className="h-4 w-4 text-primary" />
                  Photos <span className="text-xs text-muted-foreground">({images.length}/8)</span>
                </label>

                {/* Main Preview */}
                {images.length > 0 && (
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-xl border border-border bg-card">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedPreview}
                        src={images[selectedPreview]?.preview}
                        alt="Selected preview"
                        className="h-full w-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    </AnimatePresence>
                    <button
                      onClick={() => removeImage(selectedPreview)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Thumbnails + Upload Tile */}
                <div className="flex flex-wrap gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPreview(i)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        selectedPreview === i ? "border-primary" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <img src={img.preview} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}

                  {images.length < 8 && (
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                        dragActive
                          ? "border-primary bg-primary/5"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      <Upload className="h-5 w-5" />
                      <span className="mt-0.5 text-[10px] font-medium">Add</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              <Separator />

              {/* Title */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Tag className="h-4 w-4 text-primary" />
                  Title *
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Fender Stratocaster '62 Reissue"
                  className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Info className="h-4 w-4 text-primary" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe condition, history, what's included..."
                  className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Right: Details Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Price */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-border bg-card py-3 pl-9 pr-4 text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Package className="h-4 w-4 text-primary" />
                  Category *
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        category === c
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  Condition *
                </label>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCondition(c)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        condition === c
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Seller Preview */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Seller Profile
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">Guest Seller</p>
                    <p className="text-xs text-muted-foreground">Sign in to build your reputation</p>
                  </div>
                </div>
              </div>

              {/* Listing Preview */}
              {(title || price) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-primary/20 bg-primary/5 p-5"
                >
                  <h3 className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-primary">
                    Listing Preview
                  </h3>
                  {title && <p className="font-display text-sm font-semibold text-foreground">{title}</p>}
                  <div className="mt-1 flex items-center gap-2">
                    {price && <span className="font-display text-lg font-bold text-primary">${Number(price).toLocaleString()}</span>}
                    {condition && <Badge variant="secondary" className="text-xs">{condition}</Badge>}
                  </div>
                  {category && <p className="mt-1 text-xs text-muted-foreground">{category}</p>}
                </motion.div>
              )}

              {/* Submit */}
              <Button size="lg" className="w-full text-base" onClick={handleSubmit}>
                Publish Listing
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
