import axios from "axios";
import { getCookie, setCookie } from 'cookies-next';

// The base API URL using environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://melanin-server-48us.onrender.com/api/auth";

// Types for authentication responses
export interface AuthResponse {
  token: string;
  role: string;
  message: string;
}

// Login user function
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      }
    );
    
    // Store authentication data on successful login
    setAuthenticationData(response.data);
    
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || 
        "Login failed. Please check your credentials."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Register user function
export async function registerUser(
  email: string, 
  password: string, 
  role: string
): Promise<AuthResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        email,
        password,
        role,
      }
    );
    
    // Store authentication data on successful registration
    setAuthenticationData(response.data);
    
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || 
        "Registration failed."
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

// Set authentication data in cookies and axios defaults
export function setAuthenticationData(response: { token: string; role: string }) {
  // Store the token and user role in cookies
  setCookie("token", response.token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  
  setCookie("userRole", response.role, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  
  // Set up axios default authorization header
  axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
}

// Get current user token
export function getToken(): string | null {
  return getCookie('token') as string | null;
}

// Get current user role
export function getUserRole(): string | null {
  return getCookie('userRole') as string | null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// Logout user
export function logoutUser() {
  setCookie("token", "", { maxAge: 0, path: "/" });
  setCookie("userRole", "", { maxAge: 0, path: "/" });
  delete axios.defaults.headers.common['Authorization'];
}

// Configuring axios with auth header (useful for authenticated requests)
export function configureAxiosWithAuth() {
  // Set current token if it exists
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Add interceptor for future requests
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
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