"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "@/app/components/Buttons/ActionButton";
import EventEditor from "@/app/components/PageComponents/Admin/Events/EventEditor";
import EventListView from "@/app/components/PageComponents/Admin/Events/EventListView";
import EventCardView from "@/app/components/PageComponents/Admin/Events/EventCardView";
import EventForm from "@/app/components/PageComponents/Admin/Events/EventForm"
// import EventCalendarView from "@/app/components/PageComponents/Admin/Events/EventCalendarView";
import Loader from "@/app/components/Loader/Loader";
import { MultistepForm } from "@/app/components/PageComponents/Admin/Events/MultistepForm";

// For the icons and Views
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { DeleteIcon } from "lucide-react";
import { Tooltip } from '@mui/material';
import { ViewModuleRounded, ViewListRounded } from '@mui/icons-material';


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
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');

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
  <EventEditor audience={""} contact={""} {...data} updateFields={updateFields}/>, 
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
            {/* {isLoading ? (
              <Loader isLoading={true} />
              ) : (
              } */}
              <div>
                  <div className="flex justify-end mb-4">
                    <button 
                      onClick={() => setViewMode('list')} 
                      className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                      <ViewListRounded />
                    </button>
                    <button 
                      onClick={() => setViewMode('card')} 
                      className={`p-2 ${viewMode === 'card' ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                      <ViewModuleRounded />
                    </button>
                  </div>

                  {/* Conditional Rendering of Views */}
                  {viewMode === 'list' ? (
                    <EventListView 
                      events={events} 
                      onEventSelect={handleEventSelect} 
                      onEventDelete={handleDeleteEvent}
                    />
                  ) : (
                    <EventCardView 
                      events={events} 
                      onEventSelect={handleEventSelect} 
                      onEventDelete={handleDeleteEvent}
                      isAdminView={true}
                    />
                  )}

                {/* Event Editor Panel */}
                <AnimatePresence>
                  {showEventEditor && (
                    <motion.div
                      initial={{ x: "100vh" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100vh" }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="fixed top-0 right-0 h-full w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50 overflow-y-auto"
                    >
                      <div className="flex flex-col min-h-full">
                        {/* Header with close button and step indicator */}
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold">
                            {action} Event
                          </h2>
                          
                          {/* Step progress indicator */}
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              Step {currentStepIndex + 1} of {steps.length}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleCloseCreatePanel}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Form content */}
                        <div className="flex-grow">
                          <form>
                            {step}
                          </form>
                        </div>

                        {/* Navigation buttons - fixed at bottom */}
                        <div className="sticky bottom-4 mx-auto w-64 max-w-lg bg-white py-3 px-6 rounded-lg shadow-md border border-gray-200 flex justify-center gap-4">
                          {!isFirstStep && (
                            <button type="button" onClick={back} className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                              Back
                            </button>
                          )}

                          {isLastStep ?  
                          
                          <button onClick={handlePublish} 
                          className="w-32 px-4 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"> 
                          Publish Event
                          </button> 
                          
                          :  
                          <button onClick={handleEventSubmission} 
                          className="w-32 px-4 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"> 
                          Next
                          </button>}
                         
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            
          </div>
        </div>
    </main>
  );
};

export default Events;


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