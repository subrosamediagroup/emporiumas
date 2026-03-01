import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const shippingEstimate = totalPrice > 500 ? 0 : 14.99;
  const taxEstimate = totalPrice * 0.08;
  const orderTotal = totalPrice + shippingEstimate + taxEstimate;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/shop" className="flex items-center gap-1 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Shopping Cart {totalItems > 0 && <span className="text-muted-foreground">({totalItems})</span>}
        </h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-foreground">Your cart is empty</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Discover amazing deals on music gear, instruments, and audio equipment.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link to="/shop">Browse the Shop</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between pb-4">
                <span className="text-sm font-medium text-muted-foreground">{totalItems} item{totalItems !== 1 && "s"}</span>
                <Button variant="ghost" size="sm" className="text-sm text-destructive hover:text-destructive" onClick={clearCart}>
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Clear All
                </Button>
              </div>
              <Separator className="mb-4" />

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.25 }}
                    className="mb-4 flex gap-4 rounded-xl border border-border bg-card p-4 sm:gap-5"
                  >
                    <Link to={`/product/${item.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-28">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.id}`} className="font-display font-semibold text-foreground transition-colors hover:text-primary line-clamp-1">
                          {item.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.condition} · Sold by {item.seller}
                        </p>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center gap-2 rounded-lg border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-medium text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => removeItem(item.id)} className="text-muted-foreground transition-colors hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <span className="font-display text-lg font-bold text-foreground">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold text-foreground">Order Summary</h2>
                <Separator className="my-4" />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-medium text-foreground">
                      {shippingEstimate === 0 ? "Free" : `$${shippingEstimate.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax</span>
                    <span className="font-medium text-foreground">${taxEstimate.toFixed(2)}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-display text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                {shippingEstimate === 0 && (
                  <p className="mt-2 text-xs text-primary">🎉 You qualify for free shipping!</p>
                )}
                <Button size="lg" className="mt-6 w-full text-base" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure checkout · Buyer protection included</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
