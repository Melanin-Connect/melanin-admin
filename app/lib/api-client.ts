import axios from "axios";
import { getCookie,  deleteCookie } from 'cookies-next';

//  the base API URL using environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://melanin-server-48us.onrender.com/api/auth";

//  types for authentication responses
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

// Logout user function
export function logoutUser(): void {
  deleteCookie('token');
  deleteCookie('userRole');
  
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

// Configuring axios with auth header (useful for authenticated requests)
export function configureAxiosWithAuth() {
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