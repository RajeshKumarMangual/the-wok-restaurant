import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  UtensilsCrossed,
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import MenuForm from "../../components/services/MenuForm";

const AdminMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/menu/`,
        config
      );
      setMenus(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (menu) => {
    setEditingItem(menu);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/menu/${id}/`,
        config
      );
      fetchMenus();
    } catch (err) {
      console.error(err);
      alert("Failed to delete menu item.");
    }
  };

  const filteredMenus = menus.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 text-zinc-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm font-semibold">Loading Menu Items...</span>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-[#FFFDFB] min-h-screen text-[#2A1613]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION WITH BACK BUTTON & ADD BUTTON */}
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

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-bold uppercase tracking-wider">
                <UtensilsCrossed size={14} />
                Catalog Management
              </div>
            </div>

            <h1 className="text-3xl font-black text-[#2A1613]">
              Menu Management ({menus.length})
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm">
              Add, update, or remove dishes, pricing, and descriptions from your public menu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs focus:outline-none focus:border-primary w-48 sm:w-60 shadow-xs"
              />
            </div>

            <button
              onClick={handleAdd}
              className="bg-primary hover:bg-secondary text-white font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-md shadow-primary/20 cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add Dish</span>
            </button>
          </div>
        </div>

        {/* MENU TABLE CONTAINER */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* TABLE HEADER */}
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Dish Name</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Description</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filteredMenus.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-zinc-400">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-zinc-300" />
                        <span className="font-semibold text-sm">No menu items found.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMenus.map((menu) => (
                    <tr
                      key={menu.id}
                      className="hover:bg-zinc-50/80 transition-colors"
                    >
                      {/* Dish Image */}
                      <td className="px-5 py-4">
                        {menu.image_url ? (
                          <img
                            src={menu.image_url}
                            alt={menu.name}
                            className="w-14 h-14 rounded-xl object-cover border border-zinc-200 shadow-xs"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4 font-bold text-[#2A1613]">
                        <span className="text-sm">{menu.name}</span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4 font-black text-primary text-sm whitespace-nowrap">
                        ₹{menu.price}
                      </td>

                      {/* Description */}
                      <td className="px-5 py-4 max-w-md">
                        <p className="line-clamp-2 text-zinc-600 leading-relaxed text-[12px]">
                          {menu.description || "No description available."}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleEdit(menu)}
                            className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 hover:bg-amber-500 hover:text-white transition cursor-pointer"
                            title="Edit Menu"
                          >
                            <Edit size={15} />
                          </button>

                          <button
                            onClick={() => handleDelete(menu.id)}
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
                            title="Delete Menu"
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

      {/* MODAL FORM COMPONENT */}
      <MenuForm
        open={open}
        onClose={() => setOpen(false)}
        editingItem={editingItem}
        fetchMenus={fetchMenus}
      />
    </div>
  );
};

export default AdminMenu;