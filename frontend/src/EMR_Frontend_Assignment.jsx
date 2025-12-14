import React, { useState, useEffect, useMemo } from 'react';
import { getAppointments, updateAppointmentStatus } from "./appointment_service";

// Import Custom Components (Ensure these files are in the same directory: src/)
import DashboardCards from "./DashboardCards";
import StatusTabs from "./StatusTabs";
import AppointmentCard from "./AppointmentCard";
import StatusLegend from "./StatusLegend"; 
import AppointmentForm from "./AppointmentForm"; 

// Utility function to get today's date in YYYY-MM-DD format for filtering
const getTodayDate = () => new Date().toISOString().split('T')[0];

// --- Define Status and Doctor Options based on your mock data ---
const DOCTOR_OPTIONS = ['Dr. Rinku', 'Dr. Sahil', 'Dr. Payal', 'Dr. Yuvi', 'Dr. priya', 'Dr. sweta'];
const STATUS_OPTIONS = ['Confirmed', 'Scheduled', 'Upcoming', 'Cancelled', 'Completed'];

export default function AppointmentManagementView() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [activeTab, setActiveTab] = useState('All');     
  const [showForm, setShowForm] = useState(false);       
  
  // 💥 NEW STATES FOR DROPDOWN FILTERS
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('All');


  // --- 1. DATA FETCHING (Task 2.1 & 2.2) ---
  // Fetches data when selectedDate or primary dropdown filters change
  useEffect(() => {
    // 💥 Updated filters object to send to getAppointments
    const filters = {
      date: selectedDate, // Calendar date filter
      // Note: We only send the status filter if the tab is 'All'
      // Otherwise, we filter manually in useMemo (see below)
      status: selectedStatusFilter !== 'All' ? selectedStatusFilter : null, 
    };

    getAppointments(filters).then(data => {
      setAppointments(data);
    });
    
    // Reset tab filter when date changes, to prevent conflict
    setActiveTab('All');
    
    // Rerun when date or status filter changes
  }, [selectedDate, selectedStatusFilter]); 

  // --- 2. STATUS UPDATE (Task 2.4) ---
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updated = await updateAppointmentStatus(id, newStatus);
      
      if (updated && updated.id !== undefined && updated.id !== null) {
          setAppointments(prev =>
            prev.map(a => (a.id === updated.id ? updated : a))
          );
      } else {
          console.error(`Status update failed for ID ${id}. API returned an invalid object or undefined.`, updated);
      }

    } catch (error) {
      console.error("Critical error during status update:", error);
    }
  };

  // --- 3. TAB & DOCTOR FILTERING LOGIC (Task 2.3) ---
  // Calculates the list of appointments to display based on the selected tab and doctor filter
  const filteredAppointments = useMemo(() => {
    const today = getTodayDate();
    let list = appointments;

    // 1. Apply Tab Filtering (Upcoming/Today/Past)
    if (activeTab === 'Today') {
      list = list.filter(appt => appt.date === today);
    } else if (activeTab === 'Upcoming') {
      list = list.filter(appt => appt.date > today); 
    } else if (activeTab === 'Past') {
      list = list.filter(appt => appt.date < today);
    }
    
    // 2. 💥 Apply Doctor Filter (local client-side filter)
    if (selectedDoctorFilter !== 'All') {
        list = list.filter(appt => appt.doctorName === selectedDoctorFilter);
    }

    // 3. Since the status filter is handled in useEffect/getAppointments, 
    // we only need to filter by doctor and tab here.
    return list; 
  }, [appointments, activeTab, selectedDoctorFilter]); // Dependency on selectedDoctorFilter

  // --- Dashboard Card Counts Calculation ---
  // (No change needed here)
  const counts = useMemo(() => {
    const today = getTodayDate();
    return {
      todayCount: appointments.filter(app => app.date === today).length,
      confirmedCount: appointments.filter(app => app.status === 'Confirmed').length,
      upcomingCount: appointments.filter(app => app.date > today).length,
      virtualCount: appointments.filter(app => app.mode === 'Virtual').length, 
    };
  }, [appointments]);

  // --- 4. CALENDAR CLICK HANDLER (Task 2.2) ---
  const handleDateClick = (date) => {
      setSelectedDate(date); 
  };
  
  // --- 5. 💥 HANDLERS FOR DROPDOWN CHANGES ---
  const handleStatusChange = (e) => {
      // This triggers useEffect to re-call getAppointments with the new status
      setSelectedStatusFilter(e.target.value);
  }
  
  const handleDoctorChange = (e) => {
      // This triggers useMemo to re-filter the local list
      setSelectedDoctorFilter(e.target.value);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto"> 

        {/* HEADER: Title and Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
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

            {/* Placeholder for Calendar Component */}
            <div className="h-64 bg-gray-50 p-4 flex items-center justify-center rounded-lg border">
                <p className="text-sm text-gray-500 text-center">
                    **Calendar Component**<br />
                    Clicking a date calls `handleDateClick`
                </p>
            </div>
            {selectedDate && (
                 <p className="text-sm text-gray-500 mt-2 text-center">
                    Active Filter: <b>{selectedDate}</b>
                </p>
            )}

            {/* Status Legends */}
            <StatusLegend />
          </div>

          {/* RIGHT COLUMN: Filters, Tabs, and Appointment List (w-3/4) */}
          <div className="w-3/4 pl-6">
            
            {/* Status Tabs (Task 2.3 Integration) */}
            <StatusTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Search and Filter Bar (Connected Dropdowns) */}
            <div className="flex space-x-3 mb-6">
                <input 
                    type="text" 
                    placeholder="Search appointments..." 
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                
                {/* 💥 STATUS DROPDOWN INTEGRATION */}
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
                
                {/* 💥 DOCTOR DROPDOWN INTEGRATION */}
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