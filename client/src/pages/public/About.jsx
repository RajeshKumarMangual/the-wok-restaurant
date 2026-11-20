import React from "react";
import { Link } from "react-router-dom";
import { 
  Flame, 
  PhoneCall, 
  Award, 
  Users, 
  Utensils, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  Send
} from "lucide-react";
import logo from "../../assets/logo.png"; 

const About = () => {
  const stats = [
    {
      icon: <Utensils className="w-6 h-6 text-primary" />,
      title: "532+ Special Wok Dishes",
      desc: "Authentic Recipes",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "6534+ Happy Guests",
      desc: "Satisfied Customers",
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "15+ Years Experience",
      desc: "Culinary Excellence",
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-primary" />,
      title: "432+ Daily Orders",
      desc: "Freshly Wok-Tossed",
    },
  ];

  const chefs = [
    {
      name: "Master Chef Chen",
      role: "Head Wok Specialist",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Chef Lin Zhang",
      role: "Dim Sum & Noodle Master",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Chef Mei Ling",
      role: "Senior Szechuan Chef",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80",
  ];

  return (
    <div className="bg-[#FFFDFB] text-[#2A1613] min-h-screen">
      
      {/* 1. HERO HEADER BANNER */}
      <section className="relative bg-[#2A1613] py-24 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E85025_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            About <span className="text-primary">Us</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-accent">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. BRAND STORY SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Collage Images */}
          <div className="relative grid grid-cols-2 gap-4 items-center">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
                  alt="Wok Cooking"
                  className="w-full h-52 sm:h-64 object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
                  alt="Dim Sum Basket"
                  className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-zinc-100 h-80 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                alt="Chef in Action"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Right Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest border border-primary/20">
              <Flame size={14} className="text-primary animate-pulse" />
              About The Wok
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2A1613] leading-tight">
              The Cleanest, Most Flavorful <br />
              <span className="text-primary">Authentic Chinese Cuisine</span> Ever.
            </h2>

            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
              At <strong className="text-[#2A1613]">The Wok - Chinese Kitchen</strong>, we bring traditional Asian heritage and high-heat wok frying together to deliver bold, aromatic, and savory dishes crafted from fresh, premium ingredients.
            </p>

            {/* Grid Stats */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {stats.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#2A1613]">{item.title}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Line */}
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-primary/20 transition-all hover:scale-105"
              >
                <span>EXPLORE MENU</span>
                <ArrowRight size={16} />
              </Link>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-full text-accent">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium">Call For Reservations</p>
                  <a href="tel:+123456789" className="text-sm font-bold text-[#2A1613] hover:text-primary transition">
                    +91 (123) 456 789
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MEET OUR MASTER CHEFS */}
      <section className="py-20 bg-zinc-50/70 border-y border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          <div className="grid lg:grid-cols-3 gap-10 items-center mb-14">
            <div className="lg:col-span-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest border border-accent/20">
                <Utensils size={14} /> Our Culinary Experts
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2A1613]">
                Meet Our Exclusive & Master Chefs
              </h2>

              <ul className="space-y-2 pt-2 text-sm font-medium text-zinc-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  Over 15+ Years of Experience in Authentic Asian Culinary Arts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  Customized Spice Levels & Freshly Prepared Meals
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-3 rounded-xl font-bold text-sm transition"
                >
                  <span>BOOK A TABLE</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Chefs Cards Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
              {chefs.map((chef, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md border border-zinc-200/80 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-80 overflow-hidden bg-[#2A1613]">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    
                   

                    {/* Name Tag Badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl text-center shadow-lg border border-white/50">
                      <h3 className="font-bold text-[#2A1613] text-sm sm:text-base">
                        {chef.name}
                      </h3>
                      <p className="text-xs text-primary font-semibold mt-0.5">
                        {chef.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. FOOD GALLERY STRIP */}
      <section className="py-6 bg-[#2A1613]">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 px-2">
          {galleryImages.map((img, i) => (
            <div key={i} className="h-36 overflow-hidden rounded-xl group relative">
              <img
                src={img}
                alt="Wok dish"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER SECTION */}
      <footer className="bg-[#2A1613] text-zinc-300 pt-16 pb-8 border-t border-[#351C18]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
            
            {/* Col 1: Logo & Newsletter */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="The Wok Logo" className="h-10 w-auto" />
                <div>
                  <h3 className="text-white font-bold text-lg leading-none">THE WOK</h3>
                  <p className="text-accent text-[10px] tracking-widest font-semibold uppercase">Chinese Kitchen</p>
                </div>
              </Link>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Experience authentic Chinese flavors cooked with love, fresh spices, and culinary passion.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-[#351C18] rounded-lg p-1 border border-zinc-800">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                />
                <button type="submit" className="bg-primary hover:bg-secondary text-white p-2 rounded-md transition">
                  <Send size={14} />
                </button>
              </form>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-primary/30 pb-2 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/about" className="hover:text-primary transition">&gt; About Company</Link></li>
                <li><Link to="/" className="hover:text-primary transition">&gt; Home Shop</Link></li>
                <li><Link to="/menu" className="hover:text-primary transition">&gt; Our Menu (CMS)</Link></li>
                <li><Link to="/blogs" className="hover:text-primary transition">&gt; Recipes & Blogs</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition">&gt; Reservations</Link></li>
              </ul>
            </div>

            {/* Col 3: Popular Dishes */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-primary/30 pb-2 inline-block">
                Top Specials
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-primary transition">&gt; Schezwan Fried Rice</a></li>
                <li><a href="#" className="hover:text-primary transition">&gt; Hakka Hakka Noodles</a></li>
                <li><a href="#" className="hover:text-primary transition">&gt; Steamed Momos & Dim Sum</a></li>
                <li><a href="#" className="hover:text-primary transition">&gt; Kung Pao Chicken</a></li>
                <li><a href="#" className="hover:text-primary transition">&gt; Manchurian Gravy</a></li>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-primary/30 pb-2 inline-block">
                Contact Us
              </h4>
              <div className="space-y-2 text-xs text-zinc-400">
                <p><span className="text-white font-medium">Order Call:</span> +91 (123) 456 789</p>
                <p><span className="text-white font-medium">Email:</span> hello@thewok.com</p>
                <p><span className="text-white font-medium">Location:</span> 55 Main Street, Food Hub Street, India</p>
              </div>
            </div>

          </div>

          {/* Bottom copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© {new Date().getFullYear()} The Wok - Chinese Kitchen. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-300">FAQ</a>
              <a href="#" className="hover:text-zinc-300">Support</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default About;