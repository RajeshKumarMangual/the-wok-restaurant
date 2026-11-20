import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Utensils,
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login/`,
        formData,
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "is_superuser",
          response.data.is_superuser.toString(),
        );

        if (response.data.is_superuser) {
          navigate("/admin/dashboard/");
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FFFDFB] flex items-center justify-center px-4 py-12 relative overflow-hidden text-[#2A1613]">
      {/* Background Brand Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-zinc-200/80 rounded-3xl shadow-xl p-7 md:p-9">
        {/* Brand Icon Header */}
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src={logo} alt="The Wok Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#2A1613]">Welcome Back</h1>

          <p className="text-zinc-500 text-xs sm:text-sm mt-1.5">
            Sign in to access your administrative dashboard or orders.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-2xl flex items-center gap-2.5">
            <AlertCircle size={16} className="shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-3.5 text-zinc-400"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full pl-10 pr-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl text-xs text-[#2A1613] placeholder:text-zinc-400 outline-none focus:border-primary focus:bg-white transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-3.5 text-zinc-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-11 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl text-xs text-[#2A1613] placeholder:text-zinc-400 outline-none focus:border-primary focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-zinc-400 hover:text-zinc-600 transition cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md shadow-primary/20 cursor-pointer disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                <span>Authenticating...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Back to Home Link */}
        <div className="text-center mt-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-primary transition"
          >
            <ArrowLeft size={14} />
            <span>Back to Main Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
