'use client';
import React from 'react';
import { Plus, List, Users, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import Sidebar from './components/Sidebar';

const Dashboard = () => {
  return (
    <>
      {/* Sidebar Section */}
      <div className="fixed inset-y-0 left-0 lg:block lg:w-64 w-full z-30">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="ml-0 lg:ml-64 min-h-screen mt-10 bg-gray-100 p-6 flex flex-col">
        {/* Header Section */}
        <header className="flex justify-center text-black items-center bg-white p-4 rounded-lg mb-6">
          Welcome
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Blogs</h3>
              <p className="text-3xl font-bold text-blue-600">3</p>
            </div>
            <List className="text-blue-600 w-10 h-10" />
          </div>

          <div className="bg-white p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Subscriptions</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <Users className="text-green-600 w-10 h-10" />
          </div>

          <div className="bg-white p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Analytics</h3>
              <p className="text-3xl font-bold text-yellow-600">Monthly Report</p>
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
              href="/blog-list"
              className="flex items-center gap-4 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <List className="w-8 h-8" />
              View Blogs
            </Link>
            <Link
              href="/subscription"
              className="flex items-center gap-4 p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              <Users className="w-8 h-8" />
              Manage Subscriptions
            </Link>
          </div>
        </section>

        {/* Recent Blogs Section */}
        <section className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Blogs</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">How to Master Next.js</h3>
                <p className="text-sm text-gray-600">Published on 2025-04-01</p>
              </div>
              <Link
                href="/blog-list"
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Using Tailwind CSS with Next.js</h3>
                <p className="text-sm text-gray-600">Published on 2025-03-28</p>
              </div>
              <Link
                href="/blog-list"
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
