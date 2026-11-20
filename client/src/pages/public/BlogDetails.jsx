import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, ArrowLeft } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API}/blogs/${id}/`);
      setBlog(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
        <div className="h-80 rounded-xl bg-gray-200"></div>

        <div className="mt-8 space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>

          <div className="space-y-3 mt-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          Blog not found.
        </h2>
      </div>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 mb-8 text-primary font-medium hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Blogs
        </Link>

        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-[450px] object-cover rounded-2xl shadow"
        />

        <div className="mt-8">

          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full capitalize">
            {blog.category.replace("-", " ")}
          </span>

          <h1 className="text-5xl font-bold mt-5">
            {blog.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-500 mt-4">
            <CalendarDays size={18} />
            {new Date(blog.created_at).toLocaleDateString()}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-lg text-gray-700 leading-9 whitespace-pre-line">
              {blog.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogDetails;