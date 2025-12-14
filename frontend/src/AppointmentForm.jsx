import React, {useState} from "react";
export default function AppointmentForm({onSave, onCancel, defaultData ={}}) {
  const [name, setName] = useState(defaultData.name ||"" ); 
  const [doctorName, setDoctorName]= useState(defaultData.doctorName || "");
  const [date, setDate]= useState (defaultData.date ||"");
  const [time, setTime]= useState (defaultData.time ||"");
  const [status, setStatus]= useState (defaultData.status ||"Scheduled");


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({name , doctorName, date, time , status});
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg p-6 w-96 shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">Add Appointment</h2>

        <div>
          <label className="block text-sm font-medium">Patient Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Doctor Name</label>
          <input
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full border rounded px-2 py-1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
