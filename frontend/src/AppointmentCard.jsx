import React from 'react';
import { BsPerson, BsCalendar, BsClock, BsGeoAlt, BsPencilSquare, BsTrash } from 'react-icons/bs';

/**
 * Renders a single detailed appointment card based on the UI mockup.
 *
   @param {object} props
   @param {object} props.appointment 
   @param {function} props.onUpdateStatus - update the appointment status.
 */
const AppointmentCard = ({ appointment, onUpdateStatus }) => {
    // Helper function to determine badge color based on status
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'Scheduled':
                return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'Upcoming':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Cancelled':
                return 'bg-red-100 text-red-700 border-red-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };
    const { id, name, date, time, duration, doctorName, status, mode, reason, consultation } = appointment;
    const statusStyle = getStatusStyle(status);

    return (
        <div className="bg-white p-6 mb-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
                {/* Left Section: Details */}
                <div className="flex-grow">
                    {/* Patient Name and Doctor/Mode */}
                    <div className="flex items-center mb-2">
                        <BsPerson className="text-blue-500 mr-3 w-5 h-5" />
                        <div>
                            <p className="text-lg font-semibold text-gray-900">{name}</p>
                            <p className="text-sm text-gray-500 flex items-center mt-0.5">
                                <span className="font-medium mr-1">{doctorName}</span>
                                <BsGeoAlt className="ml-2 mr-1 w-3 h-3 text-gray-400" />
                                {mode}
                            </p>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="flex items-center text-sm text-gray-700 mb-3 ml-8">
                        <BsCalendar className="mr-1 w-3.5 h-3.5 text-gray-400" />
                        <span className="mr-4">{date}</span>
                        <BsClock className="mr-1 w-3.5 h-3.5 text-gray-400" />
                        <span className="mr-4">{time} - {duration}</span>
                    </div>

                    {/* Reason/Consultation */}
                    <div className="ml-8 mt-3 space-y-2 text-sm">
                        <p>
                            <span className="font-medium text-gray-800">Consultation:</span>
                            <span className="ml-1 text-gray-600">{consultation}</span>
                        </p>
                        <p>
                            <span className="font-medium text-gray-800">Reason:</span>
                            <span className="ml-1 text-gray-600">{reason}</span>
                        </p>
                    </div>

                </div>

                {/* Status and Actions */}
                <div className="flex flex-col items-end">
                    {/* Status Badge */}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle} mb-4 border`}>
                        {status}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 text-gray-500">
                        {/* Edit Button */}
                        <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Appointment">
                            <BsPencilSquare className="w-4 h-4" />
                        </button>
                        {/* Cancel Button*/}
                        <button
                            onClick={() => onUpdateStatus(id, 'Cancelled')}
                            className="p-1 rounded-full hover:bg-red-100 hover:text-red-600"
                            title="Cancel Appointment"
                        >
                            <BsTrash className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;