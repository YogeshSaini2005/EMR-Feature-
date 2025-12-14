import React from 'react';
import { BsCalendar, BsClockHistory, BsCheckCircleFill, BsLaptop } from 'react-icons/bs';

/**
 * Renders the summary cards displayed at the top of the Appointment Management view.
 *
 * @param {object} props
 * @param {number} props.todayCount - Number of appointments scheduled for today.
 * @param {number} props.confirmedCount - Number of confirmed appointments.
 * @param {number} props.upcomingCount - Number of upcoming appointments (excluding today).
 * @param {number} props.virtualCount - Number of appointments with 'Virtual' mode (Telemedicine).
 */
const DashboardCards = ({ todayCount = 0, confirmedCount = 0, upcomingCount = 0, virtualCount = 0 }) => {

    // Array defining the properties for each card to easily render them.
    const cardData = [
        {
            title: "Today's Appointments",
            count: todayCount,
            icon: BsCalendar,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-100',
        },
        {
            title: "Confirmed Appointments",
            count: confirmedCount,
            icon: BsCheckCircleFill,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-100',
        },
        {
            title: "Upcoming Appointments",
            count: upcomingCount,
            icon: BsClockHistory,
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-100',
        },
        {
            title: "Telemedicine Sessions",
            count: virtualCount,
            icon: BsLaptop,
            iconColor: 'text-pink-500',
            bgColor: 'bg-pink-100',
        },
    ];

    const Card = ({ title, count, icon: Icon, iconColor, bgColor }) => (
        <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-w-[200px]">
            {/* Icon Container */}
            <div className={`p-3 rounded-full ${bgColor} mr-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>

            {/* Content */}
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
            </div>
        </div>
    );

    return (
        <div className="flex justify-between items-center space-x-4 p-4">
            {/* Render each card */}
            {cardData.map((card, index) => (
            
                <Card
                    key={index}
                    title={card.title}
                    count={card.count}
                    icon={card.icon}
                    iconColor={card.iconColor}
                    bgColor={card.bgColor}
                />
            ))}
        </div>
    );
};

export default DashboardCards;