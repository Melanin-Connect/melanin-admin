const API_URL = "http://localhost:5000/api/blogs";

export const fetchBlogs = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getBlogById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createBlog = async (blog: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  return res.json();
};

export const updateBlog = async (id: string, blog: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  return res.json();
};

export const deleteBlog = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
