"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Import from next/navigation for app router
import { Home, List, Plus, Users, X } from "lucide-react";
import { useState } from "react";
import { deleteCookie } from 'cookies-next';

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logoutUser = () => {
    // Clear authentication cookies
    deleteCookie('token');
    deleteCookie('userRole');
    
    // Redirect to signin page using Next.js router
    router.push('/');
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Close the sidebar when clicking outside
  const closeSidebar = () => setIsOpen(false);

  // Close the sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false); // Close the sidebar
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="lg:h-screen lg:w-64 bg-gray-800 text-white  flex-col p-4 fixed lg:relative z-20 lg:block hidden">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col mb-[70%] gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <Home /> Dashboard
          </Link>
          <Link
            href="/add-blog"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <Plus /> Add Blog
          </Link>
          <Link
            href="/blogs"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <List /> Blog List
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <Users /> settings
          </Link>

          <div className="fixed bottom-6 ml-14 transform cursor-pointer -translate-x-1/2 bg-white text-center rounded-2xl z-30">
            {/* Logout button for desktop */}
            <button
              onClick={logoutUser}
              className="text-black cursor-pointer text-center py-2 px-4 rounded-lg"
            >
              Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navbar toggle button */}
      <div className="lg:hidden flex items-center p-4 bg-gray-800 text-white fixed top-0 left-0 w-full z-30">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Dropdown */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={closeSidebar} // Close sidebar if clicked outside
      >
        <div
          className="w-full h-full p-6 bg-gray-800 text-white relative"
          onClick={(e) => e.stopPropagation()} // Prevent sidebar from closing when clicked inside
        >
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-white"
          >
            <X className="h-6 w-6" /> {/* Close Icon */}
          </button>

          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="flex flex-col mb-[70%] gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
              onClick={handleLinkClick} // Close the sidebar when a link is clicked
            >
              <Home /> Dashboard
            </Link>
            <Link
              href="/add-blog"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
              onClick={handleLinkClick} // Close the sidebar when a link is clicked
            >
              <Plus /> Add Blog
            </Link>
            <Link
              href="/blogs"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
              onClick={handleLinkClick} // Close the sidebar when a link is clicked
            >
              <List /> Blog List
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
              onClick={handleLinkClick} // Close the sidebar when a link is clicked
            >
              <Users /> settings
            </Link>
          </nav>

          {/* Logout button for mobile */}
          <div className="fixed bottom-6 ml-20 transform -translate-x-1/2 bg-white text-center rounded-2xl z-30">
            <button
              onClick={logoutUser}
              className="text-black text-center py-2 px-4 rounded-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;