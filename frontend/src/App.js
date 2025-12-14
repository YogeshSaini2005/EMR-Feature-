import React, { useState} from "react";
import AppointmentManagementView from "./EMR_Frontend_Assignment";
import Calendar from "./Calendar";

function App(){
  const [selectedDate, setSelectedDate]= useState(null);
  return(
  <div className = "min-h-screen bg-gray-100 flex">
    {/*left calendar*/}
    <aside className="w-1/4 bg-white border-r p-4">
      <Calendar onSelectDate= {setSelectedDate} />
    </aside>

    {/*right appointment management view*/}
    <main className="flex-1 p-6">
      <AppointmentManagementView selectedDate={selectedDate}/> 
    </main> 
  </div>


);

}
export default App;