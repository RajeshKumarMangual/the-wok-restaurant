import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogIn, LogOut, UtensilsCrossed } from "lucide-react";
import logo from "../../assets/logo.png"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_superuser");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-[#2A1613] border-b border-[#351C18] sticky top-0 z-50 shadow-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="The Wok Logo" 
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="hidden sm:block">
            <h1 className="text-white text-lg font-bold tracking-wide leading-none group-hover:text-primary transition-colors">
              THE WOK
            </h1>
            <p className="text-accent text-[10px] tracking-widest font-semibold uppercase mt-0.5">
              Chinese Kitchen
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-all duration-300 py-1.5 ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-zinc-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {/* Active Link Glow Line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_8px_#E85025]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Admin Dashboard */}
          {token && isSuperuser && (
            <Link
              to="/admin/dashboard/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-200 font-medium hover:text-white bg-[#351C18] hover:bg-secondary/40 border border-secondary/30 rounded-lg transition-all duration-200 shadow-sm"
            >
              <LayoutDashboard size={16} className="text-accent" />
              <span>Dashboard</span>
            </Link>
          )}

          {/* Login */}
          {!token && (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md shadow-primary/20 hover:shadow-primary/40 active:scale-95"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-secondary/80 hover:bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer border border-secondary/50 active:scale-95 shadow-sm"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-zinc-300 hover:text-white bg-[#351C18] rounded-lg border border-zinc-800 transition focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#2A1613] border-b border-[#351C18] px-6 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2 border-b border-zinc-800/80 pb-4">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-base font-medium transition ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                      : "text-zinc-300 hover:bg-[#351C18] hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-2 pt-1">
            {token && isSuperuser && (
              <Link
                to="/admin/dashboard/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-zinc-200 font-medium bg-[#351C18] rounded-lg border border-secondary/30"
              >
                <LayoutDashboard size={18} className="text-accent" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            {!token ? (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-secondary text-white py-2.5 rounded-lg font-semibold shadow-md"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center justify-center gap-2 w-full bg-secondary/80 hover:bg-secondary text-white py-2.5 rounded-lg font-semibold transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;