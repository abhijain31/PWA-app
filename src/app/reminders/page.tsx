'use client';
import { useState } from 'react';

export default function RemindersPage() {
  const [reminders, setReminders] = useState<{ message: string; time: string }[]>([]);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');

  const addReminder = () => {
    if (message && time) {
      setReminders([...reminders, { message, time }]);
      setMessage('');
      setTime('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border px-4 py-2 mr-2 mb-2 w-full"
        placeholder="Reminder message"
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border px-4 py-2 mr-2 mb-4 w-full"
      />
      <button onClick={addReminder} className="bg-red-600 text-white px-4 py-2 rounded">
        Add Reminder
      </button>
      <ul className="mt-4 list-disc list-inside">
        {reminders.map((r, i) => (
          <li key={i}>
            {r.message} - <time>{r.time}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}
