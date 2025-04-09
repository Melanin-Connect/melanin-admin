import axios from "axios";
import { getCookie } from 'cookies-next';

// The base API URL using environment variable
const API_URL = process.env.NEXT_PUBLIC_API_BLOG || "http://localhost:5000/api/blogs";

// Types for blog data - Matching backend mongoose schema
export interface Comment {
  _id?: string;
  user: string;
  text: string;
  createdAt: Date;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  image: string; // Changed from image to image
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

// Form data interface matching your frontend form
export interface BlogFormData {
  title: string;
  content: string;
  category: string;
  author: string;
  image: string; // Changed from image: File | null to image: string
}

export interface CommentFormData {
  user: string;
  text: string;
}

// Get all blogs
export async function getBlogs(): Promise<Blog[]> {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Failed to fetch blogs."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Get a single blog by ID
export async function getBlogById(id: string): Promise<Blog> {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error ||
        err.response?.data?.message || 
        "Failed to fetch blog."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Create a new blog - Updated to use image instead of File upload
export async function createBlog(blogData: BlogFormData): Promise<Blog> {
  try {
    const token = getCookie('token');
    
    // Using explicit console log to help debug
    console.log("Sending blog data to API:", {
      title: blogData.title,
      content: blogData.content,
      category: blogData.category,
      author: blogData.author,
      image: blogData.image
    });
    
    // Send JSON with the image explicitly included
    const response = await axios.post(
      `${API_URL}`, 
      {
        title: blogData.title,
        content: blogData.content,
        category: blogData.category,
        author: blogData.author,
        image: blogData.image // Make sure this field name matches what your backend expects
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log("Response from API:", response.data);
    return response.data;
  } catch (err) {
    console.error("Blog creation error:", err);
    if (axios.isAxiosError(err)) {
      console.error("API error response:", err.response?.data);
      throw new Error(
        err.response?.data?.error ||
        err.response?.data?.message || 
        "Failed to create blog."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Update a blog - Updated to use image
export async function updateBlog(id: string, blogData: Partial<BlogFormData>): Promise<Blog> {
  try {
    const token = getCookie('token');
    
    // Send regular JSON with all data including image
    const dataToSend = {
      ...(blogData.title && { title: blogData.title }),
      ...(blogData.content && { content: blogData.content }),
      ...(blogData.category && { category: blogData.category }),
      ...(blogData.author && { author: blogData.author }),
      ...(blogData.image && { image: blogData.image })
    };
    
    const response = await axios.put(
      `${API_URL}/${id}`, 
      dataToSend,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Failed to update blog."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Like a blog
export async function likeBlog(id: string): Promise<Blog> {
  try {
    const response = await axios.put(`${API_URL}/${id}/like`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Failed to like blog."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Add a comment to a blog
export async function addComment(blogId: string, commentData: CommentFormData): Promise<Blog> {
  try {
    const response = await axios.post(
      `${API_URL}/${blogId}/comments`, 
      commentData
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Failed to add comment."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Delete a comment
export async function deleteComment(blogId: string, commentId: string): Promise<{ message: string; blog: Blog }> {
  try {
    const token = getCookie('token');
    const response = await axios.delete(
      `${API_URL}/${blogId}/comments/${commentId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Failed to delete comment."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Delete a blog
export async function deleteBlog(id: string): Promise<{ message: string }> {
  try {
    const token = getCookie('token');
    const response = await axios.delete(
      `${API_URL}/${id}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Failed to delete blog."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Helper function to configure axios with auth header
export function configureBlogApiWithAuth() {
  axios.interceptors.request.use(
    (config) => {
      const token = getCookie('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}