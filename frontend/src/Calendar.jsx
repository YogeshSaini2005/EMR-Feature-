import React from "react";

const dates = [
  "2025-12-30",
  "2025-12-31",
  "2026-01-01"
];

export default function Calendar({ onSelectDate }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Calendar</h2>

      {dates.map(date => (
        <button
          key={date}
          onClick={() => onSelectDate(date)}
          className="block w-full text-left mb-2 p-2 rounded border hover:bg-blue-100"
        >
          {date}
        </button>
      ))}

      <button
        onClick={() => onSelectDate(null)}
        className="mt-4 text-sm text-blue-600 underline"
      >
        Clear Filter
      </button>
    </div>
  );
}
