import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, CreditCard, CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { motion } from "framer-motion";

const shippingSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address").max(255),
  address: z.string().trim().min(1, "Address is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  zip: z.string().trim().min(1, "ZIP code is required").max(20),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
});

type ShippingForm = z.infer<typeof shippingSchema>;

const emptyForm: ShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber] = useState(() => Math.random().toString(36).slice(2, 10).toUpperCase());

  const shippingEstimate = totalPrice > 500 ? 0 : 14.99;
  const taxEstimate = totalPrice * 0.08;
  const orderTotal = totalPrice + shippingEstimate + taxEstimate;

  const handleChange = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = shippingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ShippingForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setConfirmed(true);
    clearCart();
    toast({ title: "Order placed!", description: `Order #${orderNumber} has been confirmed.` });
  };

  if (items.length === 0 && !confirmed) {
    navigate("/cart");
    return null;
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex flex-col items-center px-4 pt-24 pb-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-foreground">Order Confirmed!</h1>
            <p className="mt-3 max-w-md text-muted-foreground">
              Thank you for your purchase. Your order <span className="font-semibold text-foreground">#{orderNumber}</span> is being processed and you'll receive a confirmation email shortly.
            </p>
            <div className="mt-8 rounded-xl border border-border bg-card p-6 text-left">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Shipping to</p>
                  <p className="text-sm text-muted-foreground">
                    {form.firstName} {form.lastName}, {form.address}, {form.city}, {form.state} {form.zip}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total charged</span>
                <span className="font-display font-bold text-foreground">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <Button asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const Field = ({
    label,
    field,
    type = "text",
    placeholder,
  }: {
    label: string;
    field: keyof ShippingForm;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="space-y-1.5">
      <Label htmlFor={field} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={field}
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={errors[field] ? "border-destructive focus-visible:ring-destructive" : ""}
      />
      {errors[field] && <p className="text-xs text-destructive">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/cart" className="flex items-center gap-1 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-3">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Shipping Address</h2>
              <Separator className="my-4" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First Name" field="firstName" placeholder="John" />
                <Field label="Last Name" field="lastName" placeholder="Doe" />
                <div className="sm:col-span-2">
                  <Field label="Email" field="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Street Address" field="address" placeholder="123 Main St" />
                </div>
                <Field label="City" field="city" placeholder="Los Angeles" />
                <Field label="State" field="state" placeholder="California" />
                <Field label="ZIP Code" field="zip" placeholder="90001" />
                <Field label="Phone" field="phone" type="tel" placeholder="(555) 123-4567" />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Payment</h2>
              <Separator className="my-4" />
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Payment processing will be available soon. Place your order to reserve items.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Order Summary</h2>
              <Separator className="my-4" />

              <div className="max-h-48 space-y-3 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({totalItems} items)</span>
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

              <Button type="submit" size="lg" className="mt-6 w-full text-base">
                Place Order
              </Button>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure checkout · Buyer protection included</span>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
