import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, phone, address, city, state, zip")
        .eq("user_id", user.id)
        .single();

      if (data && !error) {
        setProfile({
          display_name: data.display_name || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zip: data.zip || "",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

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
      })
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">My Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your profile and personal details</p>

          <form onSubmit={handleSave} className="mt-8 space-y-6">
            {/* Account Info */}
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
                  <Input
                    id="display_name"
                    value={profile.display_name}
                    onChange={(e) => handleChange("display_name", e.target.value)}
                    placeholder="Your seller name"
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    maxLength={20}
                  />
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
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="123 Main St"
                    maxLength={200}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Los Angeles"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profile.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      placeholder="California"
                      maxLength={100}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={profile.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                    placeholder="90001"
                    maxLength={20}
                  />
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
