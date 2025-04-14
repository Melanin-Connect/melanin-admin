"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { registerUser } from "../lib/api-client"; // Import the auth function
import { setCookie } from "cookies-next"; // Import setCookie function
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { useToast } from "../components/toast"; // Import our custom toast hook

// Define form data interface
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

// Define API response interface
interface RegisterResponse {
  token: string;
  role: string;

  // Add any other properties returned by your API
}

const SignupPage = () => {
  const router = useRouter(); // Initialize the router
  const { success, error: showError, ToastContainer } = useToast(); // Use our toast hook

  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  // UI state
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    // Reset states
    setError("");

    const { email, password, confirmPassword, role } = formData;

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      showError("Passwords do not match. Please try again.");
      return;
    }

    try {
      setLoading(true);

      // Use the auth service function instead of direct axios call
      const response: RegisterResponse = await registerUser(
        email,
        password,
        role
      );

      // Store the token and user role in cookies instead of localStorage
      setCookie("token", response.token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/dashboard",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setCookie("userRole", response.role, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/dashboard",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      console.log("Registration successful:", response);

      // Show success toast and redirect
      success("Account created successfully! Redirecting to dashboard...");

      // Add a short delay before redirecting to let the user see the toast
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        showError(err.message);
      } else {
        setError("An unexpected error occurred");
        showError("An unexpected error occurred. Please try again later.");
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center text-black justify-center bg-gray-100 p-6">
      {/* Toast Container - renders all active toasts */}
      <ToastContainer />

      <div className="w-full max-w-sm bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
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
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
