import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const BASE_URL = "http://localhost:3000";

  const [todos, setTodos] = useState([]); // Initialized state

  const getTodo = async () => {
    try {
      const res = await axios(`${BASE_URL}/api/v1/todos`);
      const todosFromServer = res?.data?.data || []; // Fallback to empty array
      console.log("todosFromServer ", todosFromServer);
      setTodos(todosFromServer);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (event) => {
    try {
      event.preventDefault(); // ye line refresh se bachati hai
      const todoValue = event.target.elements.todoInput.value; // Access input value
      if (!todoValue.trim()) return; // ye line ignore karti hai empty todo ko

      await axios.post(`${BASE_URL}/api/v1/todo`, {
        todo: todoValue,
      });

      event.target.reset(); // ye line input ko clear karti hai
      getTodo(); // ye line refresh karti hai naya todo ane k baad
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Todo App
        </h1>

        <form onSubmit={addTodo} className="flex items-center mb-4">
          <input
            type="text"
            name="todoInput" // Added name for input reference
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit" // Changed button type to submit
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos?.map((todo) => (
            <li
              key={todo.id} // Added unique key for list items
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
            >
              <span className="text-gray-800">{todo.todoContent}</span>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-600">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
