import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Tag, ArrowRight } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API}/blogs/`);
      setBlogs(res.data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFDFB] text-[#2A1613] min-h-screen">
      
      {/* 1. HERO HEADER BANNER */}
      <section className="relative bg-[#2A1613] py-24 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E85025_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Culinary <span className="text-primary">Journal</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-accent">Blogs & Stories</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT CONTAINER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Loading Skeleton State */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm"
              >
                <div className="h-56 bg-zinc-200 w-full" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-zinc-200 rounded w-1/3" />
                  <div className="h-6 bg-zinc-200 rounded w-4/5" />
                  <div className="space-y-2">
                    <div className="h-3.5 bg-zinc-200 rounded w-full" />
                    <div className="h-3.5 bg-zinc-200 rounded w-5/6" />
                  </div>
                  <div className="h-8 bg-zinc-200 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 max-w-lg mx-auto">
            <BookOpen size={48} className="mx-auto text-zinc-300 mb-4" />
            <h2 className="text-xl font-bold text-[#2A1613]">No blogs available</h2>
            <p className="text-zinc-500 mt-1 text-sm">
              Check back soon for new recipes, cooking secrets, and culinary stories!
            </p>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden group flex flex-col justify-between"
              >
                {/* Image Container with Category Floating Badge */}
                <div className="relative h-56 overflow-hidden bg-[#2A1613]">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1613]/70 via-transparent to-transparent opacity-60" />

                  {/* Category Pill */}
                  {blog.category && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-md">
                      {blog.category.replace("-", " ")}
                    </span>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Meta Info (Date) */}
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3 font-medium">
                      <Calendar size={13} className="text-primary" />
                      <span>
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h2 className="text-xl font-bold text-[#2A1613] group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-3">
                      {blog.title}
                    </h2>

                    {/* Short Excerpt */}
                    <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                      {blog.description}
                    </p>
                  </div>

                  {/* Footer Bar: Tags & Read More Link */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 space-y-4">
                    {/* Tags List */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2A1613]/80 bg-[#2A1613]/5 border border-[#2A1613]/10 px-2.5 py-0.5 rounded-full"
                          >
                            <Tag size={10} className="text-primary" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read Article CTA */}
                    <div className="flex justify-end items-center">
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-secondary transition-colors group/link"
                      >
                        <span>Read Article</span>
                        <ArrowRight
                          size={15}
                          className="group-hover/link:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blogs;