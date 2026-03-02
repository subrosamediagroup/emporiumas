import { Search, ShoppingCart, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary">
            M.Poriums
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {[
              { label: "Shop", to: "/shop" },
              { label: "Sell", to: "/sell" },
              { label: "Deals", to: "#" },
              { label: "Community", to: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="hidden flex-1 max-w-md mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear, instruments, brands..."
              className="w-full rounded-lg border border-border bg-secondary px-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </form>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={signOut}>
                <LogOut className="h-5 w-5" />
              </Button>
              <Button variant="default" className="hidden text-sm sm:inline-flex" asChild>
                <Link to="/sell">List an Item</Link>
              </Button>
            </>
          ) : (
            <Button variant="default" className="hidden text-sm sm:inline-flex" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear..."
              className="w-full rounded-lg border border-border bg-secondary px-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </form>
          {[
            { label: "Shop", to: "/shop" },
            { label: "Sell", to: "/sell" },
            { label: "Deals", to: "#" },
            { label: "Community", to: "#" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {!user && (
            <Link to="/auth" className="block py-2 text-sm font-medium text-primary">
              Sign In / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
