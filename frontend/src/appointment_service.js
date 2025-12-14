const getTodayDate = () => new Date().toISOString().split('T')[0];
const TODAY = getTodayDate();
const YESTERDAY = new Date(Date.now() - 86400000).toISOString().split('T')[0]; 
const TOMORROW = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const NEXT_WEEK = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
const APPOINTMENTS_MOCK_DATA = [{
  'id':1,
  'name':'yogesh',
  'date': TODAY, 
  'time':'10:00 AM',
  'status':'Confirmed',
  'doctorName': 'Dr. Rinku',
  'duration' :'30 min', 
  'mode': 'In-Person', 
  'reason': 'Routine Annual Check', 
  'consultation': 'Annual Physical Exam', 
  },
  {
  'id':2,
  'name':'ravi',
  'date': TOMORROW, 
  'time':'10:00 AM',
  'status':'Upcoming', 
  'doctorName': 'Dr. Sahil',
  'duration' :'30 min',
  'mode': 'Virtual', 
  'reason': 'Follow-up for rash',
  'consultation': 'Dermatology Review',
  },
  {
  'id':3,
  'name':'ruby',
  'date': YESTERDAY, 
  'time':'12:00 PM',
  'status':'Completed', 
  'doctorName': 'Dr. Sahil',
  'duration' :'30 min',
  'mode': 'In-Person',
  'reason': 'Post-operation check',
  'consultation': 'Surgical Follow-up',
  },
  {
  'id':4,
  'name':'keshav',
  'date': NEXT_WEEK, 
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
  'date': TODAY, 
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
  'date': TODAY, 
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
  'date': YESTERDAY, 
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
  'date': TOMORROW,
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
  'date': YESTERDAY, 
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
  'date': NEXT_WEEK, 
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