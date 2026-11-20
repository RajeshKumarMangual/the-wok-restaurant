import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Contact from "../pages/public/Contact";
import AdminContact from "../pages/admin/AdminContact";
import AdminBlogs from "../pages/admin/AdminBlogs";
import Blogs from "../pages/public/Blogs";
import BlogDetails from "../pages/public/BlogDetails";
import AdminMenu from "../pages/admin/AdminMenu";
import Menu from "../pages/public/Menu";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/menu" element={<Menu />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AdminPrivateRoute />}>
        <Route path="admin/dashboard/" element={<AdminDashboard />} />
        <Route path="admin/contact" element={<AdminContact />} />
        <Route path="admin/blogs" element={<AdminBlogs />} />
        <Route path="admin/menu" element={<AdminMenu />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
