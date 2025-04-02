'use client';

import React, { useState } from "react";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center text-black justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="w-full max-w-lg bg-white  p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload with Preview */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Thumbnail Image
            </label>
            <div className="relative w-full h-48 bg-gray-100 rounded-md border border-dashed border-gray-400 flex justify-center items-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <span className="text-gray-500">No image selected</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Blog Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full border rounded-md p-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Blog Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Blog Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter blog description"
              rows={5}
              className="w-full border rounded-md p-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Blog Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Blog Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter blog category"
              className="w-full border rounded-md p-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
