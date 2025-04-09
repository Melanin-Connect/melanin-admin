"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { getBlogById, updateBlog, BlogFormData } from "../lib/blog-client";

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    category: "",
    author: "",
    image: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(blogId);
        setFormData({
          title: blogData.title,
          content: blogData.content,
          category: blogData.category,
          author: blogData.author,
          image: blogData.image || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blog");
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim() || !formData.category.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setError(null);
    
    try {
      const updatedBlog = await updateBlog(blogId, formData);
      router.push(`/blogs/${updatedBlog._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update blog");
      console.error("Error updating blog:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Sidebar Section */}
      <div className="fixed inset-y-0 left-0 lg:block lg:w-64 w-full z-30">
        <Sidebar />
      </div>
      <div className="ml-0 lg:ml-64 min-h-screen mt-10 bg-gray-100 p-6">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
            <Link href="/blogs" className="text-red-700 underline ml-2">
              Return to blog list
            </Link>
          </div>
        )}

        {/* Blog Edit Form */}
        {!loading && !error && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Blog Post</h2>
                <Link
                  href={`/blogs/${blogId}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to blog
                </Link>
              </div>

              {/* Submission Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {/* Blog Form */}
              <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Author Field */}
                <div className="mb-4">
                  <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Category Field */}
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Business">Business</option>
                    <option value="Health">Health</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Image URL Field */}
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Content Field */}
                <div className="mb-6">
                  <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 disabled:opacity-50"
                  >
                    {submitting ? "Updating..." : "Update Blog Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}