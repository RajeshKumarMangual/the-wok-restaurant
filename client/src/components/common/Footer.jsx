import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  Flame,
  ChevronRight,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2A1613] text-white pt-16 pb-8 border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: BRAND & NEWSLETTER CARD */}
        <div className="bg-gradient-to-r from-secondary/40 to-primary/30 border border-white/10 rounded-3xl p-6 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              Join Our Foodie Club
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Get Special Discounts & Updates
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm max-w-md">
              Subscribe to our newsletter to receive secret promotional codes and seasonal menu updates.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center w-full lg:w-auto max-w-md bg-[#2A1613]/90 border border-white/20 rounded-2xl p-1.5 shadow-lg"
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-transparent text-sm text-white placeholder-zinc-400 px-4 py-2.5 w-full focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2 text-xs shrink-0 cursor-pointer"
            >
              <span>SUBSCRIBE</span>
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black text-white">
              <div className="p-2 bg-primary rounded-xl text-white">
                <Flame size={20} />
              </div>
              <span>
                THE <span className="text-primary">WOK</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Authentic Chinese kitchen serving sizzling wok dishes, handcrafted dim sums, and traditional noodles prepared live by master Asian chefs.
            </p>

           
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5 border-l-2 border-primary pl-3">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-400">
              {[
                { label: "Home Page", path: "/" },
                { label: "Our Menu", path: "/menu" },
                { label: "About Our Story", path: "/about" },
                { label: "Table Reservation", path: "/contact" },
                { label: "Blog & Recipes", path: "/blogs" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5 border-l-2 border-accent pl-3">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>55 Main Street, Food Hub Street, India</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall size={18} className="text-primary shrink-0" />
                <a href="tel:+91123456789" className="hover:text-white transition">
                  +91 (123) 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <a href="mailto:hello@thewok.com" className="hover:text-white transition">
                  hello@thewok.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5 border-l-2 border-primary pl-3">
              Operating Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-center gap-2 text-accent font-bold mb-1">
                <Clock size={16} />
                <span>Kitchen Timings</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon – Thu:</span>
                <span className="text-white font-semibold">11:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Fri – Sat:</span>
                <span className="text-white font-semibold">11:00 AM – 11:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white font-semibold">12:00 PM – 10:30 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} The Wok - Chinese Kitchen. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={14} className="text-primary fill-primary inline" />
            <span>for authentic flavor lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;