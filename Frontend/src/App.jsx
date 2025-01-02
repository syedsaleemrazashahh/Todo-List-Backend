import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Todo App
        </h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add
          </button>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <span className="text-gray-800">Sample Task</span>
            <div className="flex space-x-2">
              <button className="text-blue-500 hover:text-blue-600">
                Edit
              </button>
              <button className="text-red-500 hover:text-red-600">
                Delete
              </button>
            </div>
          </li>
          <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <span className="text-gray-800">Another Task</span>
            <div className="flex space-x-2">
              <button className="text-blue-500 hover:text-blue-600">
                Edit
              </button>
              <button className="text-red-500 hover:text-red-600">
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
