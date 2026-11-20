import React from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  UtensilsCrossed,
  ArrowUpRight,
  TrendingUp,
  Flame,
  LayoutDashboard,
  Calendar,
  Users,
  Plus,
} from "lucide-react";
import logo from "../../assets/logo.png";

const AdminDashboard = () => {
  // Quick overview stats placeholder
  const stats = [
    {
      title: "Total Inquiries",
      count: "128",
      label: "+12% this week",
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      color: "bg-primary/10 border-primary/20",
    },
    {
      title: "Menu Items",
      count: "48",
      label: "Active in catalog",
      icon: <UtensilsCrossed className="w-6 h-6 text-accent" />,
      color: "bg-accent/10 border-accent/20",
    },
    {
      title: "Blog Posts",
      count: "24",
      label: "Published articles",
      icon: <FileText className="w-6 h-6 text-primary" />,
      color: "bg-primary/10 border-primary/20",
    },
  ];

  // Admin module cards
  const adminModules = [
    {
      title: "Customer Inquiries",
      desc: "Manage customer messages, table reservation requests, and contact forms.",
      path: "/admin/contact",
      count: "128 Inquiries",
      btnText: "Manage Inquiries",
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      tag: "Support",
    },
    {
      title: "Menu Management",
      desc: "Add, edit, or remove menu items, categories, pricing, and availability status.",
      path: "/admin/menu",
      count: "48 Items",
      btnText: "Manage Menu",
      icon: <UtensilsCrossed className="w-8 h-8 text-accent" />,
      tag: "Catalog",
    },
    {
      title: "Blog Management",
      desc: "Publish and update blog posts, culinary stories, news, and cooking recipes.",
      path: "/admin/blogs",
      count: "24 Articles",
      btnText: "Manage Blogs",
      icon: <FileText className="w-8 h-8 text-primary" />,
      tag: "Content",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#2A1613] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="The Wok Logo" className="h-20 w-auto" />
            </Link>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-2">
                <LayoutDashboard size={14} />
                Admin Control Center
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#2A1613]">
                The Wok <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-zinc-500 text-sm mt-1">
                Welcome back! Manage your restaurant operations, menu items, and
                inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/menu"
              className="bg-primary hover:bg-secondary text-white font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-md shadow-primary/20"
            >
              <Plus size={16} />
              <span>Add New Dish</span>
            </Link>
          </div>
        </div>

        {/* OVERVIEW STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${stat.color} bg-white shadow-xs flex items-center justify-between`}
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <h3 className="text-3xl font-black text-[#2A1613]">
                  {stat.count}
                </h3>
                <span className="text-[11px] text-zinc-400 block pt-1">
                  {stat.label}
                </span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* MODULE CARDS SECTION */}
        <div>
          <h2 className="text-xl font-black text-[#2A1613] mb-6 flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <span>Management Modules</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adminModules.map((module, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                      {module.icon}
                    </div>
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                      {module.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#2A1613] group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-accent">
                    {module.count}
                  </span>

                  <Link
                    to={module.path}
                    className="inline-flex items-center gap-2 bg-[#2A1613] hover:bg-primary text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md"
                  >
                    <span>{module.btnText}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
