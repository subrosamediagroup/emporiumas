import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, CreditCard, CheckCircle2, Package, Loader2 } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";

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

const Field = ({
  label,
  field,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  field: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={field} className="text-sm font-medium text-foreground">
      {label}
    </Label>
    <Input
      id={field}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={error ? "border-destructive focus-visible:ring-destructive" : ""}
    />
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});

  const shippingEstimate = totalPrice > 500 ? 0 : 14.99;
  const taxEstimate = totalPrice * 0.08;
  const orderTotal = totalPrice + shippingEstimate + taxEstimate;

  const handleChange = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { items, shippingInfo: result.data },
      });

      if (error) throw error;
      if (data?.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      toast({
        title: "Payment error",
        description: err.message || "Failed to create checkout session",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !isProcessing) {
    navigate("/cart");
    return null;
  }

  const renderField = (label: string, field: keyof ShippingForm, placeholder: string, type = "text") => (
    <Field
      label={label}
      field={field}
      type={type}
      placeholder={placeholder}
      value={form[field]}
      onChange={(v) => handleChange(field, v)}
      error={errors[field]}
    />
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
                {renderField("First Name", "firstName", "John")}
                {renderField("Last Name", "lastName", "Doe")}
                <div className="sm:col-span-2">
                  {renderField("Email", "email", "john@example.com", "email")}
                </div>
                <div className="sm:col-span-2">
                  {renderField("Street Address", "address", "123 Main St")}
                </div>
                {renderField("City", "city", "Los Angeles")}
                {renderField("State", "state", "California")}
                {renderField("ZIP Code", "zip", "90001")}
                {renderField("Phone", "phone", "(555) 123-4567", "tel")}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Payment</h2>
              <Separator className="my-4" />
              <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Secure Card Payment via Stripe</p>
                  <p className="text-xs text-muted-foreground">
                    You'll be redirected to Stripe's secure checkout to complete payment.
                  </p>
                </div>
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

              <Button type="submit" size="lg" className="mt-6 w-full text-base" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting to payment…
                  </>
                ) : (
                  "Proceed to Payment"
                )}
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
