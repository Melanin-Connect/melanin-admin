"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { loginUser } from "../lib/api-client"; // Import the auth function
import { setCookie } from 'cookies-next'; // Import setCookie function
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { useToast } from "./toast"; // Import our custom toast hook

// Define form data interface
interface LoginFormData {
  email: string;
  password: string;
}

// Define API response interface
interface LoginResponse {
  token: string;
  role: string;
  name?: string;
 
}

const LoginPage = () => {
  const router = useRouter(); // Initialize the router
  const { success, error: showError, warning, ToastContainer } = useToast(); // Use our toast hook
  
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  
  // UI state
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Reset states
    setError("");
    
    const { email, password } = formData;
    
    // Basic validation
    if (!email || !password) {
      setError("Email and password are required");
      showError("Email and password are required");
      return;
    }
    
    try {
      setLoading(true);
      
      // Use the auth service function
      const response: LoginResponse = await loginUser(email, password);
      
      // Store the token and user role in cookies
      setCookie('token', response.token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/dashboard',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      setCookie('userRole', response.role, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/dashboard',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      console.log("Login successful:", response);
      
      // Show success toast
      success(`Welcome back${response.name ? `, ${response.name}` : ''}! Logging you in...`);
      
      // Add a short delay before redirecting
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        
        // Show more specific error messages
        if (err.message.includes("Invalid credentials")) {
          showError("Invalid email or password. Please try again.");
        } else if (err.message.includes("not found")) {
          warning("Account not found. Please check your email or sign up.");
        } else {
          showError(err.message);
        }
      } else {
        setError("An unexpected error occurred");
        showError("An unexpected error occurred. Please try again later.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-100 p-6">
      {/* Toast Container - renders all active toasts */}
      <ToastContainer />
      
      <div className="w-full max-w-sm bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            {/* <div className="text-sm">
              <Link href="/forgot-password">
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </Link>
            </div> */}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
          Don&#39;t have an account?{" "}
            <Link href="/signup">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;