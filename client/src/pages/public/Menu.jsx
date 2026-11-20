import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flame, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/menu/`);
      setMenus(res.data);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(menus.map((item) => item.category).filter(Boolean)),
  ];

  const filteredMenus =
    selectedCategory === "All"
      ? menus
      : menus.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#FFFDFB] text-[#2A1613] min-h-screen">
      
      {/* HERO HEADER BANNER (Full-width matching About page) */}
      <section className="relative bg-[#2A1613] py-24 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E85025_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Our <span className="text-primary">Menu</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-accent">Menu</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex justify-center items-center gap-2 flex-wrap mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-[#2A1613]/5 text-[#2A1613] hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeleton Grid */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm animate-pulse"
              >
                <div className="bg-zinc-200 h-56 w-full" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-zinc-200 rounded w-2/3" />
                  <div className="h-4 bg-zinc-200 rounded w-full" />
                  <div className="h-4 bg-zinc-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredMenus.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 max-w-lg mx-auto">
            <UtensilsCrossed size={48} className="mx-auto text-zinc-300 mb-4" />
            <h3 className="text-xl font-bold text-[#2A1613]">
              No dishes found
            </h3>
            <p className="text-zinc-500 mt-1 text-sm">
              We couldn't find any menu items available at the moment.
            </p>
          </div>
        ) : (
          /* Restyled Menu Grid */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMenus.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden group flex flex-col justify-between"
              >
                {/* Image & Price Floating Badge */}
                <div className="relative overflow-hidden h-56 bg-[#2A1613]">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1613]/80 via-transparent to-transparent opacity-80" />

                  {/* Price Tag Floating Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#2A1613]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg flex items-center gap-1">
                    <span className="text-accent font-black text-lg">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Category Pill (If exists) */}
                  {item.category && (
                    <span className="absolute top-3 left-3 bg-primary/90 text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <h3 className="text-xl font-bold text-[#2A1613] group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                    {item.description ||
                      "Freshly wok-tossed dish prepared with traditional aromatic spices and savory sauces."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Menu;