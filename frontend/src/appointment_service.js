// --- Utility to get dynamic dates in YYYY-MM-DD format ---
const getTodayDate = () => new Date().toISOString().split('T')[0];
const TODAY = getTodayDate();
const YESTERDAY = new Date(Date.now() - 86400000).toISOString().split('T')[0]; // 86400000ms = 1 day
const TOMORROW = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const NEXT_WEEK = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

// --- CORRECTED MOCK DATA ---
// FIX 1: Dates are now dynamic (TODAY, YESTERDAY, etc.)
// FIX 2: Added missing 'reason' and 'consultation' fields
// FIX 3: Corrected 'duration' to string and 'mode' to 'Virtual'/'In-Person'
const APPOINTMENTS_MOCK_DATA = [{
  'id':1,
  'name':'yogesh',
  'date': TODAY, // FIX: Set to today for 'Today' tab
  'time':'10:00 AM',
  'status':'Confirmed',
  'doctorName': 'Dr. Rinku',
  'duration' :'30 min', // FIX: Changed to string
  'mode': 'In-Person', // FIX: Changed to match mode logic
  'reason': 'Routine Annual Check', // FIX: Added missing field
  'consultation': 'Annual Physical Exam', // FIX: Added missing field
  },
  {
  'id':2,
  'name':'ravi',
  'date': TOMORROW, // FIX: Set to tomorrow for 'Upcoming' tab
  'time':'10:00 AM',
  'status':'Upcoming', // FIX: Status changed for filtering
  'doctorName': 'Dr. Sahil',
  'duration' :'30 min',
  'mode': 'Virtual', // FIX: Changed to 'Virtual' for dashboard count
  'reason': 'Follow-up for rash',
  'consultation': 'Dermatology Review',
  },
  {
  'id':3,
  'name':'ruby',
  'date': YESTERDAY, // FIX: Set to yesterday for 'Past' tab
  'time':'12:00 PM',
  'status':'Completed', // FIX: Status changed for filtering
  'doctorName': 'Dr. Sahil',
  'duration' :'30 min',
  'mode': 'In-Person',
  'reason': 'Post-operation check',
  'consultation': 'Surgical Follow-up',
  },
  {
  'id':4,
  'name':'keshav',
  'date': NEXT_WEEK, // Set far in future
  'time':'12:00 PM',
  'status':'Upcoming',
  'doctorName': 'Dr. Payal',
  'duration' :'60 min',
  'mode': 'Virtual',
  'reason': 'Initial mental health intake',
  'consultation': 'Therapy Session',
  },
  {
  'id':5,
  'name':'jinal',
  'date': TODAY, // Set to today
  'time':'12:00 PM',
  'status':'Scheduled',
  'doctorName': 'Dr. Payal',
  'duration' :'30 min',
  'mode': 'In-Person',
  'reason': 'General illness check',
  'consultation': 'GP Consultation',
  },
  {
  'id':6,
  'name':'karan',
  'date': TODAY, // Set to today
  'time':'09:00 AM',
  'status':'Confirmed',
  'doctorName': 'Dr. Yuvi',
  'duration' :'20 min',
  'mode': 'Virtual',
  'reason': 'Quick lab review',
  'consultation': 'Telemedicine Check',
  },
  {
  'id':7,
  'name':'pawan',
  'date': YESTERDAY, // Set to yesterday
  'time':'09:00 AM',
  'status':'Cancelled',
  'doctorName': 'Dr. yuvi',
  'duration' :'45 min',
  'mode': 'In-Person',
  'reason': 'Patient no-show',
  'consultation': 'Cancelled Appointment',
  },
  {
  'id':8,
  'name':'sneha',
  'date': TOMORROW, // Set to tomorrow
  'time':'10:00 AM',
  'status':'Confirmed',
  'doctorName': 'Dr. Rinku',
  'duration' :'30 min',
  'mode': 'In-Person',
  'reason': 'Vaccination appointment',
  'consultation': 'Immunization',
  },
  {
  'id':9,
  'name':'aryan',
  'date': YESTERDAY, // Set to yesterday
  'time':'11:00 AM',
  'status':'Completed',
  'doctorName': 'Dr. priya',
  'duration' :'30 min',
  'mode': 'Virtual',
  'reason': 'Ongoing symptoms review',
  'consultation': 'Virtual Follow-up',
  },
  {
  'id':10,
  'name':'aarav',
  'date': NEXT_WEEK, // Set far in future
  'time':'11:20 AM',
  'status':'Upcoming',
  'doctorName': 'Dr. sweta',
  'duration' :'15 min',
  'mode': 'In-Person',
  'reason': 'Blood pressure check',
  'consultation': 'Quick Consult',
  },
]

export function getAppointments(filters = {}) {
  return new Promise(resolve => {
    setTimeout(() =>{
      let filtered = APPOINTMENTS_MOCK_DATA.filter(appt => {
        // Filter by date (used by Calendar)
        if(filters.date && appt.date !== filters.date) return false;
        // Filter by status (optional, used by search/select bar)
        if (filters.status && appt.status !== filters.status) return false;
        return true;
      });
      resolve(filtered);
    },100);
  });
}

// NOTE: This mutation relies on the appointment object being modified
// in place within the global APPOINTMENTS_MOCK_DATA array.
export function updateAppointmentStatus(id, newStatus){
  return new Promise(resolve => {
    setTimeout(() => {
      // Find the appointment using the provided ID
      const appt = APPOINTMENTS_MOCK_DATA.find(a => a.id === Number(id));
      if (appt) {
        // Update status in the mock data array
        appt.status = newStatus;
      }
      // Return the updated object (or undefined/null if not found)
      resolve(appt); 
    }, 100);
  });
}