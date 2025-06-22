'use client';
import { useState } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState<{ title: string; location: string }[]>([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const addEvent = () => {
    if (title && location) {
      setEvents([...events, { title, location }]);
      setTitle('');
      setLocation('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Events</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-4 py-2 mr-2 mb-2 w-full"
        placeholder="Event title"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border px-4 py-2 mr-2 mb-4 w-full"
        placeholder="Location"
      />
      <button onClick={addEvent} className="bg-green-600 text-white px-4 py-2 rounded">
        Add Event
      </button>
      <ul className="mt-4 list-disc list-inside">
        {events.map((e, i) => (
          <li key={i}>
            <strong>{e.title}</strong> @ {e.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
