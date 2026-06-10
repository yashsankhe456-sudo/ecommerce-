import React from "react";
import { Category } from "../types";
import { CATEGORIES } from "../data";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface CategoriesProps {
  onCategorySelect: (id: string) => void;
  activeCategory: string;
}

export default function Categories({ onCategorySelect, activeCategory }: CategoriesProps) {
  // We exclude the "all" collection from the category display cards list to keep it dedicated to specific curated divisions
  const activeDivisions = CATEGORIES.filter((c) => c.id !== "all");

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200/50" id="categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Elegant Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-lg">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block mb-2">
              Curated Divisions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Honoring Quiet <span className="font-normal italic">Simplicity</span>
            </h2>
            <p className="text-stone-500 font-light text-sm mt-3 leading-relaxed">
              We focus on premium sustainable garments and tactile home accents meticulously assembled by multi-generational craft workshops using traceably harvested source materials.
            </p>
          </div>
          <button
            onClick={() => onCategorySelect("all")}
            className="mt-4 md:mt-0 group inline-flex items-center space-x-1 text-xs font-mono font-bold uppercase tracking-widest text-stone-950 focus:outline-hidden"
          >
            <span>See Entire Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Categories Grid (Modular Bento Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeDivisions.map((category, idx) => {
            const isActive = activeCategory === category.id;

            return (
              <motion.div
                key={category.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`group relative h-96 rounded-lg overflow-hidden cursor-pointer shadow-xs border transition-colors ${
                  isActive ? "border-amber-700 ring-2 ring-amber-700/10" : "border-stone-200"
                }`}
                onClick={() => onCategorySelect(category.id)}
              >
                {/* Visual Imagery with overlay */}
                <div className="absolute inset-0 overflow-hidden bg-stone-900">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 opacity-85 group-hover:opacity-75"
                  />
                  {/* Subtle Gradient Shadowing at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/10 to-transparent" />
                </div>

                {/* Categories Floating Text Panel */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end text-white">
                  <span className="font-mono text-[9px] tracking-widest text-amber-200/90 uppercase font-semibold mb-1">
                    0{idx + 1} / Capsule
                  </span>
                  
                  <h3 className="font-serif text-xl font-bold tracking-tight mb-1 group-hover:text-amber-100 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-[11px] text-stone-200 font-light leading-snug transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono tracking-wider text-stone-300">
                      {category.itemCount} Pieces
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1 text-white">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
