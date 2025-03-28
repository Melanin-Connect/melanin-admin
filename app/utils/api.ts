import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

export const fetchBlogs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getBlogById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createBlog = async (blog: any) => {
  const res = await axios.post(API_URL, blog, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateBlog = async (id: string, blog: any) => {
  const res = await axios.put(`${API_URL}/${id}`, blog, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteBlog = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
