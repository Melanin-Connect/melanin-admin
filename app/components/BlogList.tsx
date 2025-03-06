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
      <div className="grid grid-cols-1 sm:grid-cols-2 text-black md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-5 rounded-xl shadow-md bg-white hover:shadow-xl transition duration-300"
          >
            <h3 className="text-lg md:text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-500 text-sm md:text-base">{blog.category}</p>
            <p className="text-xs md:text-sm mt-2 text-gray-700">{blog.author}</p>
            
            <div className="mt-4 flex flex-wrap justify-between gap-2">
              <button
                onClick={() => onEdit(blog)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm md:text-base transition"
              >
                ✏ Edit
              </button>
              <button
                onClick={() => onDelete(blog._id!)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm md:text-base transition"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  