const APPOINTMENTS_MOCK_DATA = [{
  'id':1,
  'name':'yogesh',
  'date':'2025-12-31',
  'time':'10:00',
  'status':'Confirmed',
  'doctorName': 'Dr. Rinku',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':2,
  'name':'ravi',
  'date':'2025-12-31',
  'time':'10:00',
  'status':'Confirmed',
  'doctorName': 'Dr. Sahil',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':3,
  'name':'ruby',
  'date':'2025-12-31',
  'time':'12:00',
  'status':'Confirmed',
  'doctorName': 'Dr. Sahil',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':4,
  'name':'keshav',
  'date':'2025-12-31',
  'time':'12:00',
  'status':'Confirmed',
  'doctorName': 'Dr. Payal',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':5,
  'name':'jinal',
  'date':'2025-12-31',
  'time':'12:00',
  'status':'Confirmed',
  'doctorName': 'Dr. Payal',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':6,
  'name':'karan',
  'date':'2025-12-31',
  'time':'09:00',
  'status':'Confirmed',
  'doctorName': 'Dr. Yuvi',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':7,
  'name':'pawan',
  'date':'2025-12-31',
  'time':'09:00',
  'status':'Confirmed',
  'doctorName': 'Dr. yuvi',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':8,
  'name':'sneha',
  'date':'2025-12-31',
  'time':'10:00',
  'status':'Confirmed',
  'doctorName': 'Dr. Rinku',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':9,
  'name':'aryan',
  'date':'2025-12-30',
  'time':'11:00',
  'status':'Confirmed',
  'doctorName': 'Dr. priya',
  'duration' :30,
  'mode': 'online',
  },
  {
  'id':10,
  'name':'aarav',
  'date':'2025-12-30',
  'time':'11:20',
  'status':'Confirmed',
  'doctorName': 'Dr. sweta',
  'duration' :30,
  'mode': 'online',
  },
]

export function getAppointments(filters = {}) {
  return new Promise(resolve => {
    setTimeout(() =>{
      let filtered = APPOINTMENTS_MOCK_DATA.filter(appt => {
        if(filters.date && appt.date !== filters.date) return false;
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
      const appt = APPOINTMENTS_MOCK_DATA.find(a => a.id === Number(id));
      if (appt) {
        appt.status =  newStatus;
      }
      resolve(appt);
    }, 100);  //timeout
  });
}