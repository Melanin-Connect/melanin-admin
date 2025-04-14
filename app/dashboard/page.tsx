'use client';
import React, { useEffect, useState } from 'react';
import { Plus, List, Users, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { getBlogs, Blog } from '../lib/blog-client';

const Dashboard = () => {
  // State for blogs data
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

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate total comments across all blogs
  const totalComments = blogs.reduce((sum, blog) => sum + blog.comments.length, 0);

  // Get the 3 most recent blogs
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <>
      {/* Sidebar Section */}
      <div className="fixed inset-y-0 left-0 lg:block lg:w-64 w-full z-30">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="ml-0 lg:ml-64 min-h-screen mt-10 bg-gray-100 p-6 flex flex-col">
        {/* Header Section */}
        <header className="flex justify-between items-center bg-white p-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Blog Dashboard</h1>
          {loading ? (
            <div className="text-sm text-gray-500">Loading data...</div>
          ) : (
            <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
          )}
        </header>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => window.location.reload()}
              className="ml-2 underline"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Stats Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg flex items-center justify-between 
          ">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Blogs</h3>
              {loading ? (
                <div className="h-9 w-8 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-3xl font-bold text-blue-600">{blogs.length}</p>
              )}
            </div>
            <List className="text-blue-600 w-10 h-10" />
          </div>

          <div className="bg-white p-6 rounded-lg flex items-center justify-between 
          ">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Comments</h3>
              {loading ? (
                <div className="h-9 w-8 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-3xl font-bold text-green-600">{totalComments}</p>
              )}
            </div>
            <Users className="text-green-600 w-10 h-10" />
          </div>

          <div className="bg-white p-6 rounded-lg flex items-center justify-between 
          ">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Likes</h3>
              {loading ? (
                <div className="h-9 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-3xl font-bold text-yellow-600">
                  {blogs.reduce((sum, blog) => sum + blog.likes, 0)}
                </p>
              )}
            </div>
            <BarChart2 className="text-yellow-600 w-10 h-10" />
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <Link
              href="/add-blog"
              className="flex items-center gap-4 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Plus className="w-8 h-8" />
              Add Blog
            </Link>
            <Link
              href="/"
              className="flex items-center gap-4 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <List className="w-8 h-8" />
              View Blogs
            </Link>
            <div
              className="flex items-center gap-4 p-4 bg-yellow-500 text-white rounded-lg cursor-not-allowed opacity-60"
            >
              <Users className="w-8 h-8" />
              Manage Subscriptions
            </div>
          </div>
        </section>

        {/* Recent Blogs Section */}
        <section className="bg-white p-6 rounded-lg 
        ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Blogs</h2>
            <Link
              href="/"
              className="text-blue-600 hover:underline text-sm"
            >
              View All
            </Link>
          </div>
          
          {loading ? (
            // Loading state
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            // Empty state
            <div className="text-center py-8 border rounded-lg">
              <p className="text-gray-500 mb-4">No blogs found</p>
              <Link
                href="/add-blog"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Create Your First Blog
              </Link>
            </div>
          ) : (
            // Blog list
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div key={blog._id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                    <div className="flex text-sm text-gray-600 space-x-4">
                      <p>Published on {formatDate(blog.createdAt)}</p>
                      <p>By {blog.author}</p>
                      <p className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
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
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Dashboard;