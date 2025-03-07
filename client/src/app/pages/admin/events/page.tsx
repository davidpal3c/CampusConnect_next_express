"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "@/app/components/Buttons/ActionButton";
import EventEditor from "@/app/components/PageComponents/Admin/Events/EventEditor";
import EventListView from "@/app/components/PageComponents/Admin/Events/EventListView";
import EventCalendarView from "@/app/components/PageComponents/Admin/Events/EventCalendarView";
import Loader from "@/app/components/Loader/Loader";

const Events = () => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`, {
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

// 
const [searchTerm, setSearchTerm] = useState("");
const [filterCriteria, setFilterCriteria] = useState({
  date: "",
  location: "",
});

const searchByName = (searchValue) => {
  setSearchTerm(searchValue);
  if (searchValue === "") {
    setEvents(originalEvents); // Reset to original events if search is empty
  } else {
    const filteredEvents = originalEvents.filter((event) =>
      event.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setEvents(filteredEvents);
  }
};

const filterByDate = (date) => {
  setFilterCriteria({ ...filterCriteria, date });
  const filteredEvents = originalEvents.filter((event) =>
    new Date(event.date).toLocaleDateString() === new Date(date).toLocaleDateString()
  );
  setEvents(filteredEvents);
};

const filterByLocation = (location) => {
  setFilterCriteria({ ...filterCriteria, location });
  const filteredEvents = originalEvents.filter((event) =>
    event.location.toLowerCase().includes(location.toLowerCase())
  );
  setEvents(filteredEvents);
};

const handleDeleteEvent = async (event) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${event._id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message || "An error occurred deleting the event.");
      return;
    }

    toast.success("Event deleted successfully");
    fetchEvents(); // Refresh the events list
  } catch (error) {
    console.error(error);
    toast.error("Error deleting event: " + error);
  }
};
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
            value={searchTerm}
            onChange={(e) => searchByName(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <input
            type="date"
            value={filterCriteria.date}
            onChange={(e) => filterByDate(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Filter by location"
            value={filterCriteria.location}
            onChange={(e) => filterByLocation(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <div className="flex justify-between items-center p-4">
            
            <ActionButton
              title="Create Event" //Make button look the same as article
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
                      <EventEditor
                        closeOnClick={handleCloseCreatePanel}
                        action={action}
                        eventObject={selectedEvent}
                        onSave={fetchEvents}
                      />
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