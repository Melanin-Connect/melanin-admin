"use client";

import { useEffect, useState } from "react";
import { fetchBlogs, deleteBlog, createBlog, updateBlog } from "./utils/api";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";

interface Blog {
  _id?: string;
  title: string;
  content: string;
  category: string;
  author: string;
}

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await fetchBlogs();
    setBlogs(data);
  };

  const openModal = (blog: Blog | null = null) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBlog(null);
  };

  const handleSubmit = async (blog: Blog) => {
    if (selectedBlog) {
      await updateBlog(selectedBlog._id!, blog);
    } else {
      await createBlog(blog);
    }
    closeModal();
    loadBlogs();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button
        onClick={() => openModal()}
        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
      >
        ➕ Create New Blog
      </button>
      <BlogList blogs={blogs} onEdit={openModal} onDelete={handleDelete} />
      {modalOpen && <BlogForm blog={selectedBlog} onClose={closeModal} onSubmit={handleSubmit} />}
    </div>
  );
}
