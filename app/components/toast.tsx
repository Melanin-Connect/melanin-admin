import React, { useState, useEffect, ReactNode, JSX } from "react";

// Define toast type options
type ToastType = "success" | "error" | "warning" | "info";

// Define props interface for Toast component
interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

// Define interface for toast style options
interface ToastStyleOption {
  bg: string;
  border: string;
  text: string;
  icon: ReactNode;
}

// Define interface for toast style mapping
interface ToastStyles {
  [key: string]: ToastStyleOption;
}

// Define interface for a toast item
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

// Define return type for useToast hook
interface UseToastReturn {
  showToast: (message: string, type?: ToastType, duration?: number) => string;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  ToastContainer: () => JSX.Element;
}

/**
 * Toast notification component
 */
const Toast: React.FC<ToastProps> = ({
  message = "",
  type = "info",
  duration = 3000,
  onClose = () => {},
  visible = true,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  // Handle auto-dismiss
  useEffect(() => {
    setIsVisible(visible);

    if (visible && duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  // Close toast manually
  const handleClose = (): void => {
    setIsVisible(false);
    onClose();
  };

  // Define styles based on toast type
  const toastStyles: ToastStyles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-700",
      icon: (
        <svg
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-700",
      icon: (
        <svg
          className="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-700",
      icon: (
        <svg
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const style = toastStyles[type] || toastStyles.info;

  if (!isVisible) return null;

  return (
    <div className="fixed z-50 top-4 right-4 left-4 md:top-6 md:right-6 md:left-auto md:max-w-md">
      <div
        className={`${style.bg} ${style.border} ${style.text} border-l-4 p-4 flex items-center shadow-lg rounded-md animate-fade-in`}
        role="alert"
      >
        <div className="flex-shrink-0 mr-3">{style.icon}</div>
        <div className="flex-grow">{message}</div>
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Create a utility to manage multiple toasts
export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Generate a unique ID for each toast
  const generateId = (): string =>
    `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Add a new toast
  const showToast = (
    message: string,
    type: ToastType = "info",
    duration: number = 3000
  ): string => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  // Convenience methods
  const success = (message: string, duration?: number): string =>
    showToast(message, "success", duration);
  const error = (message: string, duration?: number): string =>
    showToast(message, "error", duration);
  const warning = (message: string, duration?: number): string =>
    showToast(message, "warning", duration);
  const info = (message: string, duration?: number): string =>
    showToast(message, "info", duration);

  // Remove a toast by ID
  const hideToast = (id: string): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Clear all toasts
  const clearToasts = (): void => {
    setToasts([]);
  };

  // Render all active toasts
  const ToastContainer = (): JSX.Element => (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => hideToast(toast.id)}
          visible={true}
        />
      ))}
    </div>
  );

  return {
    showToast,
    success,
    error,
    warning,
    info,
    hideToast,
    clearToasts,
    ToastContainer,
  };
};

export default Toast;
