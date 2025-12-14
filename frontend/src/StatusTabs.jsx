import React from 'react';

/**
 * Renders the filter tabs (Upcoming, Today, Past, All) for appointments.
 *
 * @param {object} props
 * @param {string} props.activeTab - The currently selected tab ('All', 'Upcoming', 'Today', 'Past').
 * @param {function} props.onTabChange - Callback function when a tab is clicked.
 */
const StatusTabs = ({ activeTab, onTabChange }) => {
    const tabs = ['Upcoming', 'Today', 'Past', 'All'];

    return (
        <div className="flex border-b border-gray-200 mb-4 text-sm font-medium text-gray-500">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`py-2 px-4 -mb-px border-b-2 transition-colors duration-150 ease-in-out 
                                ${activeTab === tab
                            ? 'border-blue-600 text-blue-600 font-semibold'
                            : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default StatusTabs;