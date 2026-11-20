import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  FileText,
  Search,
  RefreshCw,
  Image as ImageIcon,
  Tag,
  AlertCircle
} from "lucide-react";

const categories = [
  "signature-dishes",
  "chef-specials",
  "breakfast",
  "lunch",
  "dinner",
  "desserts",
  "beverages",
  "food-tips",
];

const initialState = {
  title: "",
  description: "",
  image_url: "",
  category: "signature-dishes",
  tags: "",
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState(initialState);

  const API = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/blogs/`);
      setBlogs(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(initialState);
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditing(blog.id);

    setForm({
      title: blog.title || "",
      description: blog.description || "",
      image_url: blog.image_url || "",
      category: blog.category || "signature-dishes",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
    });

    setShowModal(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (editing) {
        await axios.put(`${API}/blogs/${editing}/update/`, payload);
      } else {
        await axios.post(`${API}/blogs/create/`, payload);
      }

      fetchBlogs();
      setShowModal(false);
      setForm(initialState);
      setEditing(null);
    } catch (error) {
      console.error(error);
      alert("Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await axios.delete(`${API}/blogs/${id}/delete/`);
      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert("Failed to delete blog post.");
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (fetching) {
    return (
      <div className="flex flex-col justify-center items-center h-80 text-zinc-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm font-semibold">Loading Blog Posts...</span>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-[#FFFDFB] min-h-screen text-[#2A1613]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP BAR WITH BACK BUTTON & CREATE BUTTON */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 hover:border-primary rounded-xl text-xs font-bold text-zinc-700 hover:text-primary transition shadow-xs"
              >
                <ArrowLeft size={14} />
                <span>Back to Dashboard</span>
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                <FileText size={14} />
                Content Management
              </div>
            </div>

            <h1 className="text-3xl font-black text-[#2A1613]">
              Blog Management ({blogs.length})
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm">
              Publish culinary articles, recipes, and news for your restaurant audience.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs focus:outline-none focus:border-primary w-48 sm:w-60 shadow-xs"
              />
            </div>

            <button
              onClick={openCreate}
              className="bg-primary hover:bg-secondary text-white font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-md shadow-primary/20 cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add Blog</span>
            </button>
          </div>
        </div>

        {/* BLOGS TABLE CONTAINER */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* TABLE HEADER */}
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                  <th className="px-5 py-4">Cover</th>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Tags</th>
                  <th className="px-5 py-4">Published Date</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-zinc-400">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-zinc-300" />
                        <span className="font-semibold text-sm">No blog posts found.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-zinc-50/80 transition-colors"
                    >
                      {/* Image */}
                      <td className="px-5 py-4">
                        {blog.image_url ? (
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-16 h-12 rounded-xl object-cover border border-zinc-200 shadow-xs"
                          />
                        ) : (
                          <div className="w-16 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </td>

                      {/* Title */}
                      <td className="px-5 py-4 font-bold text-[#2A1613] max-w-xs">
                        <p className="line-clamp-2 text-xs leading-snug">{blog.title}</p>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 font-bold text-zinc-600 text-[11px] border border-zinc-200 capitalize">
                          {blog.category?.replace("-", " ")}
                        </span>
                      </td>

                      {/* Tags */}
                      <td className="px-5 py-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
                            blog.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-semibold"
                              >
                                #{tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-zinc-400 text-[11px]">-</span>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-zinc-400 whitespace-nowrap">
                        {blog.created_at
                          ? new Date(blog.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => openEdit(blog)}
                            className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 hover:bg-amber-500 hover:text-white transition cursor-pointer"
                            title="Edit Blog"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => deleteBlog(blog.id)}
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
                            title="Delete Blog"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-6 top-6 text-zinc-400 hover:text-[#2A1613] p-1 rounded-full hover:bg-zinc-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black text-[#2A1613]">
                {editing ? "Edit Blog Article" : "Create New Article"}
              </h2>
              <p className="text-zinc-500 text-xs mt-1">
                Fill in the details below to publish content on your restaurant website.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50"
                  placeholder="e.g., The Secret Behind Our Authentic Wok Hei Technique"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Article Body / Description
                </label>
                <textarea
                  rows="6"
                  required
                  className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50 leading-relaxed"
                  placeholder="Write your article story here..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={form.image_url}
                  onChange={(e) =>
                    setForm({ ...form, image_url: e.target.value })
                  }
                />
                {form.image_url && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-zinc-200 max-h-40">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50 font-medium capitalize"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50"
                  placeholder="spicy, stir-fry, noodles, traditional"
                  value={form.tags}
                  onChange={(e) =>
                    setForm({ ...form, tags: e.target.value })
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-secondary text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editing
                    ? "Update Blog"
                    : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;