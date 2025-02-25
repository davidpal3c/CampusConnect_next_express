"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventEditor from '@/app/components/PageComponents/Admin/Events/EventEditor';
import EventForm from '@/app/components/PageComponents/Admin/Events/EventForm';
import ActionButton from "@/app/components/Buttons/ActionButton";
import { toast } from "react-toastify";

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showEventEditor, setShowEventEditor] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [action, setAction] = useState("Create");

  useEffect(() => {
    fetchEvents();
  }, []);


  //Fetch the data from events API
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      console.log("Current Events: ", data);

      if (!response.ok) {
        toast.error(data.message || "An Error occurred fetching events.");
        return;
      }

      if (data.events?.length === 0) {
        toast.info("No events found");
        setEvents([]);
        return;
      }

      const formattedEvents = data.map(event => ({
        title: event.name,
        start: new Date(event.date),
        end: new Date(event.date),
        resource: event
      }));
        
      setEvents(formattedEvents);
  
      // Transform events for calendar
    } catch (error) {
      console.error(error);
      toast.error("Error fetching events: " + error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event.resource);
    setAction("Edit");
    setShowEventEditor(true);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setAction("Create");
    setShowEventEditor(true);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 p-6 bg-gray-100 min-h-screen">
      {(
        <div className="bg-white p-4 shadow-md rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Events</h2>
            <ActionButton
              title="Create Event"
              onClick={handleCreateEvent}
              textColor="text-saitBlue"
              borderColor="border-saitBlue"
              hoverBgColor="bg-saitBlue"
              hoverTextColor="text-white"
            />
          </div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {format(event.start, 'PPpp')}
                </p>
                <p className="text-sm">{event.resource.location}</p>
                <ActionButton
                title="Edit"
                onClick={() => handleEventSelect(event)} 
                textColor="text-saitBlue"
                borderColor="border-saitBlue"
                hoverBgColor="bg-saitBlue"
                hoverTextColor="text-white"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/** Testing the Event form */}
      <div className={`bg-white p-4 shadow-md rounded-md "col-span-2" : ""`}>
        <EventForm/>
      </div>
{/**  just for testing purposes
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
    {/**Example of what I need to make it like
     * 
     *           <AnimatePresence>
            {isCreatePanelVisible &&
              <motion.div
                ref={articleEditorRef}
                initial={{ x: "100vh" }}
                animate={{ x: 0 }}                                                        //final state of animation
                exit={{ x: "100vh" }}                                                      // exit animation
                transition={{ duration: 0.7, ease: "easeInOut" }}
                // transition={{ type: "easing", stiffness: 150, damping: 40 }}
                className="absolute top-0 right-0 h-full w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50"
              >
                <div className="">
                  <ArticleEditor closeOnClick={handleCloseCreatePanel} articleTypes={articleTypes} action={panelTask} 
                  closeArticleEditor={handleCloseCreatePanel} articleObject={selectedArticle}/>
                </div>
              </motion.div>
            }
          </AnimatePresence>
     */}
     
      {showEventEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <EventEditor
              closeOnClick={() => setShowEventEditor(false)}
              action={action}
              eventObject={selectedEvent}
              closeEventEditor={() => {
                setShowEventEditor(false);
                fetchEvents();
              }}
            />
          </div>
        </div>
      )}
    </div>
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
