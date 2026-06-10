import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Hero({ onExploreClick, onCategorySelect }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      collection: "Summer Solstice Capsule",
      title: "Silent Luxury.",
      highlight: "Crafted Lines.",
      description: "A dialogue between raw textures and structured silhouettes. Tailored in heavy Belgian linen and organic stone-tinted silks designed to move.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
      cta: "Explore Apparel",
      categoryId: "apparel",
    },
    {
      collection: "The Leather Craft",
      title: "Bespoke Accents.",
      highlight: "Tanned Deep.",
      description: "Everyday essentials structured with double-layer bridle leathers and sand-polished stainless components that age with individual grace.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
      cta: "Shop Accessories",
      categoryId: "accessories",
    },
    {
      collection: "Clay & Fire Studio",
      title: "Honest Forms.",
      highlight: "Low-Fired.",
      description: "A curation of small-batch clay pots and heavy sandstone vessels, hand-finished by master throwers in our community.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
      cta: "Discover Objects",
      categoryId: "fine-home",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[85vh] sm:h-[80vh] w-full bg-stone-100 overflow-hidden" id="hero-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Dark Matte Overlay */}
          <div className="absolute inset-0 bg-stone-950/25 z-10" />
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="object-cover object-center w-full h-full transform scale-102 transition-transform duration-[7000ms] ease-out"
          />

          {/* Slide Text Content Floating Card */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl text-left bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-10 rounded-lg text-white shadow-xl">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.3em] text-orange-200/90 mb-3"
                >
                  {slides[currentSlide].collection}
                </motion.span>

                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-2 leading-tight"
                >
                  {slides[currentSlide].title} <br />
                  <span className="text-stone-100 font-normal italic">
                    {slides[currentSlide].highlight}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ y: 35, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-stone-250 text-xs sm:text-sm font-light leading-relaxed mb-6 sm:mb-8 text-stone-150"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={() => onCategorySelect(slides[currentSlide].categoryId)}
                    className="group bg-white hover:bg-stone-900 text-stone-950 hover:text-white px-6 py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 rounded-sm shadow-sm"
                  >
                    <span>{slides[currentSlide].cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </button>

                  <button
                    onClick={onExploreClick}
                    className="border border-white/50 hover:border-white hover:bg-white/10 text-white px-5 py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 rounded-sm"
                  >
                    <span>Browse All</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Left/Right Controls */}
      <div className="absolute bottom-8 right-8 z-30 flex space-x-2">
        <button
          onClick={handlePrev}
          className="w-10 h-10 border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white/15 hover:border-white transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Previous featured look"
        >
          <ChevronLeft className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white/15 hover:border-white transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Next featured look"
        >
          <ChevronRight className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Horizontal Carousel Breadcrumb Line Indicators */}
      <div className="absolute bottom-9 left-8 z-30 hidden sm:flex items-center space-x-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group flex items-center py-2"
          >
            <div className="flex flex-col text-left">
              <span className={`text-[10px] font-mono tracking-widest transition-opacity duration-300 ${
                currentSlide === idx ? "text-white opacity-100 font-bold" : "text-white/40 group-hover:opacity-60"
              }`}>
                0{idx + 1}
              </span>
              <div
                className={`h-[1.5px] mt-1 transition-all duration-500 ease-out ${
                  currentSlide === idx ? "w-10 bg-white" : "w-4 bg-white/20 group-hover:bg-white/45"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
