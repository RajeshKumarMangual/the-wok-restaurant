import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    date: "",
    time: "",
    person_count: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/contacts/create/`,
        formData
      );

      setSuccess(
        res.data.message || "Your table has been reserved successfully."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        date: "",
        time: "",
        person_count: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFDFB] text-[#2A1613] min-h-screen">
      
      {/* HERO HEADER BANNER */}
      <section className="relative bg-[#2A1613] py-24 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E85025_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Book a <span className="text-primary">Table</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-accent">Reservation</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Contact & Timing Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-block text-xs font-bold bg-primary/10 text-primary px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-primary/20 mb-3">
                Reach Out
              </span>
              <h2 className="text-3xl font-black text-[#2A1613] leading-tight">
                Get in Touch & Reserve Your Experience
              </h2>
              <p className="text-zinc-600 text-sm mt-3 leading-relaxed">
                Whether you're planning an intimate family dinner, a party with friends, or just craving authentic wok-tossed delights, reserve your table ahead to ensure prompt seating!
              </p>
            </div>

            {/* Quick Contact Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-xl shrink-0">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2A1613]">Direct Line</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Call for instant inquiry</p>
                  <a href="tel:+123456789" className="text-sm font-bold text-primary hover:underline mt-1 inline-block">
                    +91 (123) 456 789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="p-3 bg-accent/10 border border-accent/20 text-accent rounded-xl shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2A1613]">Email Reservations</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">We reply within 2 hours</p>
                  <a href="mailto:hello@thewok.com" className="text-sm font-bold text-accent hover:underline mt-1 inline-block">
                    hello@thewok.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-xl shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2A1613]">Restaurant Address</h4>
                  <p className="text-xs text-zinc-600 mt-1 leading-normal">
                    55 Main Street, Food Hub Street, India
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Banner */}
            <div className="p-6 rounded-2xl bg-[#2A1613] text-white space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-2 text-accent font-bold text-sm">
                <Clock size={16} />
                <span>Operating Hours</span>
              </div>
              <div className="text-xs space-y-1.5 text-zinc-300">
                <div className="flex justify-between">
                  <span>Monday – Friday:</span>
                  <span className="font-semibold text-white">11:00 AM – 10:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday – Sunday:</span>
                  <span className="font-semibold text-white">10:30 AM – 11:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Reservation Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/80 shadow-lg p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-[#2A1613] mb-2">
              Table Reservation Form
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm mb-6">
              Fill out your booking details and our staff will get back to confirm your reservation.
            </p>

            {/* Success Alert */}
            {success && (
              <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-sm flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 p-4 text-sm flex items-center gap-3">
                <AlertCircle size={20} className="text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Subject */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <PhoneCall size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 9876543210"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Subject / Event *
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Birthday, Casual Dinner..."
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>

              {/* Date, Time & Person Count */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Guests *
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="number"
                      name="person_count"
                      required
                      min="1"
                      value={formData.person_count}
                      onChange={handleChange}
                      placeholder="Count"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Additional Requests
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mention high-chair requirements, allergies, or seating preferences..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.99] transition duration-200 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Processing Booking..." : "CONFIRM RESERVATION"}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;