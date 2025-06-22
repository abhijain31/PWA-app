"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Scheduler Dashboard</h1>
      <div className="grid gap-4 grid-cols-2">
        <Link
          href="/todos"
          className="bg-white p-4 text-black rounded shadow hover:bg-gray-200"
        >
          To-Dos
        </Link>
        <Link
          href="/events"
          className="bg-white p-4 text-black rounded shadow hover:bg-gray-200"
        >
          Events
        </Link>
        <Link
          href="/tasks"
          className="bg-white p-4 text-black rounded shadow hover:bg-gray-200"
        >
          Tasks
        </Link>
        <Link
          href="/reminders"
          className="bg-white text-black p-4 rounded shadow hover:bg-gray-200"
        >
          Reminders
        </Link>
        <Link
          href="/calendar"
          className="bg-white text-black p-4 rounded shadow hover:bg-gray-200"
        >
          Calendar
        </Link>
      </div>
    </main>
  );
}
