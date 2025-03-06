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
  const [form, setForm] = useState<Blog>(blog || { title: "", content: "", category: "", author: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{blog ? "Edit" : "Create"} Blog</h2>
        <form className="text-black " onSubmit={handleSubmit}>
          <input className="border w-full p-2 rounded mb-3" type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
          <input className="border w-full p-2 rounded mb-3" type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
          <input className="border w-full p-2 rounded mb-3" type="text" name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
          <textarea className="border w-full p-2 rounded mb-3" name="content" value={form.content} onChange={handleChange} placeholder="Content" required />
          <div className="flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" type="submit">
              {blog ? "Update" : "Create"}
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
