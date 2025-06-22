'use client';
import { useState } from 'react';

export default function CalendarPage() {
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<{ date: string; note: string }[]>([]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-4 py-2 mr-2 mb-2 w-full"
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note for the selected date"
        className="border px-4 py-2 mr-2 mb-4 w-full"
      />
      <button
        onClick={() => {
          if (date && note) {
            setEntries([...entries, { date, note }]);
            setDate('');
            setNote('');
          }
        }}
        className="bg-cyan-600 text-white px-4 py-2 rounded"
      >
        Add Entry
      </button>
      <ul className="mt-4 list-disc list-inside">
        {entries.map((e, i) => (
          <li key={i}>
            <strong>{e.date}</strong>: {e.note}
          </li>
        ))}
      </ul>
    </div>
  );
}
