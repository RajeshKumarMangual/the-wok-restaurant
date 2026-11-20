import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Flame,
  Star,
  ShoppingBag,
  Utensils,
  Clock,
  Award,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Sparkles,
  Quote,
  ChevronRight,
  UtensilsCrossed,
  Soup,
  Beef,
  CookingPot,
} from "lucide-react";

const Home = () => {
  const [popularDishes, setPopularDishes] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // Chinese Cuisine Categories with Lucide Icons
  const categories = [
    {
      name: "Dim Sum",
      icon: <UtensilsCrossed className="w-8 h-8 text-primary" />,
      desc: "Steamed & Fried Baskets",
    },
    {
      name: "Noodles",
      icon: <CookingPot className="w-8 h-8 text-primary" />,
      desc: "Wok-Tossed Hakka & Ramen",
    },
    {
      name: "Fried Rice",
      icon: <Utensils className="w-8 h-8 text-primary" />,
      desc: "Aromatic Schezwan & Wok Rice",
    },
    {
      name: "Soups",
      icon: <Soup className="w-8 h-8 text-primary" />,
      desc: "Hot & Sour, Manchow",
    },
    {
      name: "Sizzlers",
      icon: <Flame className="w-8 h-8 text-primary" />,
      desc: "Sizzling Hot Platters",
    },
    {
      name: "Starters",
      icon: <Beef className="w-8 h-8 text-primary" />,
      desc: "Crisp Spring Rolls & Manchurian",
    },
  ];

  // Feature Badges
  const features = [
    {
      icon: <Flame className="w-6 h-6 text-primary" />,
      title: "High-Heat Wok Frying",
      desc: "Authentic 'Wok Hei' breath of the wok in every bite.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      title: "100% Fresh Ingredients",
      desc: "Locally sourced vegetables & authentic imported Asian spices.",
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Master Asian Chefs",
      desc: "Over 15+ years of traditional culinary expertise.",
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: "Fast Table Service",
      desc: "Freshly cooked and served sizzling hot in minutes.",
    },
  ];

  // Testimonials
  const reviews = [
    {
      name: "Rahul Sharma",
      comment:
        "The Schezwan Noodles had the perfect smoky wok-hei flavor! Easily the best Chinese restaurant in town.",
      rating: 5,
      role: "Food Critic",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Ananya Roy",
      comment:
        "Incredible dim sums! Super soft, juicy, and packed with authentic spices. The ambiance is top notch.",
      rating: 5,
      role: "Regular Guest",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "David Chen",
      comment:
        "Reminds me of traditional night market food stalls in Guangzhou. Sizzling chicken was out of this world!",
      rating: 5,
      role: "Verified Diner",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  ];

  useEffect(() => {
    fetchPopularDishes();
  }, []);

  const fetchPopularDishes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/menu/`);
      setPopularDishes(res.data.slice(0, 8));
    } catch (err) {
      console.error("Error fetching popular dishes:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDishes =
    activeTab === "All"
      ? popularDishes
      : popularDishes.filter((item) => item.category === activeTab);

  return (
    <div className="bg-[#FFFDFB] text-[#2A1613] min-h-screen w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#2A1613] text-white py-20 sm:py-28 px-6 lg:px-12 w-full overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E85025_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left Text Box */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold text-xs uppercase tracking-widest">
              <Flame size={14} className="animate-pulse" />
              Sizzling Asian Heritage
            </div>

            <h1 className="text-4xl sm:text-6xl font-black leading-none tracking-tight">
              Taste The Sizzle Of <br />
              <span className="text-primary">Authentic Wok</span> Cooking
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into{" "}
              <strong className="text-white">The Wok - Chinese Kitchen</strong>.
              Experience wok-tossed noodles, handmade dim sums, and fiery
              Schezwan gravies prepared live by master chefs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/menu"
                className="bg-primary hover:bg-secondary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105 inline-flex items-center gap-2 text-sm"
              >
                <span>EXPLORE MENU</span>
                <ShoppingBag size={18} />
              </Link>

              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-full backdrop-blur-md transition-all hover:scale-105 text-sm inline-flex items-center gap-2"
              >
                <span>RESERVE TABLE</span>
                <Calendar size={18} />
              </Link>
            </div>

            {/* Rating Badge */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-xs text-zinc-400 border-t border-zinc-800">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span>
                <strong>4.9 / 5.0</strong> rating from over 2,500+ satisfied
                guests
              </span>
            </div>
          </div>

          {/* Right Hero Image Frame */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src="https://i.pinimg.com/1200x/95/65/7d/95657d942ebc8e5dff67dfffa7abfb4a.jpg"
                alt="Chef Cooking Wok"
                className="w-full h-[400px] sm:h-[480px] object-cover object-top group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1613] via-transparent to-transparent opacity-60" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#2A1613]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">
                    Chef's Live Kitchen
                  </h4>
                  <p className="text-accent text-xs">Fresh Wok Hei Guarantee</p>
                </div>
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-lg">
                  HOT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE HIGHLIGHTS STRIP */}
      <section className="py-12 bg-white border-b border-zinc-200/80 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100"
            >
              <div className="p-3 bg-white rounded-xl shadow-xs border border-zinc-200/60 shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#2A1613]">{f.title}</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BROWSE BY CATEGORY */}
      <section className="py-20 w-full max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Culinary Selection
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2A1613] mt-3">
            Browse Our Authentic Categories
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            From steaming dim sum baskets to fiery sizzlers, explore our
            handcrafted menu categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <Link
              to="/menu"
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-base text-[#2A1613] group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-zinc-500 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR DISHES SHOWCASE */}
      <section className="py-20 bg-zinc-50/70 border-y border-zinc-200/80 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/20">
                Chef's Specials
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#2A1613] mt-3">
                Most Popular Dishes
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Dim Sum", "Noodles", "Fried Rice"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-white text-zinc-600 hover:bg-primary/10 hover:text-primary border border-zinc-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-zinc-200 animate-pulse h-80"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredDishes.map((dish, i) => (
                <div
                  key={dish.id || i}
                  className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                >
                  <div className="relative h-52 overflow-hidden bg-[#2A1613]">
                    <img
                      src={
                        dish.image_url ||
                        "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80"
                      }
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    <span className="absolute top-3 left-3 bg-[#2A1613]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/10">
                      {i % 2 === 0 ? "Chef's Special" : "Customer Favorite"}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-bold text-[#2A1613] text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-zinc-500 text-xs mt-1 line-clamp-2">
                        {dish.description ||
                          "Prepared with authentic Chinese seasonings."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-100">
                      <span className="text-accent font-black text-xl">
                        ₹{dish.price}
                      </span>

                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded-md">
                        <Star size={13} fill="currentColor" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-[#2A1613] text-white hover:bg-primary font-bold px-8 py-4 rounded-full text-sm transition-all shadow-md"
            >
              <span>EXPLORE ENTIRE MENU</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY SECTION */}
      <section className="py-20 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Collage */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
              alt="Wok Cooking"
              className="rounded-2xl h-64 w-full object-cover shadow-lg border border-zinc-200"
            />
            <img
              src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
              alt="Dim Sums"
              className="rounded-2xl h-64 w-full object-cover shadow-lg border border-zinc-200 mt-8"
            />
          </div>

          {/* Story Text */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
              Our Passion
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#2A1613] leading-tight">
              Bringing Traditional <br />
              <span className="text-primary">Asian Heritage</span> To Your Table
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Founded with a mission to preserve authentic Chinese cooking
              techniques, <strong className="text-[#2A1613]">The Wok</strong>{" "}
              combines high-heat wok frying, fresh garden-grown aromatics, and
              rich hand-crafted sauces to deliver memorable culinary
              experiences.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-md"
              >
                <span>READ OUR FULL STORY</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 bg-[#2A1613] text-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/20">
              Guest Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3">
              What Our Diners Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-[#351C18] p-8 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6 relative"
              >
                <Quote className="text-primary/30 w-10 h-10 absolute top-6 right-6" />
                <p className="text-zinc-300 text-sm leading-relaxed relative z-10">
                  "{r.comment}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{r.name}</h4>
                    <p className="text-xs text-accent">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROMO DISCOUNT BANNER */}
      <section className="py-16 w-full max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-secondary to-primary rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="bg-white/20 text-white font-bold text-xs uppercase px-3 py-1 rounded-full border border-white/30">
              Limited Offer
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3">
              Get 20% Off On Your First Table Booking!
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1">
              Use promo code{" "}
              <span className="font-mono font-bold text-amber-300">#WOK20</span>{" "}
              upon arrival.
            </p>
          </div>

          <Link
            to="/contact"
            className="bg-white text-[#2A1613] hover:bg-[#2A1613] hover:text-white font-bold px-8 py-4 rounded-full text-sm transition-all shrink-0 shadow-lg"
          >
            CLAIM OFFER NOW
          </Link>
        </div>
      </section>

      {/* 8. TABLE RESERVATION BANNER */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200/80 w-full text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <Sparkles className="w-10 h-10 text-primary mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-black text-[#2A1613]">
            Ready to Experience The Wok?
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Reserve your table in advance to skip the queue and enjoy sizzling
            Chinese meals served right on time.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="bg-primary hover:bg-secondary text-white font-bold px-9 py-4 rounded-full text-sm transition-all shadow-lg shadow-primary/20 inline-block"
            >
              BOOK A TABLE NOW
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
