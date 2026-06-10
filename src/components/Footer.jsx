import React, { useState } from "react";
import { ArrowUp, Check, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-950 text-stone-200 pt-16 pb-8 border-t border-stone-800" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Segment containing Brand and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-14 border-b border-stone-800">
          <div>
            <span className="font-serif text-3xl font-bold tracking-[0.2em] text-white">LUMINA</span>
            <span className="block text-[9px] font-mono tracking-[0.45em] text-stone-400 uppercase font-semibold mt-1">
              Fine Essentials
            </span>
            <p className="text-stone-400 font-light text-xs mt-4 max-w-md leading-relaxed">
              We create luxury minimalist elements that respect form and source. Combining raw natural fibers and low-emission handcrafted processing, we bring architectural clarity into closets and living areas.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="text-white text-xs font-mono uppercase tracking-widest font-bold mb-3">
              Join the Lumina Dispatch
            </h4>
            <p className="text-stone-400 font-light text-[11px] mb-5">
              Receive early lookbooks on future slow capsules, restock schedules, and private atelier workshops.
            </p>

            <form onSubmit={handleSubscribe} className="flex max-w-md relative">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800/80 rounded-sm text-xs font-mono py-3.5 pl-4 pr-12 text-white focus:outline-hidden focus:border-stone-500 placeholder-stone-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 text-white hover:text-amber-300 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                {isSubscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>

            {isSubscribed && (
              <p className="text-emerald-400 text-[10px] font-mono mt-2 flex items-center space-x-1">
                <span>✓ Successfully added. Welcome to our creative collective list.</span>
              </p>
            )}
          </div>
        </div>

        {/* Middle Segment containing Multi-column Directories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-stone-800">
          
          {/* Column 1: Store Division */}
          <div>
            <h5 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold mb-4">
              Catalog
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <a href="#shop-catalog" className="hover:text-amber-200 transition-colors">
                  Winter Trench Coats
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-amber-200 transition-colors">
                  Minimal Chronograph Watch
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-amber-200 transition-colors">
                  Raw Desert Footbed Boots
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-amber-200 transition-colors">
                  Low-Fired Ceramic Stoneware
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Ethos */}
          <div>
            <h5 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold mb-4">
              Ethos
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <span className="text-stone-500 cursor-default">Direct-to-Artisan</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Zero-Fossil Freight</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Transparency Ledger</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Traceable Linens</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Support */}
          <div>
            <h5 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold mb-4">
              Atelier Support
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <span className="text-stone-500 cursor-default">Carbon-Neutral Delivery</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Fit and Hemming Adjustments</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Returns Portal</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Book Private Consultation</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div>
            <h5 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold mb-4">
              Atelier Coordinates
            </h5>
            <p className="text-xs text-stone-400 font-light leading-relaxed mb-3">
              100 Sandstone Avenue, Unit 4B <br />
              Copenhagen, Denmark
            </p>
            <p className="text-[10px] font-mono text-stone-500">
              atelier@lumina-essentials.com <br />
              +45 28 93 10 21
            </p>
          </div>

        </div>

        {/* Bottom copyright declaration with scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono">
          <div>
            <p>© 2026 LUMINA Studio Inc. All design concepts reserved.</p>
          </div>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-stone-300 cursor-default transition-colors">Privacy Declaration</span>
            <span className="hover:text-stone-300 cursor-default transition-colors">Atelier Rules</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer group focus:outline-hidden"
              aria-label="Scroll back to top"
            >
              <span>Back To Zenith</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
