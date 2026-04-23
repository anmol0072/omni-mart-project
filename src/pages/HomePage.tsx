import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/marketplace/ProductCard";
import SellerCard from "@/components/marketplace/SellerCard";
import { heroBanners } from "@/data/mockData";
import { useProducts, useSellers, useCategories } from "@/hooks/useMarketplaceData";

export default function HomePage() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const { data: products = [] } = useProducts();
  const { data: sellers = [] } = useSellers();
  const { data: categories = [] } = useCategories();

  const topProducts = products.slice(0, 8);
  const flashDeals = products.filter(p => p.discount > 0).slice(0, 6);


  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container px-4 md:px-6">
        
        {/* Modern Split Hero Section */}
        <section className="relative mb-20 overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-elevated">
          <div className="grid lg:grid-cols-2 min-h-[500px]">
            <div className="flex flex-col justify-center p-8 md:p-16 lg:pr-8 z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 mb-6 w-max"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">A New Era of Commerce</span>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={bannerIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-foreground mb-4">
                    {heroBanners[bannerIndex].title.replace("Duniya Mart", "Omni Mart")}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8 max-w-md">
                    {heroBanners[bannerIndex].subtitle.replace("India", "the world")}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-4">
                <Link to="/products">
                  <Button size="lg" className="rounded-full h-12 px-8 gap-2 shadow-lg">
                    Start Exploration <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/sellers">
                  <Button size="lg" variant="outline" className="rounded-full h-12 px-8">
                    Meet Sellers
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bannerIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${heroBanners[bannerIndex].bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-card via-card/50 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Floating Stat Badges */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Globe className="h-5 w-5 text-blue-500" />, text: "Global Reach", sub: "150+ Countries" },
              { icon: <Zap className="h-5 w-5 text-yellow-500" />, text: "Lightning Fast", sub: "Instant Processing" },
              { icon: <ShieldCheck className="h-5 w-5 text-green-500" />, text: "Secure Trade", sub: "100% Protection" },
              { icon: <TrendingUp className="h-5 w-5 text-primary" />, text: "Wholesale Value", sub: "Unbeatable MOQ" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{stat.text}</div>
                  <div className="text-xs text-muted-foreground">{stat.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories - Horizontal Scroll */}
        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Explore Categories</h2>
              <p className="text-muted-foreground mt-1">Discover products organically</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/products?category=${cat.slug}`}
                className="group flex min-w-[140px] snap-start flex-col items-center gap-3 rounded-[2rem] border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl transition-transform group-hover:scale-110">
                  {cat.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground">{cat.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{cat.productCount} items</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Deals - Horizontal Scroll */}
        {flashDeals.length > 0 && (
          <section className="mb-20 rounded-[2.5rem] bg-primary/5 p-8 md:p-12 border border-primary/10">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 mb-3">
                  <Zap className="h-4 w-4 text-destructive" />
                  <span className="text-xs font-bold text-destructive uppercase tracking-wider">Live Now</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground">Flash Deals</h2>
              </div>
              <Link to="/products" className="text-sm font-medium text-primary hover:underline">
                View All Offers &rarr;
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x pb-4">
              {flashDeals.map(p => (
                <div key={p.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Top Sellers */}
        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Premium Sellers</h2>
              <p className="text-muted-foreground mt-1">Partner with the best in the business</p>
            </div>
            <Link to="/sellers" className="text-sm font-medium text-primary hover:underline">
              All Sellers &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sellers.map(s => <SellerCard key={s.id} seller={s} />)}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold text-foreground">Trending Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Final Outro CTA */}
        <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-accent p-10 md:p-20 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Accelerate Your Business?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-10">
              Join thousands of suppliers and buyers operating seamlessly on Omni Mart's global infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto rounded-full bg-background text-foreground hover:bg-background/90 h-14 px-8 text-lg font-medium">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 rounded-full h-14 px-8 text-lg font-medium">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
