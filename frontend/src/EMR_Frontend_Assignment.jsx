import React,{ useState, useEffect} from 'react';
import { getAppointments, updateAppointmentStatus} from "./appointment_service";
import AppointmentForm from "./AppointmentForm";
import DailyTimeline from "./DailyTimeline";

export default function AppointmentManagementView({selectedDate}) {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  //fetch appo apply dates if selsctedDate is provided
  useEffect(() => {
    getAppointments(selectedDate ? {date:selectedDate} :{}).then(data =>
      setAppointments(data)
    );
  },[selectedDate]);

  //cancel appointment
  const cancelAppointment = async (id) => {
    updateAppointmentStatus(id, "Cancelled").then(updated =>{
      setAppointments(prev => 
        prev.map( a => (a.id === updated.id ? updated:a))
      );
    });
};
return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Appointment
          </button>
        </div>

        {selectedDate && (
          <p className="text-sm text-gray-500 mb-4">
            Showing appointments for: <b>{selectedDate}</b>
          </p>
        )}

        {/* Appointment List */}
        <div className="space-y-4 mb-8">
          {appointments.map(appt => (
            <div
              key={appt.id}
              className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {appt.name} — {appt.time}
                </h2>
                <p className="text-sm text-gray-500">{appt.doctorName}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium
                    ${appt.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "Scheduled"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {appt.status}
                </span>
              </div>
              {appt.status === "Confirmed" && (
                <button
                  onClick={() => cancelAppointment(appt.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Daily Timeline */}
        <DailyTimeline
          appointments={appointments.filter(
            appt => selectedDate ? appt.date === selectedDate : true
          )}
        />

        {/* Add Appointment Modal */}
        {showForm && (
          <AppointmentForm
            onSave={(newAppt) => {
              setAppointments(prev => [...prev, { id: Date.now(), ...newAppt }]);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}
