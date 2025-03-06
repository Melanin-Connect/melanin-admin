import { useState } from "react";

interface Blog {
  _id?: string;
  title: string;
  content: string;
  category: string;
  author: string;
}

interface BlogFormProps {
  blog?: Blog | null;
  onClose: () => void;
  onSubmit: (blog: Blog) => void;
}

export default function BlogForm({ blog, onClose, onSubmit }: BlogFormProps) {
  const [form, setForm] = useState<Blog>(
    blog || { title: "", content: "", category: "", author: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full sm:w-[90%] animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {blog ? "Edit Blog" : "Create Blog"}
        </h2>
        <form className="text-black space-y-4" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            className="border border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <input
            className="border border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
          <textarea
            className="border border-gray-300 w-full p-3 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-300"
            >
              {blog ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
