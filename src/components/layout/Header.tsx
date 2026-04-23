import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user, profile, isAdmin, isSeller, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}>
      <header className={`mx-auto max-w-7xl transition-all duration-300 ${
        scrolled 
          ? "w-[95%] lg:w-[90%] rounded-full bg-background/70 backdrop-blur-xl border border-border shadow-elevated"
          : "w-full bg-background/50 backdrop-blur-sm border-b border-border/40"
      }`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <span className="font-display text-xl font-bold text-primary-foreground">O</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-extrabold tracking-tight text-foreground">Omni</span>
              <span className="font-display text-xl font-medium text-accent">Mart</span>
            </div>
          </Link>

          {/* Search */}
          <div className="mx-4 hidden max-w-md flex-1 md:block">
            <form 
              className="relative group w-full"
              onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`); }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search globally..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-full border border-border/50 bg-muted/30 pl-10 pr-4 text-sm backdrop-blur-sm transition-all focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
              />
            </form>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground shadow-sm">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden gap-2 rounded-full px-3 hover:bg-muted sm:flex">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background">
                      <User className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium">{profile?.full_name || user.email?.split("@")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl">
                  {isAdmin && <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>Admin Dashboard</DropdownMenuItem>}
                  {isSeller && <DropdownMenuItem onClick={() => navigate("/seller/dashboard")}>Seller Dashboard</DropdownMenuItem>}
                  <DropdownMenuItem onClick={() => navigate("/buyer/dashboard")}>My Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="rounded-full">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="rounded-full shadow-md transition-transform hover:scale-105 active:scale-95">Sign up</Button>
                </Link>
              </div>
            )}

            <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 sm:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-full left-0 mt-2 w-full rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur-xl sm:hidden">
            <form 
              className="relative mb-4"
              onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`); setMobileOpen(false); } }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
            <nav className="flex flex-col gap-1">
              <Link to="/products" className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>All Products</Link>
              <Link to="/sellers" className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>Global Sellers</Link>
              {user ? (
                <>
                  {isAdmin && <Link to="/admin/dashboard" className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>Admin</Link>}
                  <button className="rounded-xl px-4 py-3 text-left text-sm font-medium text-destructive hover:bg-destructive/10" onClick={() => { handleSignOut(); setMobileOpen(false); }}>Sign Out</button>
                </>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Link to="/login" className="w-full" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl">Login</Button>
                  </Link>
                  <Link to="/signup" className="w-full" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-xl">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
