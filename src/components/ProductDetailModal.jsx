import React, { useState, useEffect } from "react";
import { X, Star, ShoppingBag, Check, Heart, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  // Sync state variables whenever the selected product modal shifts open
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "");
      setSelectedSize(product.sizes[0] || "");
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleBagSubmit = (e) => {
    e.preventDefault();
    onAddToCart(product, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Transparent dark overlay backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window Panel container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 30, stiffness: 355 }}
          className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 border border-stone-100"
        >
          {/* Close corner icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-stone-900 hover:text-white p-2 rounded-full shadow-md z-20 text-stone-600 transition-colors cursor-pointer"
            aria-label="Close details dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left panel: Product image preview with aspect control */}
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[320px] bg-stone-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center pointer-events-none"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-stone-950 text-white text-[9px] font-mono tracking-widest uppercase font-bold py-1 px-3 rounded-xs">
                {product.tag}
              </span>
            )}
          </div>

          {/* Right panel: Information and option configurations */}
          <div className="p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-amber-800 tracking-widest uppercase font-bold">
                  {product.category} Division
                </span>

                <div className="flex items-center space-x-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  <span className="font-mono text-xs font-bold text-stone-700">{product.rating}</span>
                  <span className="text-[10px] text-stone-400 font-light">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-950 tracking-tight leading-tight mb-2">
                {product.name}
              </h3>

              {/* Price block */}
              <span className="inline-block font-mono text-lg font-bold text-stone-950 bg-stone-100 py-1.5 px-3.5 rounded-sm mb-4">
                ${product.price.toFixed(2)}
              </span>

              <p className="text-stone-500 text-xs sm:text-sm font-light mt-1 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Form elements for custom sizing and color parameters */}
              <form onSubmit={handleBagSubmit} className="space-y-6">
                
                {/* Color Selector */}
                {product.colors.length > 0 && product.colors[0] !== "Default" && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-2">
                      Select Color: <span className="text-stone-800 font-bold">{selectedColor}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      {product.colors.map((color) => {
                        const isSelected = selectedColor === color;
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            title={color}
                            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                              isSelected ? "border-amber-700 ring-4 ring-amber-700/10 scale-105" : "border-stone-300 hover:scale-103"
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full block focus:outline-hidden"
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
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Size Selector Grid */}
                {product.sizes.length > 0 && product.sizes[0] !== "One Size" && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-2">
                      Select Atelier Size: <span className="text-stone-800 font-bold">{selectedSize}</span>
                    </span>
                    <div className="grid grid-cols-5 gap-2 max-w-sm">
                      {product.sizes.map((size) => {
                        const isSelected = selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`py-2 text-[10px] font-mono font-bold uppercase transition-all rounded-xs cursor-pointer border ${
                              isSelected
                                ? "bg-stone-900 border-stone-950 text-stone-50"
                                : "bg-white border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Actions Trigger panel */}
                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    disabled={isAdded}
                    className={`flex-1 ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-900 hover:bg-stone-850 text-white"
                    } font-mono text-xs tracking-widest uppercase py-4 px-6 rounded-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-white animate-pulse" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Atelier Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 border rounded-sm transition-all flex items-center justify-center cursor-pointer ${
                      isWishlisted
                        ? "border-rose-300 text-rose-500 bg-rose-50/40"
                        : "border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                    }`}
                    title="Toggle Saved Favorites"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Guarantees panel */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center space-x-2 text-stone-400 text-[10px] font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Complimentary Returns</span>
              <span>•</span>
              <span>100% Traceable Garments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
