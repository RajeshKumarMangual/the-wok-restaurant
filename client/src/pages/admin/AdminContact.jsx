import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Trash2,
  Mail,
  Phone,
  User,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  RefreshCw,
  Search,
  ArrowLeft
} from "lucide-react";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/contacts/`);
      setContacts(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/contacts/${id}/delete/`
      );

      setContacts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete reservation.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/contacts/${id}/update/`,
        { status }
      );

      setContacts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "closed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-300";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 text-zinc-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm font-semibold">Loading Reservations...</span>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-[#FFFDFB] min-h-screen text-[#2A1613]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP BAR WITH BACK BUTTON */}
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
                <Calendar size={14} />
                Reservation Requests
              </div>
            </div>

            <h1 className="text-3xl font-black text-[#2A1613]">
              Table Reservations ({contacts.length})
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm">
              View and manage incoming table bookings and inquiry messages.
            </p>
          </div>

          {/* Search Input & Refresh Button */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs focus:outline-none focus:border-primary w-60 shadow-xs"
              />
            </div>
            
            <button
              onClick={fetchContacts}
              className="p-2.5 bg-white border border-zinc-200 hover:border-primary rounded-xl text-zinc-600 hover:text-primary transition shadow-xs cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* MAIN TABLE CONTAINER */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* TABLE HEADER */}
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                  <th className="px-5 py-4">Guest Details</th>
                  <th className="px-5 py-4">Contact Info</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4 text-center">Party Size</th>
                  <th className="px-5 py-4">Booking Time</th>
                  <th className="px-5 py-4">Message</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Submitted</th>
                  <th className="px-5 py-4 text-center">Action</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-zinc-400">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-zinc-300" />
                        <span className="font-semibold text-sm">No reservations found.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-zinc-50/80 transition-colors"
                    >
                      {/* Name */}
                      <td className="px-5 py-4 font-bold text-[#2A1613]">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                            <User size={14} />
                          </div>
                          <span>{contact.name}</span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-5 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-600">
                          <Mail size={12} className="text-zinc-400 shrink-0" />
                          <span className="truncate max-w-[150px]">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-600">
                          <Phone size={12} className="text-zinc-400 shrink-0" />
                          <span>{contact.phone}</span>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="px-5 py-4 text-zinc-700 font-medium">
                        {contact.subject || "General Inquiry"}
                      </td>

                      {/* Guests Count */}
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 font-bold text-zinc-700 border border-zinc-200">
                          <Users size={12} className="text-accent" />
                          {contact.person_count || "-"}
                        </span>
                      </td>

                      {/* Booking Date & Time */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-semibold text-[#2A1613] flex items-center gap-1">
                          <Calendar size={12} className="text-primary" />
                          <span>{contact.date || "-"}</span>
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Clock size={11} />
                          <span>{contact.time || "-"}</span>
                        </div>
                      </td>

                      {/* Message */}
                      <td className="px-5 py-4 max-w-xs">
                        <p className="line-clamp-2 text-zinc-600 leading-relaxed text-[11px]">
                          {contact.message || "No special requests mentioned."}
                        </p>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={contact.status || "new"}
                          onChange={(e) =>
                            handleStatusChange(contact.id, e.target.value)
                          }
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStatusColor(
                            contact.status || "new"
                          )}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Submission Date */}
                      <td className="px-5 py-4 text-zinc-400 whitespace-nowrap">
                        {contact.created_at
                          ? new Date(contact.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
                          title="Delete Reservation"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminContact;