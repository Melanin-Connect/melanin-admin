"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { getBlogs, Blog } from "../lib/blog-client";

export default function BlogList() {
  // State for blogs data and loading state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getBlogs();
        setBlogs(blogData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Format date for display - fixed to handle string dates from API
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Try to fetch again if an error occurred
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const fetchBlogs = async () => {
      try {
        const blogData = await getBlogs();
        setBlogs(blogData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  };

  return (
    <>
      {/* Sidebar Section */}
      <div className="fixed inset-y-0 left-0 lg:block lg:w-64 w-full z-30">
        <Sidebar />
      </div>
      <div className="ml-0 lg:ml-64 min-h-screen mt-10 bg-gray-100 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Blog List</h2>
          <Link
            href="/add-blog"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Add New Blog
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Error State with Retry Button */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={handleRetry}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && !error && (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first blog post to get started!
            </p>
            <Link
              href="/add-blog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Create Blog Post
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                href={`/blogs/${blog._id}`}
                key={blog._id}
                className="bg-white rounded-lg hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
              >
                {/* Blog Image (if available) */}
                {blog.image && (
                  <div className="relative w-full h-48">
                    <Image 
                      src={blog.image} 
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Blog Content */}
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500">
                      {formatDate(blog.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600">By {blog.author}</p>
                  </div>

                  {/* Category Tag */}
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Show truncated content */}
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  {/* Interaction stats */}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="flex items-center text-gray-600">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {blog.likes}
                    </span>
                    <span className="flex items-center text-gray-600">
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      {blog.comments.length}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}