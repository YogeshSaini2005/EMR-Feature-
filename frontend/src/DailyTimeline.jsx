import React from "react";

export default function DailyTimeline({ appointments }) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Daily Schedule</h2>

      <div className="flex flex-col space-y-2">
        {hours.map(h => (
          <div key={h} className="flex border-b h-12 items-center">
            <span className="w-20 text-sm text-gray-500">{h}:00</span>
            <div className="flex-1 relative">
              {appointments
                .filter(appt => parseInt(appt.time.split(":")[0]) === h)
                .map(appt => (
                  <div
                    key={appt.id}
                    className="absolute left-0 top-0 bg-blue-100 px-2 py-1 rounded shadow-sm text-sm"
                  >
                    {appt.name} ({appt.doctorName})
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
