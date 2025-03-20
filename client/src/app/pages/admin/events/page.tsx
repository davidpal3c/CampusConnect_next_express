"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "@/app/components/Buttons/ActionButton";
import EventEditor from "@/app/components/PageComponents/Admin/Events/EventEditor";
import EventListView from "@/app/components/PageComponents/Admin/Events/EventListView";
import EventForm from "@/app/components/PageComponents/Admin/Events/EventForm"
import EventCalendarView from "@/app/components/PageComponents/Admin/Events/EventCalendarView";
import Loader from "@/app/components/Loader/Loader";
import { MultistepForm } from "@/app/components/PageComponents/Admin/Events/MultistepForm";


type EventData = {
  name: string,
  date: string,
  location: string,
  departments: string,
  programs: string,
  description: string,
  host: string,
  capacity: number
}

const INITIAL_DATA = {
  name: '',
  date: '',
  location: '',
  departments: 'Default departments are all.',
  programs: 'Default programs are all.',
  time: '',
  description: '',
  host: 'SAIT',
  capacity: ''
}

const Events = () => {
  const [data, setData] =useState(INITIAL_DATA)
  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEventEditor, setShowEventEditor] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [action, setAction] = useState("Create");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "An error occurred fetching events.");
        return;
      }

      setEvents(data);
      setOriginalEvents(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching events: " + error);
    }
  };


//Multi Step Form handling and shetttt
const {steps, step, currentStepIndex, back, next, isFirstStep, isLastStep} = MultistepForm([
  <EventEditor {...data} updateFields={updateFields}/>, 
  <EventForm /> //Will have to change it for the form instead of using the Event data
])


  const handleOpenCreatePanel = () => setShowEventEditor(true);
  const handleCloseCreatePanel = () => setShowEventEditor(false);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setAction("Edit");
    handleOpenCreatePanel();
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setAction("Create");
    handleOpenCreatePanel();
  };

  const handleDeleteEvent = () => {
    console.log("event deleted");
  }

  function handleEventSubmission(){
    console.log("This event was submitted");
    next()
    
  }

  const handlePublish = async () => {
    console.log("Publish button clicked"); // Debugging
    try {
      const eventData = {
        ...data,
        capacity: parseInt(data.capacity, 10), // Convert capacity to an integer
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data), // Send the form data
      });
  
      const result = await response.json();
      console.log("API Response:", result); // Debugging
  
      if (!response.ok) {
        toast.error(result.message || "An error occurred creating the event.");
        return;
      }
  
      toast.success("Event created successfully!");
      fetchEvents(); // Refresh the events list
      handleCloseCreatePanel(); // Close the editor panel
    } catch (error) {
      console.error(error);
      toast.error("Error creating event: " + error);
    }
    handleCloseCreatePanel();
  };

  function updateFields(fields: Partial<EventData>) {
    setData(prev => {
      return {...prev, ...fields}
    })
  }


  return (
    <main>
      <div>
        {/** Make the header look more like the Articles page */}
      <header>
        <h1 className="text-2xl font-semibold">Events</h1>
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
          <input
            type="text"
            placeholder="Search by name"
            // value={searchTerm}
            // onChange={(e) => searchByName(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <input
            type="date"
            // value={filterCriteria.date}
            // onChange={(e) => filterByDate(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Filter by location"
            // value={filterCriteria.location}
            // onChange={(e) => filterByLocation(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <div className="flex justify-between items-center p-4">

          {/* Make button look the same as article */}
            <ActionButton
              title="Create Event" 
              onClick={handleCreateEvent}
              textColor="text-saitBlue"
              borderColor="border-saitBlue"
              hoverBgColor="bg-saitBlue"
              hoverTextColor="text-saitWhite"
            />
          </div>
        </div>
      </header>
          <div className="bg-saitWhite h-screen">
            {isLoading ? (
              <Loader isLoading={true} />
            ) : (
              <div>

                {/* Event List View */}
                <EventListView events={events} onEventSelect={handleEventSelect} onEventDelete={handleDeleteEvent}/>

                {/* Event Editor Panel */}
                <AnimatePresence>
                  {showEventEditor && (
                    <motion.div
                      initial={{ x: "100vh" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100vh" }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="absolute top-0 right-0 h-full w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50"
                    >
                      <form onSubmit={(e) => {
                          e.preventDefault();
                          if (isLastStep) {
                            handlePublish();
                          } else {
                            handleEventSubmission();
                          }
                        }}>
                        <div>
                          {/* Can make this look better than just numbers */}
                          <p dir="rtl">Steps: {currentStepIndex + 1} / {steps.length}</p>

                          {/* Button to close editor style could use some work*/}
                          <ActionButton
                          title="Close Event"
                          type="button"
                          onClick={handleCloseCreatePanel}
                          textColor="text-saitBlue"
                          borderColor="border-saitBlue"
                          hoverBgColor="bg-saitBlue"
                          hoverTextColor="text-saitWhite"
                          />
                        </div>
                        <div>
                          {step}
                          {!isFirstStep && 
                            <ActionButton 
                              onClick={back}
                              title="Back"
                              type="button"
                              textColor="text-saitBlue"
                              borderColor="border-saitBlue"
                              hoverBgColor="bg-saitBlue"
                              hoverTextColor="text-saitWhite" 
                            ></ActionButton>}
                          { isLastStep ?
                            <ActionButton  
                              title="Publish"
                              textColor="text-saitBlue"
                              borderColor="border-saitBlue"
                              hoverBgColor="bg-saitBlue"
                              hoverTextColor="text-saitWhite"  
                            ></ActionButton>
                            
                          :
                            <ActionButton  
                              title="Next"
                              //Could work on the handling to get rid of this error but it seems to be working okay for now
                              textColor="text-saitBlue"
                              borderColor="border-saitBlue"
                              hoverBgColor="bg-saitBlue"
                              hoverTextColor="text-saitWhite"  
                            ></ActionButton>
                          }
                        </div>
                      
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
    </main>
  );
};

export default Events;

const events = [
  {
    title: "Meeting",
    start: new Date(2025, 0, 25, 10, 0),
    end: new Date(2025, 0, 25, 11, 0),
  },
  {
    title: "Lunch Break",
    start: new Date(2025, 0, 25, 12, 0),
    end: new Date(2025, 0, 25, 13, 0),
  },
];


    {/** Form and Calendar
          <div className={`bg-white p-4 shadow-md rounded-md "col-span-2" : ""`}>
            <EventForm/>
          </div>
         
          

       <div className={`bg-white p-4 shadow-md rounded-md "col-span-2" : ""`}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleEventSelect}
        />
      </div> 
      
      */}