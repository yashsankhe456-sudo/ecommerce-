import React, { useState } from "react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { Grid, List, SlidersHorizontal, Heart, ShoppingBag, Eye, Star, SearchX, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductGridProps {
  activeCategory: string;
  searchQuery: string;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export default function ProductGrid({
  activeCategory,
  searchQuery,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter Items
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort Items
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default featured sequence
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // Default selecting first color & size for effortless single-click checkout flow
    const defaultColor = product.colors[0] || "Default";
    const defaultSize = product.sizes[0] || "One Size";
    onAddToCart(product, defaultColor, defaultSize);

    // Dynamic Success State timer on the direct button feed
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <section className="py-20 bg-stone-50" id="shop-catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter / Sort Control Rail Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-stone-200 mb-10">
          <div className="flex items-center space-x-2 text-stone-600">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest font-semibold text-stone-900">Filters</span>
            <span className="text-xs font-sans text-stone-400">|</span>
            <span className="text-xs font-sans text-stone-500 font-medium">
              Showing {sortedProducts.length} unique {sortedProducts.length !== 1 ? "pieces" : "piece"}
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <label htmlFor="sort" className="text-xs font-mono text-stone-400 uppercase tracking-widest">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-200 rounded-sm text-xs py-1.5 pl-2.5 pr-8 text-stone-750 focus:outline-hidden focus:border-stone-500 font-sans cursor-pointer focus:ring-0"
            >
              <option value="featured">Featured curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating: Highest Preferred</option>
            </select>
          </div>
        </div>

        {/* Empty Search Feedback State */}
        {sortedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-24 bg-white border border-stone-200/60 rounded-xl max-w-xl mx-auto px-6 shadow-xs"
          >
            <div className="bg-stone-100 p-4 rounded-full text-stone-400 mb-4 h-16 w-16 flex items-center justify-center">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">We couldn't locate matching designs</h3>
            <p className="text-stone-500 text-xs mt-2 max-w-sm font-light leading-relaxed">
              We couldn't find items matching "{searchQuery}". Try editing keywords, exploring other divisions, or selecting "All Collections".
            </p>
            <button
              onClick={() => {
                location.href = "#categories-section";
              }}
              className="mt-6 bg-stone-900 hover:bg-stone-800 text-white text-[10px] font-mono tracking-widest uppercase py-2.5 px-6 rounded-sm transition-colors"
            >
              Examine Creative Divisions
            </button>
          </motion.div>
        ) : (
          /* Products Layout Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {sortedProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isRecentlyAdded = addedProductId === product.id;

              return (
                <motion.div
                  layout
                  key={product.id}
                  className="group relative flex flex-col h-full cursor-pointer bg-white rounded-lg border border-stone-200/55 p-3 hover:shadow-md transition-all duration-300"
                  onClick={() => onProductClick(product)}
                >
                  {/* Image Container block with absolute actions */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transform group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Tag badge */}
                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-stone-900 text-[9px] font-mono tracking-wider px-2.5 py-1 font-bold uppercase rounded-xs shadow-xs z-10 border border-stone-200/40">
                        {product.tag}
                      </span>
                    )}

                    {/* Floating Corner Heart Interaction */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 bg-white hover:bg-stone-900 hover:text-white text-stone-700 p-2 rounded-full transition-all duration-200 shadow-xs z-10 group/heart"
                      aria-label="Save design to favorites list"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-all ${
                          isWishlisted ? "fill-rose-500 stroke-rose-500 scale-110" : "group-hover/heart:scale-110"
                        }`}
                      />
                    </button>

                    {/* Desktop Sliding Hover Panel containing quick details & micro actions */}
                    <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5 px-3">
                      <div className="flex space-x-2 w-full max-w-xs justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onProductClick(product);
                          }}
                          className="bg-white/95 text-stone-900 hover:bg-stone-900 hover:text-white px-3.5 py-2 rounded-sm text-[10px] font-mono tracking-wider uppercase font-semibold flex items-center space-x-1.5 shadow-sm transform translate-y-3 group-hover:translate-y-0 transition-all duration-300"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>
                        
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          disabled={isRecentlyAdded}
                          className={`${
                            isRecentlyAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-stone-900 text-white hover:bg-white hover:text-stone-900"
                          } px-3.5 py-2 rounded-sm text-[10px] font-mono tracking-wider uppercase font-semibold flex items-center space-x-1.5 shadow-sm transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-50`}
                        >
                          {isRecentlyAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 animate-pulse" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Quick Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Informational Section details */}
                  <div className="pt-4 pb-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-stone-400 tracking-widest uppercase">
                          {product.category}
                        </span>
                        
                        {/* Rating panel */}
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                          <span className="font-mono text-[9px] font-bold text-stone-600">
                            {product.rating}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-serif text-sm font-bold text-stone-950 group-hover:text-amber-800 transition-colors duration-250 leading-tight">
                        {product.name}
                      </h4>

                      <p className="text-[11px] text-stone-500 font-light mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      {/* Price Tag */}
                      <span className="font-mono text-xs font-bold text-stone-950 bg-stone-100 hover:bg-stone-200/50 transition-colors py-1 px-2.5 rounded-sm">
                        ${product.price.toFixed(2)}
                      </span>

                      {/* Display available color preview options */}
                      <div className="flex items-center space-x-1">
                        {product.colors.map((color, idx) => (
                          <span
                            key={idx}
                            title={color}
                            className="w-2 h-2 rounded-full border border-stone-300 block"
                            style={{
                              backgroundColor:
                                color.includes("Black") || color.includes("Onyx") || color.includes("Charcoal")
                                  ? "#1c1917"
                                  : color.includes("Camel") || color.includes("Tan") || color.includes("Brown")
                                  ? "#d97706"
                                  : color.includes("Olive") || color.includes("Sage") || color.includes("Forest")
                                  ? "#4d7c0f"
                                  : color.includes("Silv") || color.includes("Gray") || color.includes("Slate")
                                  ? "#94a3b8"
                                  : color.includes("Gold")
                                  ? "#ca8a04"
                                  : "#f5f5f4",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
