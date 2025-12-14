import React from 'react';

/**
 * Renders the status legends for the calendar.
 */
const StatusLegend = () => {
    const legends = [
        { status: 'Confirmed', color: 'bg-green-500' },
        { status: 'Scheduled', color: 'bg-blue-500' },
        { status: 'Completed', color: 'bg-yellow-500' },
        { status: 'Cancelled', color: 'bg-red-500' },
    ];

    return (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Status</h3>
            <ul className="space-y-2">
                {legends.map((item) => (
                    <li key={item.status} className="flex items-center text-sm text-gray-600">
                        <span className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></span>
                        {item.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StatusLegend;