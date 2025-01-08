import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function App() {
  const BASE_URL = "http://localhost:3000";

  const [todos, setTodos] = useState([]);

  const getTodo = async () => {
    try {
      const res = await axios(`${BASE_URL}/api/v1/todos`);
      const todosFromServer = res?.data?.data || [];
      const updatedTodos = todosFromServer.map((todo) => {
        return { ...todo, isEditing: false };
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (event) => {
    try {
      event.preventDefault();
      const todoValue = event.target.elements.todoInput.value;
      if (!todoValue.trim()) return;

      await axios.post(`${BASE_URL}/api/v1/todo`, {
        todo: todoValue,
      });

      event.target.reset();
      getTodo();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const deleteTodo = async (todoId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/v1/todo/${todoId}`);
      toast.success(data?.message || "Todo deleted successfully");
      getTodo();
    } catch (err) {
      console.error("Error deleting todo:", err);
      toast.error(err?.response?.data?.message || "Unknown error");
    }
  };

  const editTodo = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        todo.isEditing = !todo.isEditing; // Toggle isEditing for the clicked todo
      } else {
        todo.isEditing = false; // Ensure only one todo is in editing mode
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Todo App
        </h1>

        <form onSubmit={addTodo} className="flex items-center mb-4">
          <input
            type="text"
            name="todoInput"
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        {!todos.length && <p>Todo nahi hai</p>}
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
            >
              {!todo.isEditing ? (
                <span className="text-gray-800">{todo.todoContent}</span>
              ) : (
                <input
                  type="text"
                  value={todo.todoContent}
                  className="border border-gray-300 rounded-lg px-2 py-1"
                />
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => editTodo(index)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {todo.isEditing ? "Cancel" : "Edit"}
                </button>
                {!todo.isEditing ? (
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button>Save</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
