import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md w-full transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
