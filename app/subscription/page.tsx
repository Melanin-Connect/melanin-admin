import React from "react";
import Sidebar from "../components/Sidebar";

const Subscriptions = () => {
  return (
    <>
      {/* Sidebar Section */}
      <div className="fixed inset-y-0 left-0 lg:block lg:w-64 w-full z-30">
        <Sidebar />
      </div>
      <div className="ml-0 lg:ml-64 min-h-screen mt-10 bg-gray-100 p-6 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Subscriptions
        </h2>
        <ul className="space-y-4">
          <li className="bg-white p-4   flex items-center justify-between hover:bg-gray-50 transition duration-300">
            <div className="flex items-center">
              <span className="font-medium text-gray-800">User 1</span>
            </div>
            <span className="text-green-600 font-medium">Active</span>
          </li>
          <li className="bg-white p-4  flex items-center justify-between hover:bg-gray-50 transition duration-300">
            <div className="flex items-center">
              <span className="font-medium text-gray-800">User 2</span>
            </div>
            <span className="text-red-600 font-medium">Inactive</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Subscriptions;
