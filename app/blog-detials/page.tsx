"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { 
  getBlogById, 
  likeBlog, 
  addComment, 
  deleteComment, 
  Blog, 
  CommentFormData,
  deleteBlog
} from "../lib/blog-client";

const BlogDetail = () => {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;

  // State for blog data and UI states
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<CommentFormData>({
    user: "",
    text: ""
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  // Fetch blog on component mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(blogId);
        setBlog(blogData);
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

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle like blog
  const handleLike = async () => {
    try {
      const updatedBlog = await likeBlog(blogId);
      setBlog(updatedBlog);
    } catch (err) {
      console.error("Error liking blog:", err);
      alert(err instanceof Error ? err.message : "Failed to like blog");
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.user.trim() || !comment.text.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const updatedBlog = await addComment(blogId, comment);
      setBlog(updatedBlog);
      setComment({ user: "", text: "" });
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(err instanceof Error ? err.message : "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      const response = await deleteComment(blogId, commentId);
      setBlog(response.blog);
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert(err instanceof Error ? err.message : "Failed to delete comment");
    }
  };

  // Handle delete blog
  const handleDeleteBlog = async () => {
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBlog(blogId);
      router.push("/");
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert(err instanceof Error ? err.message : "Failed to delete blog");
    }
    setDeleteConfirm(false);
  };

  return (
    <>
      {/* Sidebar Section */}
      <div className="fixed inset-y-0 left-0 lg:block lg:w-64 w-full z-30">
        <Sidebar />
      </div>
      <div className="ml-0 lg:ml-64 min-h-screen pt-10 bg-gray-100 pb-10">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-6 mb-4">
            <span className="block sm:inline">{error}</span>
            <Link href="/" className="text-red-700 underline ml-2">
              Return to blog list
            </Link>
          </div>
        )}

        {/* Blog Content */}
        {!loading && blog && (
          <div className="max-w-4xl mx-auto px-6">
            {/* Blog Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              {/* Blog Image - FIXED: Changed from blog.image to blog.imageUrl */}
              {blog.image && (
                <div className="relative w-full h-80">
                  <Image 
                    src={blog.image} 
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Blog Title and Meta */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Link 
                    href="/"
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
                    Back to blogs
                  </Link>
                  <div className="flex space-x-2">
                    <Link
                      href={`/edit-blog/${blog._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDeleteBlog}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h1>
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <span>By {blog.author}</span>
                  <span>{formatDate(blog.createdAt)}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>

                {/* Blog Content */}
                <div className="prose max-w-none mt-6">
                  <p className="whitespace-pre-line">{blog.content}</p>
                </div>
              </div>
            </div>

            {/* Like Button */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Did you enjoy this article?</h2>
                <button
                  onClick={handleLike}
                  className="flex items-center bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-full transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                  {blog.likes} Likes
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Comments ({blog.comments.length})</h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="mb-4">
                  <label htmlFor="user" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="user"
                    value={comment.user}
                    onChange={(e) => setComment({ ...comment, user: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="text" className="block text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    id="text"
                    value={comment.text}
                    onChange={(e) => setComment({ ...comment, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Comment"}
                </button>
              </form>

              {/* Comments List */}
              {blog.comments.length > 0 ? (
                <div className="space-y-6">
                  {blog.comments.map((comment) => (
                    <div key={comment._id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{comment.user}</h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(comment.createdAt)}
                          </p>
                        </div>
                        <button
                          onClick={() => comment._id && handleDeleteComment(comment._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete comment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-2">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Delete Blog Post</h3>
              <p className="mb-6">Are you sure you want to delete this blog post? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetail;