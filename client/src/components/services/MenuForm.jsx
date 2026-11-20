import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Utensils, IndianRupee, Image as ImageIcon, FileText, Loader2 } from "lucide-react";

const initialState = {
  name: "",
  image_url: "",
  description: "",
  price: "",
};

const MenuForm = ({ open, onClose, editingItem, fetchMenus }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || "",
        image_url: editingItem.image_url || "",
        description: editingItem.description || "",
        price: editingItem.price || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/menu/${editingItem.id}/`,
          formData,
          config
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/menu/`,
          formData,
          config
        );
      }

      fetchMenus();
      setFormData(initialState);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save menu item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-zinc-200 text-[#2A1613]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="flex justify-between items-center border-b border-zinc-100 p-6 sm:p-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Utensils size={13} />
              {editingItem ? "Update Item" : "New Creation"}
            </div>
            <h2 className="text-2xl font-black text-[#2A1613]">
              {editingItem ? "Edit Menu Item" : "Add New Dish"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-[#2A1613] p-2 rounded-xl hover:bg-zinc-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL FORM */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Dish Name */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Dish Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g., Kung Pao Chicken"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Price (₹)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  required
                  placeholder="299.00"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50"
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image_url}
              onChange={handleChange}
              className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50"
            />
          </div>

          {/* Live Image Preview */}
          {formData.image_url && (
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1">
                Preview
              </label>
              <div className="w-32 h-24 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xs">
                <img
                  src={formData.image_url}
                  alt="Dish Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              Description & Ingredients
            </label>
            <textarea
              rows={4}
              name="description"
              required
              placeholder="Describe flavors, cooking method, spice levels..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-zinc-200 focus:border-primary p-3 rounded-xl text-xs outline-none bg-zinc-50/50 resize-none leading-relaxed"
            />
          </div>

          {/* FORM ACTIONS */}
          <div className="pt-4 border-t border-zinc-100 flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-secondary text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md shadow-primary/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : editingItem ? (
                "Update Dish"
              ) : (
                "Add Dish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;