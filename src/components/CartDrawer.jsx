import React, { useState } from "react";
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onMoveToWishlist,
  onClearCartNow,
}) {
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [address, setAddress] = useState({ name: "", email: "", line: "", city: "" });

  // Basic e-commerce logic
  const itemsSubtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const freeShippingThreshold = 250;
  const shippingCharge = itemsSubtotal >= freeShippingThreshold || itemsSubtotal === 0 ? 0 : 15;
  const taxCharge = parseFloat((itemsSubtotal * 0.08).toFixed(2));
  const orderTotal = itemsSubtotal + shippingCharge + taxCharge;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (address.name && address.email && address.line) {
      setCheckoutStep("complete");
    }
  };

  const handleFinish = () => {
    onClearCartNow();
    setCheckoutStep("cart");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-stone-50 shadow-2xl z-50 flex flex-col h-full overflow-hidden border-l border-stone-200"
          >
            {/* Drawer Header */}
            <div className="p-6 bg-white border-b border-stone-200/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
                <span className="font-serif text-lg font-bold text-stone-950">Atelier Shopping Bag</span>
                <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-mono">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {checkoutStep === "cart" && (
                <>
                  {/* Dynamic Free Shipping Progress Bar */}
                  {itemsSubtotal > 0 && (
                    <div className="bg-stone-100 rounded-md p-4 border border-stone-200">
                      <div className="flex justify-between items-center text-xs text-stone-700 font-medium mb-2 font-mono">
                        {itemsSubtotal >= freeShippingThreshold ? (
                          <span className="text-emerald-700 font-bold">✓ Carbon-Neutral Shipping Qualified</span>
                        ) : (
                          <span>Spend ${freeShippingThreshold - itemsSubtotal} more for Complimentary Shipping</span>
                        )}
                        <span>${itemsSubtotal} / ${freeShippingThreshold}</span>
                      </div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-700 transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((itemsSubtotal / freeShippingThreshold) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Empty Bag State */}
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center h-[55vh] p-6">
                      <div className="bg-stone-100 p-4 rounded-full text-stone-400 mb-4 h-16 w-16 flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-7 h-7" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900">Your bag is currently empty</h4>
                      <p className="text-stone-500 text-xs mt-2 max-w-xs font-light leading-relaxed">
                        Curate minimal essentials by browsing through our catalog. Every piece represents deliberate, slow craftsmanship.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-mono tracking-widest uppercase py-3 px-6 rounded-sm transition-colors cursor-pointer"
                      >
                        Browse Collections
                      </button>
                    </div>
                  ) : (
                    /* Cart Items List */
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          className="bg-white p-4 rounded-lg border border-stone-200/50 shadow-xs flex space-x-4 relative group"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-20 object-cover object-center rounded bg-stone-100 flex-shrink-0"
                          />

                          <div className="flex-1 text-left">
                            <h5 className="font-serif text-sm font-bold text-stone-900 pr-5 leading-tight">
                              {item.product.name}
                            </h5>
                            
                            <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-1">
                              {item.selectedColor} / Size {item.selectedSize}
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity Control Buttons block */}
                              <div className="flex items-center border border-stone-200 rounded-sm bg-stone-50">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 px-2 text-stone-500 hover:text-stone-955 hover:bg-stone-105 transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs px-2.5 font-bold text-stone-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 px-2 text-stone-500 hover:text-stone-955 hover:bg-stone-105 transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-mono text-xs font-bold text-stone-950">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Quick Removal & Wishlist Move Hover Actions */}
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <button
                              onClick={() => {
                                onMoveToWishlist(item);
                                onRemoveItem(item.id);
                              }}
                              className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                              title="Move to favorites"
                            >
                              <Heart className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1.5 text-stone-400 hover:text-red-650 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Step 2: Checkout details sheet */}
              {checkoutStep === "shipping" && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-stone-400 font-bold mb-4">
                    Atelier Dispatch Details
                  </h4>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1 font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full bg-white border border-stone-200 text-xs rounded-sm py-2 px-3 text-stone-900 focus:outline-hidden focus:border-stone-500"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1 font-semibold">
                      Email Coordinates
                    </label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full bg-white border border-stone-200 text-xs rounded-sm py-2 px-3 text-stone-900 focus:outline-hidden focus:border-stone-500"
                      placeholder="jane.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1 font-semibold">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address.line}
                      onChange={(e) => setAddress({ ...address, line: e.target.value })}
                      className="w-full bg-white border border-stone-200 text-xs rounded-sm py-2 px-3 text-stone-900 focus:outline-hidden focus:border-stone-500"
                      placeholder="99 Linen Boulevard, Apt 2C"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1 font-semibold">
                      City / Country
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-white border border-stone-200 text-xs rounded-sm py-2 px-3 text-stone-900 focus:outline-hidden focus:border-stone-500"
                      placeholder="Copenhagen, Denmark"
                    />
                  </div>

                  <div className="bg-stone-100 p-4 rounded-md text-[11px] text-stone-500 leading-relaxed space-y-2 border border-stone-250">
                    <p className="font-semibold text-stone-800">🔒 SECURE CHECKOUT ASSURED</p>
                    <p>Lumina respects user credentials, preserving secure payment routing through standard systems. Private token locks secure your details.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-mono text-xs tracking-widest uppercase py-4 px-6 rounded-sm transition-colors mt-6 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Authorize Secure Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="w-full border border-stone-200/80 hover:bg-stone-100 text-stone-700 font-mono text-[10px] tracking-widest uppercase py-2.5 rounded-sm transition-all"
                  >
                    Return to Shopping Bag
                  </button>
                </form>
              )}

              {/* Step 3: Complete Success State */}
              {checkoutStep === "complete" && (
                <div className="text-center py-16 space-y-6">
                  <div className="bg-emerald-100 p-4 rounded-full text-emerald-800 mb-2 h-16 w-16 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-950">Atelier Order Sealed</h3>
                  <p className="text-mono text-xs text-stone-400">ORDER NO: #LUM-{(Math.random() * 89999 + 10000).toFixed(0)}</p>
                  
                  <p className="text-stone-500 text-xs max-w-sm mx-auto font-light leading-relaxed">
                    Thank you, <span className="font-bold text-stone-800">{address.name}</span>. An invoice receipt has been directed to <span className="font-semibold text-stone-800">{address.email}</span>. Our artisans are meticulously sizing and wrapping your selection in raw-hemp keepsake boxes.
                  </p>

                  <div className="border border-stone-250/50 bg-stone-100 rounded-md p-4/5 text-left text-[11px] text-stone-600 font-mono space-y-1 max-w-xs mx-auto mt-4 p-4">
                    <p className="font-bold text-stone-800 uppercase text-[10px] pb-1 border-b border-stone-200 mb-1.5">Atelier Destination</p>
                    <p>{address.line}</p>
                    <p>{address.city}</p>
                    <p className="text-amber-700 mt-2 font-bold select-none">Est. Arrival: 3 Business Days via Carbon-neutral Cargo</p>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-mono text-xs tracking-widest uppercase py-4 px-6 rounded-sm transition-colors mt-8"
                  >
                    Acknowledge & Continue
                  </button>
                </div>
              )}

            </div>

            {/* General Sub-Bottom Invoice details (Only shown when viewing active cart tab) */}
            {cartItems.length > 0 && checkoutStep === "cart" && (
              <div className="p-6 bg-white border-t border-stone-200 space-y-4">
                <div className="space-y-1.5 text-xs text-stone-500 font-light font-sans">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-mono text-stone-800 font-medium">${itemsSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Atelier Secure Tax (8%)</span>
                    <span className="font-mono text-stone-800 font-medium">${taxCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbon-Neutral Dispatch</span>
                    <span className="font-mono text-stone-800 font-medium">
                      {shippingCharge === 0 ? "FREE" : `$${shippingCharge.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-100">
                    <span>Estimated Total</span>
                    <span className="font-mono text-stone-950">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCheckoutStep("shipping")}
                    className="w-full bg-stone-900 hover:bg-stone-850 text-white font-mono text-xs tracking-widest uppercase py-4 px-6 rounded-sm transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Proceed to Shipping</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
