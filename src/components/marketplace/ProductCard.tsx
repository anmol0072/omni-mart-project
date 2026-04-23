import { Star, Heart, ShoppingCart, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const basePrice = product.pricingTiers[0].price;
  const discountedPrice = product.discount > 0 ? basePrice * (1 - product.discount / 100) : basePrice;

  return (
    <div className="group relative flex h-[400px] flex-col overflow-hidden rounded-[2rem] bg-card border border-border shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      {/* Background Image that covers the whole card initially, but shifts on hover */}
      <div className="absolute inset-0 z-0 h-[65%] w-full overflow-hidden transition-all duration-500 group-hover:h-[45%]">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-4xl">📦</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Floating Badges */}
      <div className="absolute left-4 top-4 z-20 flex gap-2">
        {product.discount > 0 && (
          <Badge className="bg-primary hover:bg-primary text-primary-foreground font-bold shadow-lg border-none backdrop-blur-md">
            {product.discount}% OFF
          </Badge>
        )}
      </div>

      <button className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-md transition-all hover:bg-destructive hover:text-white shadow-lg">
        <Heart className="h-5 w-5" />
      </button>

      {/* Glassmorphic Content Panel that expands */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex h-[45%] flex-col rounded-t-[2rem] bg-background/90 p-5 backdrop-blur-xl transition-all duration-500 border-t border-border/50 group-hover:h-[65%] group-hover:bg-background">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span>{product.category}</span>
            {product.isVerified && <BadgeCheck className="h-4 w-4" />}
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded-full">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="text-xs font-bold text-foreground">{product.rating}</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`} className="mt-1">
          <h3 className="font-display text-lg font-bold leading-tight text-foreground line-clamp-2 transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <Link to={`/store/${product.sellerId}`} className="mt-1 text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
          By {product.sellerName}
        </Link>

        {/* This section slides up and appears gracefully on hover */}
        <div className="mt-auto pt-4 flex flex-col gap-3">
          <div className="flex items-end justify-between items-center">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-extrabold text-foreground">{formatPrice(discountedPrice)}</span>
                {product.discount > 0 && <span className="text-sm text-muted-foreground line-through">{formatPrice(basePrice)}</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">MOQ: {product.moq} {product.unit}</div>
            </div>
          </div>
          
          <Button 
            className="w-full gap-2 rounded-xl h-12 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-300" 
            onClick={() => addToCart(product, product.moq)}
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
