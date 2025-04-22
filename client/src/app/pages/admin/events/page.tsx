"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ActionButton from "@/app/components/Buttons/ActionButton";
import EventEditor from "@/app/components/PageComponents/Admin/Events/EventEditor";
import EventListView from "@/app/components/PageComponents/Admin/Events/EventListView";
import EventCardView from "@/app/components/PageComponents/Admin/Events/EventCardView";
import EventForm from "@/app/components/PageComponents/Admin/Events/EventForm";
import { MultistepForm } from "@/app/components/PageComponents/Admin/Events/MultistepForm";
import { ViewModuleRounded, ViewListRounded } from '@mui/icons-material';

import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

type EventData = {
  id?: string;
  name: string;
  date: string;
  location: string;
  audience: string;
  programs: string;
  description: string;
  host: string;
  capacity: number;
}

type Event = EventData & {
  id: string;
}

const INITIAL_DATA: EventData = {
  name: '',
  date: '',
  location: '',
  audience: 'Default departments are all.',
  programs: 'Default programs are all.',
  description: '',
  host: 'SAIT',
  capacity: 0
}

const Events = () => {
  const [data, setData] = useState<EventData>(INITIAL_DATA);
  const [events, setEvents] = useState<Event[]>([]);
  const [originalEvents, setOriginalEvents] = useState<Event[]>([]);
  const [showEventEditor, setShowEventEditor] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [action, setAction] = useState<"Create" | "Edit">("Create");
  const [eventView, setEventView] = useState("simple");

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
    } catch (error) {
      console.error(error);
      toast.error("Error fetching events");
    }
  };

  const handleSubmitEvent = async (eventData: EventData) => {
    try {

      //Very hardcoded very bad but I just want the event to submit holy molely
      if (!eventData.date.includes(":00")) {
        // Append ":00" for seconds and "-07:00" for Calgary (Mountain Time)
        // Note: You may need to adjust -07:00 to -06:00 during Daylight Saving Time
        eventData.date = `${eventData.date}:00-07:00`;
      }

      const url = action === "Create" 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${selectedEvent?.id}`;
  
      const method = action === "Create" ? "POST" : "PUT";
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(eventData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "An error occurred");
        return;
      }
  
      const result = await response.json();
      toast.success(`Event ${action === "Create" ? "created" : "updated"} successfully`);
      fetchEvents(); // Refresh the events list
      handleCloseCreatePanel();
    } catch (error) {
      console.error(error);
      toast.error("Error submitting event");
    }
  };

  const { steps, step, currentStepIndex, back, next, isFirstStep, isLastStep } = MultistepForm([
    <EventEditor 
          defaultValues={{
            name: "Event Name",
            date: "2023-01-01T12:00",
            location: "SAIT Stan Grad Centre",
            audience: "",
            programs: "Program A",
            description: "",
            host: "SAIT",
            contact: "",
            capacity: 0
          }}
          onSubmit={handleSubmitEvent}
      />,
      <EventForm
            mode="creator"
            formId="123" // or null for new form
            onSubmit={(data) => {
              if (data.isDraft) {
                console.log("Saving draft:", data);
                // API call to save draft
              } else {
                console.log("Submitting form:", data);
                // API call to submit form
              }
              localStorage.removeItem(`formDraft_${data.formId || "new"}`);
            }}
        />
  ]);

  const handleOpenCreatePanel = () => setShowEventEditor(true);

  const handleCloseCreatePanel = () => {
    setShowEventEditor(false);
    setData(INITIAL_DATA);
  };

  const handleEventSelect = async (event: Event) => {
    try {
      // Fetch complete event data in case the list view doesn't have all fields
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${event.id}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }
  
      const eventDetails = await response.json();
      setSelectedEvent(eventDetails);
      setData(eventDetails);
      setAction("Edit");
      handleOpenCreatePanel();
    } catch (error) {
      console.error(error);
      toast.error("Error loading event details");
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setData(INITIAL_DATA);
    setAction("Create");
    handleOpenCreatePanel();
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "An error occurred while deleting event.");
        return;
      }

      toast.success("Event deleted successfully");
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting event");
    }
  };

  const handleNext = () => {
    console.log("This event was submitted");
    next();
  };

  const handleCardView = () =>{
    setEventView("Simple");
  }

  const handleListView = () => {
    setEventView("Extended");
  }

  return (
    <main className="bg-saitWhite h-screen p-4 xl:pr-8">
      <div>
      <header className="flex flex-col items-center justify-between border-b-2 border-saitBlack pb-3 lg:flex-row md:space-y-3 xs:space-y-3"> 
        <h1 className="text-2xl font-bold">Events</h1>

          <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex flex-row w-[4.3rem] items-center justify-evenly bg-white border-2 rounded-lg p-1">
                  <Tooltip title="Simple View" arrow>
                    <button className="Simple View" onClick={handleCardView}>
                      <ViewModuleRoundedIcon sx={
                        eventView === "Simple" ? { color: '#2b64ae', fontSize: 26 } :
                        { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}
                        }/>
                    </button>
                  </Tooltip>
                  <Tooltip title="Extended View" arrow>
                    <button className="" onClick={handleListView}>
                      <ViewListRoundedIcon sx={
                        eventView === "Extended" ? { color: '#2b64ae', fontSize: 26 } :
                        { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}
                        }/>
                    </button>
                  </Tooltip>
                </div>
            <input
              type="text"
              placeholder="Search by name"
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Filter by location"
              className="p-2 border rounded-lg"
            />
            <div className="flex justify-between items-center p-4">
              <ActionButton
                title="Create" 
                onClick={handleCreateEvent}
                textColor="text-saitBlue"
                borderColor="border-saitBlue"
                hoverBgColor="bg-saitBlue"
                hoverTextColor="text-saitWhite"
                icon={<AddRoundedIcon />} 
              />
              
            </div>
          </div>
        </header>

        <div className="bg-saitWhite h-screen">
          <div>

            {eventView === 'Exetended' ? (
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
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        {action} Event
                      </h2>
                      
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

                    <div className="flex-grow">
                      <div onSubmit={(e) => {
                        e.preventDefault();
                        if (isLastStep) {
                          handleCloseCreatePanel();
                        } else {
                          handleNext();
                        }
                      }}>
                        {step}
                      </div>
                    </div>

                    <div className="sticky bottom-4 mx-auto max-w-lg bg-white py-3 px-6 rounded-lg shadow-md border border-gray-200 flex justify-center gap-4">
                      {!isFirstStep && (
                        <button type="button" onClick={back} className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          Back
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-4 py-1.5 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                      >
                        {isLastStep ? "Finish Event & Form creation" : "Next"}
                      </button>
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