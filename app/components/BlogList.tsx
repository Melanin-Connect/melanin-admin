interface Blog {
    _id?: string;
    title: string;
    content: string;
    category: string;
    author: string;
  }
  
  interface BlogListProps {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (id: string) => void;
  }
  
  export default function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
    return (
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded shadow-lg text-black bg-white">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-gray-500">{blog.category}</p>
            <p className="text-sm mt-2">{blog.author}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => onEdit(blog)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
              >
                ✏ Edit
              </button>
              <button
                onClick={() => onDelete(blog._id!)}
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  