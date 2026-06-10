import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  wishlistCount: number;
  onWishlistClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategorySelect: (catId: string) => void;
}

export default function Navbar({
  cartCount,
  onCartClick,
  wishlistCount,
  onWishlistClick,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategorySelect,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "All Works", id: "all" },
    { label: "Apparel", id: "apparel" },
    { label: "Accessories", id: "accessories" },
    { label: "Footwear", id: "footwear" },
    { label: "Home Objects", id: "fine-home" },
  ];

  return (
    <>
      {/* Dynamic Announcement Ticker */}
      <div className="bg-stone-900 text-stone-100 text-[11px] font-mono tracking-wider py-2 px-4 flex justify-between items-center relative z-50">
        <div className="flex items-center space-x-1 uppercase">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
          <span>Complimentary Carbon-Neutral Shipping Worldwide</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-stone-400">
          <span>Est. Delivery: 2-4 Days</span>
          <a href="#about" className="hover:text-white transition-colors duration-150">Our Manifesto</a>
        </div>
      </div>

      {/* Main Premium Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-stone-200/60 shadow-xs py-3"
            : "bg-stone-50/20 backdrop-blur-xs border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Hamburger menu & Quick Collections */}
            <div className="flex items-center md:space-x-1">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-stone-700 hover:text-stone-950 focus:outline-hidden md:hidden"
                id="mobile-menu-btn"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Direct Category Link Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onCategorySelect(link.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest rounded-full transition-all duration-200 ${
                      activeCategory === link.id
                        ? "bg-stone-900 text-stone-50"
                        : "text-stone-600 hover:text-stone-950 hover:bg-stone-200/50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Center: Brand Identity Logo (Lumina) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center select-none">
              <button
                onClick={() => onCategorySelect("all")}
                className="focus:outline-hidden focus:ring-0 cursor-pointer"
              >
                <span className="font-serif text-2xl font-bold tracking-[0.25em] text-stone-950 hover:opacity-80 transition-opacity">
                  LUMINA
                </span>
                <span className="block text-[8px] font-mono tracking-[0.4em] uppercase text-stone-500 font-semibold -mt-1 pl-1">
                  Fine Essentials
                </span>
              </button>
            </div>

            {/* Right Side Tools */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Dynamic Interactive Search Trigger */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {showSearchInput && (
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 180, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      placeholder="Search pieces..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="absolute right-9 bg-white border border-stone-200 text-xs font-sans rounded-full px-3 py-1 text-stone-800 focus:outline-hidden focus:border-stone-500 pl-3 pr-8"
                      autoFocus
                    />
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors relative z-10"
                  aria-label="Search items"
                >
                  {showSearchInput ? <X className="w-4.5 h-4.5" /> : <Search className="w-4.5 h-4.5" />}
                </button>
              </div>

              {/* Wishlist Button Badge */}
              <button
                onClick={onWishlistClick}
                className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 bg-amber-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono font-bold"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </button>

              {/* Shopping Cart Drawer Trigger badge */}
              <button
                onClick={onCartClick}
                className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-900 hover:text-white rounded-full transition-all duration-250 relative flex items-center justify-center"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 bg-stone-900 border border-stone-50 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold group-hover:bg-amber-600 transition-colors"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Slide-Out Menu for Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/45 z-50 backdrop-blur-xs"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-stone-50 shadow-2xl z-50 flex flex-col p-6"
            >
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div>
                  <span className="font-serif text-xl font-bold tracking-widest text-stone-950">LUMINA</span>
                  <p className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Fine Essentials</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-950 hover:bg-stone-150 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Links */}
              <div className="py-6 flex-1 space-y-4">
                <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase">Shop By Division</span>
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onCategorySelect(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left py-2 px-3 text-sm font-medium tracking-wide uppercase transition-colors rounded-sm flex items-center justify-between ${
                        activeCategory === link.id
                          ? "bg-stone-900 text-stone-50"
                          : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/50"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Utility elements at bottom of mobile drawer */}
              <div className="pt-6 border-t border-stone-200 space-y-3 font-sans text-xs text-stone-600">
                <div className="flex items-center space-x-2 text-stone-800">
                  <User className="w-4 h-4" />
                  <span className="font-medium">My Account</span>
                </div>
                <p className="text-[10px] text-stone-400">Join our newsletter to receive first access to Capsule Releases.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
