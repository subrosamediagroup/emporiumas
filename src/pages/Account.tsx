import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Save, Loader2, CreditCard, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProfileData {
  display_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  shipping_name: string | null;
  shipping_address: string | null;
  created_at: string;
}

const Account = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({
    display_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [profileRes, ordersRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("display_name, phone, address, city, state, zip")
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (profileRes.data && !profileRes.error) {
        setProfile({
          display_name: profileRes.data.display_name || "",
          phone: (profileRes.data as any).phone || "",
          address: (profileRes.data as any).address || "",
          city: (profileRes.data as any).city || "",
          state: (profileRes.data as any).state || "",
          zip: (profileRes.data as any).zip || "",
        });
      }

      if (ordersRes.data && !ordersRes.error) {
        setOrders(ordersRes.data as unknown as Order[]);
      }

      setLoading(false);
    };
    fetchData();
  }, [user]);

  // Scroll to orders section if hash is #orders
  useEffect(() => {
    if (!loading && window.location.hash === "#orders") {
      document.getElementById("orders")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name.trim() || "Seller",
        phone: profile.phone.trim() || null,
        address: profile.address.trim() || null,
        city: profile.city.trim() || null,
        state: profile.state.trim() || null,
        zip: profile.zip.trim() || null,
      } as any)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex items-center justify-center px-4 pt-24 pb-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "pending": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">My Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your profile, payment info, and view purchase history</p>

          <form onSubmit={handleSave} className="mt-8 space-y-6">
            {/* Profile */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5" />
                <h2 className="font-display text-lg font-bold">Profile</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email || ""} disabled className="bg-muted" />
                  <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed here</p>
                </div>
                <div>
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input id="display_name" value={profile.display_name} onChange={(e) => handleChange("display_name", e.target.value)} placeholder="Your seller name" maxLength={50} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="(555) 123-4567" maxLength={20} />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5" />
                <h2 className="font-display text-lg font-bold">Address</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" value={profile.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="123 Main St" maxLength={200} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={profile.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="Los Angeles" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={profile.state} onChange={(e) => handleChange("state", e.target.value)} placeholder="California" maxLength={100} />
                  </div>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" value={profile.zip} onChange={(e) => handleChange("zip", e.target.value)} placeholder="90001" maxLength={20} />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-foreground">
                <CreditCard className="h-5 w-5" />
                <h2 className="font-display text-lg font-bold">Payment Information</h2>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <CreditCard className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Payments handled by Stripe</p>
                  <p className="text-xs text-muted-foreground">
                    Your card details are securely managed by Stripe during checkout. We never store your payment information.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>

          {/* Purchase History */}
          <div id="orders" className="mt-12">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-foreground">
                <Package className="h-5 w-5" />
                <h2 className="font-display text-lg font-bold">Purchase History</h2>
              </div>
              <Separator className="my-4" />

              {orders.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">No purchases yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">Your order history will appear here after your first purchase.</p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <a href="/shop">Browse Shop</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={statusColor(order.status) as any} className="capitalize">
                            {order.status}
                          </Badge>
                          <span className="font-display text-sm font-bold text-foreground">
                            ${(order.total / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="space-y-2">
                        {(order.items as unknown as OrderItem[]).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-10 w-10 rounded-md object-cover shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground truncate">{item.title}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm text-foreground">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
