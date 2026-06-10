import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductGrid from "./components/ProductGrid";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductDetailModal from "./components/ProductDetailModal";
import { Product, CartItem } from "./types";
import { PRODUCTS } from "./data";
import { Sparkles, ArrowRight, Heart, Sparkle, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Core persistent states
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("lumina_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("lumina_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Client layout states
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart counter
  useEffect(() => {
    const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalQty);
    localStorage.setItem("lumina_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem("lumina_wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Trigger floating alert banner
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add Item to cart bag
  const handleAddToCart = (product: Product, selectedColor: string, selectedSize: string) => {
    const customId = `${product.id}-${selectedColor}-${selectedSize}`;
    
    setCartItems((prevItems) => {
      const matchIndex = prevItems.findIndex((item) => item.id === customId);
      if (matchIndex > -1) {
        const updated = [...prevItems];
        updated[matchIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: customId,
            product,
            quantity: 1,
            selectedColor,
            selectedSize,
          },
        ];
      }
    });

    triggerToast(`Added "${product.name}" (${selectedColor} / Size ${selectedSize}) to bag`);
  };

  // Update Item count
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  // Remove individual Item
  const handleRemoveItem = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
      triggerToast(`Removed "${item.product.name}" from bag`);
    }
  };

  // Move from Bag to Wishlist
  const handleMoveToWishlist = (item: CartItem) => {
    if (!wishlistIds.includes(item.product.id)) {
      setWishlistIds((prev) => [...prev, item.product.id]);
    }
    triggerToast(`Moved "${item.product.name}" to Saved Favorites`);
  };

  // Toggle Heart Wishlist directly
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlistIds.includes(product.id);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      triggerToast(`Removed "${product.name}" from Saved Favorites`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      triggerToast(`Added "${product.name}" to Saved Favorites`);
    }
  };

  // Clear Bag fully
  const handleClearCartNow = () => {
    setCartItems([]);
  };

  // Scroll to catalog grid directly
  const handleExploreScroll = () => {
    const elem = document.getElementById("shop-catalog");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Directly handle category switches
  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    setSearchQuery(""); // Clear searches for frictionless division navigating
    
    // Smooth scroll down to catalog if selected from header
    const elem = document.getElementById("shop-catalog");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If clicking wishlist heart count link inside Navbar, automatically filter favorites list to highlight or show items
  const handleWishlistNavbarClick = () => {
    if (wishlistIds.length === 0) {
      triggerToast("Your Saved Favorites is currently empty.");
      return;
    }
    triggerToast(`Showing ${wishlistIds.length} favorited items in catalog`);
    
    // Sort or filter products currently favorited (We can simulate this by filtering query search to match)
    const elem = document.getElementById("shop-catalog");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative font-sans selection:bg-stone-900 selection:text-white" id="main-application-frame">
      
      {/* Floating Interactive Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 35, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 border border-stone-850/80 text-white font-mono text-xs font-semibold py-3 px-6 rounded-md shadow-2xl z-50 flex items-center space-x-3 max-w-sm w-[90%] text-left"
          >
            <Sparkle className="w-4 h-4 text-amber-250 animate-spin" />
            <span className="flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header element */}
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onWishlistClick={handleWishlistNavbarClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Hero looked block lookbooks */}
      <Hero
        onExploreClick={handleExploreScroll}
        onCategorySelect={handleCategorySelect}
      />

      {/* Interactive visual divisions list */}
      <Categories
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
      />

      {/* Curated Editorial Brand Manifesto Spacer block */}
      <section className="py-24 bg-white border-b border-stone-200/50" id="manifesto-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Two stacked aesthetic visual panels */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400"
                  alt="Aesthetic product closeup"
                  className="rounded-lg object-cover w-full h-72 shadow-2xs pointer-events-none"
                />
                <div className="bg-stone-50 p-6 rounded-lg text-left border border-stone-150">
                  <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest font-bold">Origin</span>
                  <h4 className="font-serif text-sm font-bold text-stone-900 mt-1">Copenhagen Studio</h4>
                  <p className="text-[11px] text-stone-500 font-light mt-1.5 leading-relaxed">
                    Lines calibrated in Europe. Muted tones matching clean Scandinavian light profiles and architectural lines.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-10">
                <div className="bg-stone-900 text-stone-100 p-6 rounded-lg text-left">
                  <span className="font-mono text-[9px] text-amber-250 uppercase tracking-widest font-bold">100% Certified</span>
                  <h4 className="font-serif text-sm font-bold mt-1">Traceability Index</h4>
                  <p className="text-[11px] text-stone-300 font-light mt-1.5 leading-relaxed">
                    Every garment embeds an authentic encrypted QR stamp linking directly back to the organic flax harvested region or leather farm.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400"
                  alt="Minimal editorial fashion"
                  className="rounded-lg object-cover w-full h-72 shadow-2xs pointer-events-none"
                />
              </div>
            </div>

            {/* Right: Written brand narrative */}
            <div className="text-left space-y-6">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block">
                The Lumina Ethos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
                An antidote to the <span className="font-normal italic">excess of fast consumption</span>
              </h2>
              
              <div className="h-[1px] w-20 bg-stone-300" />

              <p className="text-stone-600 font-light text-sm leading-relaxed">
                We believe that every object in your personal environment carries weight. By designing fewer, better things, we honor both the natural source materials and your space.
              </p>
              
              <p className="text-stone-600 font-light text-sm leading-relaxed">
                LUMINA is an independent creative studio collaborating directly with multi-generational workshops in Spain, Denmark, and Japan. By bypassing traditional luxury markups, we ensure fair artisan wages and top-tier construction metrics. Our packaging is made of 100% organic sugarcane fibers and is fully biodegradable.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleExploreScroll}
                  className="group inline-flex items-center space-x-2.5 bg-stone-950 hover:bg-stone-850 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-7 rounded-sm transition-all"
                >
                  <span>Examine Curations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main product feed list catalog list */}
      <ProductGrid
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onProductClick={(product) => setSelectedProduct(product)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
      />

      {/* Customer testimonial review slider section */}
      <Testimonials />

      {/* Footer element directory */}
      <Footer />

      {/* Floating Cart Drawer overlay panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onMoveToWishlist={handleMoveToWishlist}
        onClearCartNow={handleClearCartNow}
      />

      {/* Detailed overlay viewing popups modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
      />

    </div>
  );
}
