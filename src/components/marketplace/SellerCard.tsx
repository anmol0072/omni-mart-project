import { Star, BadgeCheck, MapPin, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seller } from "@/types/marketplace";
import { Badge } from "@/components/ui/badge";

export default function SellerCard({ seller }: { seller: Seller }) {
  return (
    <Link to={`/store/${seller.id}`} className="group relative block overflow-hidden rounded-[2rem] border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
      {/* Background Hero pattern */}
      <div className="h-28 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>

      {/* Floating Avatar */}
      <div className="absolute left-6 top-16 flex h-20 w-20 items-center justify-center rounded-2xl bg-background shadow-lg overflow-hidden border border-border transition-transform group-hover:scale-105">
        {seller.logo ? (
          <img src={seller.logo} alt={seller.name} className="h-full w-full object-contain p-2" />
        ) : (
          <span className="font-display text-3xl font-bold text-primary">{seller.name.charAt(0)}</span>
        )}
      </div>

      {/* Content */}
      <div className="pt-10 px-6 pb-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 font-display text-lg font-bold text-foreground">
            {seller.name}
            {seller.isVerified && <BadgeCheck className="h-4 w-4 text-primary" />}
          </h3>
        </div>
        
        <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" /> {seller.location}
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {seller.categories.slice(0, 3).map(cat => (
            <Badge key={cat} variant="secondary" className="bg-primary/5 text-primary text-[10px] font-medium px-2 py-0.5 rounded-full border border-primary/10">
              {cat}
            </Badge>
          ))}
          {seller.categories.length > 3 && (
            <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] rounded-full px-2 py-0.5">
              +{seller.categories.length - 3}
            </Badge>
          )}
        </div>

        <div className="mb-5 flex justify-between items-center rounded-xl bg-muted/40 p-3">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-0.5">Rating</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-bold text-foreground text-sm">{seller.rating}</span>
            </div>
          </div>
          <div className="w-[1px] h-8 bg-border border-l border-dashed mx-2" />
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground mb-0.5">Inventory</span>
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <Package className="h-4 w-4 text-primary" /> {seller.totalProducts}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm font-semibold text-primary group-hover:text-foreground transition-colors overflow-hidden">
          <span>Visit Store</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}
