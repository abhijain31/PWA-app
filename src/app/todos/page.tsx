'use client';
import { useState } from 'react';

export default function TodosPage() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">To-Do List</h2>
      <div className="mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 w-full"
          placeholder="Add new task"
        />
        <button
          onClick={() => {
            if (input) {
              setTodos([...todos, input]);
              setInput('');
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-disc list-inside">
        {todos.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}