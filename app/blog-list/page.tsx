import React from "react";
import Image from "next/image";
import pic from "../../public/assets/nextjs.avif"; // Adjust the path if needed

const BlogList = () => {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "Mastering Next.js 14 for Scalable Apps",
      category: "Tech",
      description:
        "Learn how to build scalable applications using Next.js 14 with advanced features.",
      date: "2025-04-01",
      imageUrl: pic, // Using imported image path
    },
    {
      id: 2,
      title: "5 Tips for a Healthy Lifestyle",
      category: "Health",
      description:
        "Discover practical tips for maintaining a healthy lifestyle and boosting your well-being.",
      date: "2025-03-28",
      imageUrl: pic, // Use the same image or a different one as needed
    },
    {
      id: 3,
      title: "Understanding TypeScript for Beginners",
      category: "Programming",
      description:
        "A beginner-friendly guide to understanding TypeScript and its benefits in modern development.",
      date: "2025-03-20",
      imageUrl: pic, // External image URL
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Blog List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {/* Blog Image with next/image */}
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={500} // Set width
              height={300} // Set height
              className="w-full h-48 object-cover"
            />

            {/* Blog Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
              <p className="text-gray-700 mb-4">{blog.description}</p>
              <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
