'use client';

import { useEffect, useState } from 'react';
import { Plus, Calendar, ListChecks, AlertCircle, Trash2, Edit } from 'lucide-react'; // Added Trash2 and Edit icons

type Todo = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  isComplete: boolean;
  userId: string;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formDirty, setFormDirty] = useState(false);

  // State for editing
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  // --- IMPORTANT: Replace with actual user ID from session later ---
  const userId = 'f053f8b6-c418-44f8-9d80-f060bf821e0a';
  // -----------------------------------------------------------------

  // Function to fetch todos for the current user
  const fetchTodos = async () => {
    try {
      setLoading(true);
      // Fetch todos specifically for the current userId
      const res = await fetch(`/api/todos?userId=${userId}`); // Pass userId as query param
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTodos(data);
      setError(''); // Clear any fetch-related errors on success
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load your tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos on component mount and whenever the userId changes (though hardcoded here)
  useEffect(() => {
    fetchTodos();
  }, [userId]); // Dependency array includes userId

  const handleAddTodo = async () => {
    setError('');
    setFormDirty(true);

    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    if (!dueDate) {
      setError('A due date is required.');
      return;
    }
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Due date cannot be in the past.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, dueDate, userId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create todo');
      }

      const newTodo: Todo = await res.json();
      setTodos((prev) => [...prev, newTodo]); // Add new todo to the list
      setTitle('');
      setDescription('');
      setDueDate('');
      setFormDirty(false);
      setError('');
    } catch (err: any) {
      console.error('Error adding todo:', err);
      setError(err.message || 'Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete todo');
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id)); // Remove deleted todo from state
      setError('');
    } catch (err: any) {
      console.error('Error deleting todo:', err);
      setError(err.message || 'Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    // Ensure date format is YYYY-MM-DD for input type="date"
    setEditDueDate(new Date(todo.dueDate).toISOString().split('T')[0]);
    setError(''); // Clear errors when starting edit
  };

  const handleUpdateTodo = async () => {
    setError('');
    if (!editTitle.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    if (!editDueDate) {
      setError('A due date is required.');
      return;
    }
    const selectedDate = new Date(editDueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Due date cannot be in the past.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${editingTodoId}`, {
        method: 'PUT', // Or 'PATCH' depending on your backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          dueDate: editDueDate,
          // userId is not sent for update as it should not change
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update todo');
      }

      const updatedTodo: Todo = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      ); // Update todo in state
      setEditingTodoId(null); // Exit edit mode
      setEditTitle('');
      setEditDescription('');
      setEditDueDate('');
      setError('');
    } catch (err: any) {
      console.error('Error updating todo:', err);
      setError(err.message || 'Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditTitle('');
    setEditDescription('');
    setEditDueDate('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-4 sm:p-8 text-white">
      <div className="max-w-2xl mx-auto bg-white bg-opacity-10 rounded-xl shadow-2xl p-6 sm:p-8 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 animate-fade-in-down">
        <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide flex items-center justify-center gap-3">
          <ListChecks className="text-pink-400" size={36} />
          My Vibrant To-Do List
        </h2>

        {/* Add Todo Form */}
        <div className="mb-8 bg-white bg-opacity-15 p-6 rounded-lg shadow-xl border border-white border-opacity-20 transform transition-all duration-300 hover:scale-[1.01]">
          <h3 className="text-2xl font-semibold mb-5 text-indigo-100 flex items-center gap-2">
            <Plus className="text-yellow-300" size={24} />
            Add New Task
          </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setFormDirty(true);
            }}
            placeholder="What's your main task today?"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg mb-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional: Add more details..."
            rows={3}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg mb-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200 resize-y"
          ></textarea>
          <div className="relative mb-6">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                setFormDirty(true);
              }}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none pr-10 transition-colors duration-200"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <button
            onClick={handleAddTodo}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-bold text-lg tracking-wide shadow-lg transition-all duration-300 ease-in-out
              ${loading
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:-translate-y-1'
              }`}
          >
            {loading ? 'Adding Task...' : 'Add Task'}
          </button>

          {error && (
            <p className="text-red-300 mt-4 text-center font-medium flex items-center justify-center gap-2 animate-fade-in">
              <AlertCircle size={20} />
              {error}
            </p>
          )}
        </div>

        {/* Todos List */}
        <div className="bg-white bg-opacity-15 p-6 rounded-lg shadow-xl border border-white border-opacity-20">
          <h3 className="text-2xl font-semibold mb-5 text-indigo-100 flex items-center gap-2">
            <ListChecks className="text-pink-300" size={24} />
            Your Tasks
          </h3>
          {loading && todos.length === 0 ? (
            <p className="text-center text-lg text-white animate-pulse">Loading your tasks...</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-lg text-white opacity-80">No tasks yet! Add one above. 🎉</p>
          ) : (
            <ul className="space-y-4">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md flex justify-between items-center transform transition-transform duration-200 hover:scale-[1.02] border-l-4 border-yellow-300"
                >
                  {editingTodoId === todo.id ? (
                    // Edit mode for a specific todo
                    <div className="flex flex-col w-full space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                        placeholder="Edit title"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 resize-y"
                        placeholder="Edit description (optional)"
                      ></textarea>
                      <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      />
                      <div className="flex gap-2 justify-end mt-2">
                        <button
                          onClick={handleUpdateTodo}
                          disabled={loading}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200"
                        >
                          {loading ? 'Updating...' : 'Save'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode for a todo
                    <>
                      <div>
                        <p className="font-bold text-xl text-yellow-50 break-words">{todo.title}</p>
                        {todo.description && (
                          <p className="text-sm text-gray-200 mt-1 break-words">{todo.description}</p>
                        )}
                        <p className="text-sm text-gray-300 mt-1 flex items-center gap-1">
                          <Calendar className="text-blue-200" size={16} />
                          Due:{' '}
                          {new Date(todo.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(todo)}
                          className="text-blue-300 hover:text-blue-400 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                          title="Edit Task"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-red-300 hover:text-red-400 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}