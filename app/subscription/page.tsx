import React from "react";

const Subscriptions = () => {
  return (
    <>
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
    </>
  );
};

export default Subscriptions;
