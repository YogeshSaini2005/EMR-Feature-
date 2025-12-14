APPOINTMENTS_MOCK_DATA = [{
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

def get_appointments(filters=None):
  if filters is None:
    filters = {}
  
  results = APPOINTMENTS_MOCK_DATA
  
  if "date" in filters:
    results = [a for a in results if a["date"] == filters["date"]]
  if "status" in filters:
    results = [a for a in results if a["status"]== filters["status"]]    
  return results
def update_appointment_status(id, new_status):
  target_id= int (id) # convert id to int 
  for appt in APPOINTMENTS_MOCK_DATA:
    if appt['id'] == target_id:
      appt['status'] = new_status
      return appt 
    
  return None