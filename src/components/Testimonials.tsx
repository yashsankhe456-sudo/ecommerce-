import React from "react";
import { TESTIMONIALS } from "../data";
import { Star, Quote, HeartHandshake, ShieldCheck, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-stone-100 border-t border-b border-stone-200/50" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block mb-2">
            The Word of the Curators
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Aesthetic <span className="font-normal italic">Endorsements</span>
          </h2>
          <p className="text-stone-500 font-light text-xs sm:text-sm mt-3 leading-relaxed">
            Read from visual directors, modern curators, and designers worldwide who integrate our slow-fashion lines into their daily architectural practices.
          </p>
        </div>

        {/* Editorial Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="bg-white p-8 rounded-lg border border-stone-200/50 shadow-xs relative flex flex-col justify-between"
            >
              {/* Giant quote mark back decoration */}
              <div className="absolute top-6 right-8 text-stone-100 select-none pointer-events-none">
                <Quote className="w-14 h-14 rotate-180 -scale-x-100" />
              </div>

              <div>
                {/* Micro Stars */}
                <div className="flex items-center space-x-0.5 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(t.rating) ? "fill-amber-500 stroke-amber-500" : "fill-amber-200"
                      }`}
                    />
                  ))}
                  <span className="font-mono text-[10px] font-bold text-stone-500 pl-1.5">{t.rating}</span>
                </div>

                {/* Body Text */}
                <p className="font-serif italic text-stone-800 text-sm leading-relaxed mb-8 relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Identity Footer */}
              <div className="flex items-center space-x-3.5 pt-6 border-t border-stone-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <h4 className="font-sans text-xs font-bold text-stone-900">{t.name}</h4>
                  <p className="font-sans text-[10px] text-stone-400 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Core Trust Factors block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-stone-200/70 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-amber-100/50 p-3.5 rounded-full text-amber-800 mb-3.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
              Ethical Production
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed font-light">
              We work exclusivement with certified small artisans who declare fair wages and optimal conditions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-amber-100/50 p-3.5 rounded-full text-amber-800 mb-3.5">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
              Slow Loop Exchange
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed font-light">
              Complimentary size adjustments and clean reverse returns on our entire list for 30 comfortable days.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-amber-100/50 p-3.5 rounded-full text-amber-800 mb-3.5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
              Circular Lifetime
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed font-light">
              Send your worn Lumina clothing back to receive a 20% custom recycled coupon. We repair and clean.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
