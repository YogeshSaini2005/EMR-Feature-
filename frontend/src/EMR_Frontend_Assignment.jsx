import React, { useState, useEffect, useMemo } from 'react';
// IMPORT THE CALENDAR LIBRARY
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles for the calendar

// Ensure the path to your service file is correct
import { getAppointments, updateAppointmentStatus } from "./appointment_service"; 

// Import Custom Components (Ensure these files are in the same directory)
import DashboardCards from "./DashboardCards";
import StatusTabs from "./StatusTabs";
import AppointmentCard from "./AppointmentCard";
import StatusLegend from "./StatusLegend"; 
import AppointmentForm from "./AppointmentForm"; 


// Utility function to get today's date in YYYY-MM-DD format for filtering
const getTodayDate = () => new Date().toISOString().split('T')[0];

// --- Define Options based on your mock data ---
const DOCTOR_OPTIONS = ['Dr. Rinku', 'Dr. Sahil', 'Dr. Payal', 'Dr. Yuvi', 'Dr. priya', 'Dr. sweta'];
const STATUS_OPTIONS = ['Confirmed', 'Scheduled', 'Upcoming', 'Cancelled', 'Completed'];


export default function AppointmentManagementView() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [activeTab, setActiveTab] = useState('All');     
  const [showForm, setShowForm] = useState(false);       
  
  // States for Dropdown Filters
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('All');


  // --- 1. DATA FETCHING ---
  useEffect(() => {
    const formatSelectedDate = (date) => {
        if (!date) return null;
        return date.toISOString().split('T')[0];
    };
    
    const filters = {
      date: formatSelectedDate(selectedDate), 
      status: selectedStatusFilter !== 'All' ? selectedStatusFilter : null, 
    };

    getAppointments(filters).then(data => {
      setAppointments(data);
    });
    
    setActiveTab('All');
    
  }, [selectedDate, selectedStatusFilter]); 

  // --- 2. STATUS UPDATE ---
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updated = await updateAppointmentStatus(id, newStatus);
      
      if (updated && updated.id !== undefined && updated.id !== null) {
          setAppointments(prev =>
            prev.map(a => (a.id === updated.id ? updated : a))
          );
      } else {
          console.error(`Status update failed for ID ${id}. API returned invalid data.`, updated);
      }

    } catch (error) {
      console.error("Critical error during status update:", error);
    }
  };

  // --- 3. TAB & DOCTOR FILTERING LOGIC ---
  const filteredAppointments = useMemo(() => {
    const today = getTodayDate();
    let list = appointments;

    // 1. Apply Tab Filtering
    if (activeTab === 'Today') {
      list = list.filter(appt => appt.date === today);
    } else if (activeTab === 'Upcoming') {
      list = list.filter(appt => appt.date > today); 
    } else if (activeTab === 'Past') {
      list = list.filter(appt => appt.date < today);
    }
    
    // 2. Apply Doctor Filter
    if (selectedDoctorFilter !== 'All') {
        list = list.filter(appt => appt.doctorName === selectedDoctorFilter);
    }

    return list; 
  }, [appointments, activeTab, selectedDoctorFilter]); 

  // --- Dashboard Card Counts Calculation ---
  const counts = useMemo(() => {
    const today = getTodayDate();
    return {
      todayCount: appointments.filter(app => app.date === today).length,
      confirmedCount: appointments.filter(app => app.status === 'Confirmed').length,
      upcomingCount: appointments.filter(app => app.date > today).length,
      virtualCount: appointments.filter(app => app.mode === 'Virtual').length, 
    };
  }, [appointments]);
  
  // --- 4. CALENDAR CHANGE HANDLER ---
  const handleDateChange = (date) => {
      setSelectedDate(date); 
  };
  
  // --- 5. HANDLERS FOR DROPDOWN CHANGES ---
  const handleStatusChange = (e) => {
      setSelectedStatusFilter(e.target.value);
  }
  
  const handleDoctorChange = (e) => {
      setSelectedDoctorFilter(e.target.value);
  }
  
  // --- 6. EXPORT FUNCTIONALITY (New Addition) ---
  const exportToCSV = () => {
    if (!filteredAppointments.length) {
      alert("No data to export.");
      return;
    }
    
    // 1. Get the headers (keys from the first object)
    const headers = Object.keys(filteredAppointments[0]);
    
    // 2. Format the data rows
    const csvRows = [];
    
    // Add header row
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of filteredAppointments) {
      const values = headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or newlines by wrapping in quotes
        const escaped = ('' + value).replace(/"/g, '\\"'); 
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    
    // 3. Create the CSV file content
    const csvString = csvRows.join('\n');
    
    // 4. Trigger download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `appointments_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    // Append link to body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto"> 

        {/* HEADER: Title and Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <div className="flex space-x-3">
            
            {/* EXPORT BUTTON with onClick handler */}
            <button 
              onClick={exportToCSV}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Export
            </button>
            
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              + New Appointment
            </button>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <DashboardCards {...counts} />
        

        {/* MAIN TWO-COLUMN CONTENT AREA */}
        <div className="flex mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">

          {/* LEFT COLUMN: Calendar & Status Legends (w-1/4) */}
          <div className="w-1/4 pr-6 border-r border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Calendar</h2>

            {/* CORRECTLY PLACED FUNCTIONAL REACT-CALENDAR (LEFT COLUMN) */}
            <div className='mb-4'>
                <Calendar 
                    onChange={handleDateChange} 
                    value={selectedDate} 
                    view="month" 
                    maxDetail="month"
                    className="border-0 rounded-lg shadow-md"
                />
            </div>
            
            {/* Clear Filter Button */}
            <button
                onClick={() => setSelectedDate(null)} 
                className="w-full text-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-sm font-medium border border-gray-200"
            >
                Clear Date Filter
            </button>


            {/* Status Legends */}
            <StatusLegend />
          </div>

          {/* RIGHT COLUMN: Filters, Tabs, and Appointment List (w-3/4) */}
          <div className="w-3/4 pl-6">
            
            {/* Status Tabs */}
            <StatusTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Search and Filter Bar (Connected Dropdowns) */}
            <div className="flex space-x-3 mb-6">
                <input 
                    type="text" 
                    placeholder="Search appointments..." 
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                
                {/* STATUS DROPDOWN INTEGRATION */}
                <select 
                    className="p-2 border border-gray-300 rounded-lg w-32 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedStatusFilter}
                    onChange={handleStatusChange}
                >
                    <option value="All">All Status</option>
                    {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                
                {/* DOCTOR DROPDOWN INTEGRATION */}
                <select 
                    className="p-2 border border-gray-300 rounded-lg w-32 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedDoctorFilter}
                    onChange={handleDoctorChange}
                >
                    <option value="All">All Doctors</option>
                    {DOCTOR_OPTIONS.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                </select>
            </div>
            
            {/* Appointment List (Renders the filtered list using AppointmentCard) */}
            <div className="space-y-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(appt => (
                  <AppointmentCard 
                    key={appt.id} 
                    appointment={appt} 
                    onUpdateStatus={handleUpdateStatus} // Mutation handler
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-10 p-4 border rounded-lg bg-gray-50">
                    No appointments found for the current selection.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Add Appointment Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <AppointmentForm
              onSave={(newAppt) => {
                setAppointments(prev => [...prev, { id: Date.now(), ...newAppt, status: 'Scheduled' }]);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}