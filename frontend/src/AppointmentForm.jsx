import React, { useState } from 'react';

// Define the full list of required status options
const STATUS_OPTIONS = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled'];

// Define the initial state with ALL required fields
const initialFormState = {
  name: '',             // Patient Name
  doctorName: '',       // Doctor Name
  date: '',             // Date (YYYY-MM-DD format)
  time: '',             // Time (HH:MM format)
  status: 'Scheduled',  // Default Status
  reason: '',           // Reason for Visit (MISSING FIELD)
  consultation: '',     // Consultation Type (MISSING FIELD)
  duration: '30 min',   // Default duration (required by AppointmentCard)
  mode: 'In-Person',    // Default mode (required by AppointmentCard)
};

export default function AppointmentForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 💥 Important: onSave receives the full data structure
    onSave(formData);
  };

  return (
    // Modal container style (use fixed sizing for consistency)
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Appointment</h2>
      
      <form onSubmit={handleSubmit}>
        
        {/* Patient Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Doctor Name */}
        <div className="mb-4">
          <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
          <input type="text" id="doctorName" name="doctorName" value={formData.doctorName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Date and Time (Side-by-Side) */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date (YYYY-MM-DD)</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        
        {/* Status Dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* 💥 NEW FIELD: Reason for Visit */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
          <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Severe headache, routine check-up" />
        </div>

        {/* 💥 NEW FIELD: Consultation Type */}
        <div className="mb-6">
          <label htmlFor="consultation" className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
          <input type="text" id="consultation" name="consultation" value={formData.consultation} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Neurology Consultation, Annual Physical" />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}