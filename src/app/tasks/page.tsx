'use client';
import { useState } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState<{ title: string; priority: string }[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-4 py-2 mr-2 mb-2 w-full"
        placeholder="Task title"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border px-4 py-2 mr-2 mb-4 w-full"
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={() => {
          if (title && priority) {
            setTasks([...tasks, { title, priority }]);
            setTitle('');
            setPriority('');
          }
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
      <ul className="mt-4 list-disc list-inside">
        {tasks.map((task, i) => (
          <li key={i}>
            {task.title} - <em>{task.priority}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
