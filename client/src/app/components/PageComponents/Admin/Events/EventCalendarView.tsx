import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventEditor from './EventEditor';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const toLocalISOString = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
    return localISOTime;
  };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Event = {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
  audience: string;
  programs: string;
  description: string;
  host: string;
  contact: string;
  capacity: number;
  allDay?: boolean;
};


const EventCalendarView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(parsedEvents);
      } catch (error) {
        console.error('Failed to parse saved events', error);
      }
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const convertToCalendarEvent = (eventData: any): Event => {
    // Create date object from form input (which is in local time)
    const startDate = new Date(eventData.date);
    // Add timezone offset back to get correct UTC time
    const adjustedStart = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000);
    const endDate = new Date(adjustedStart.getTime() + 2 * 60 * 60 * 1000); // 2 hour duration
    
    return {
      title: eventData.name,
      start: adjustedStart,
      end: endDate,
      location: eventData.location,
      audience: eventData.audience,
      programs: eventData.programs,
      description: eventData.description,
      host: eventData.host,
      contact: eventData.contact,
      capacity: eventData.capacity,
      allDay: view === Views.MONTH,
    };
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEditor(true);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date; action: 'select' | 'click' | 'doubleClick' }) => {
    setSelectedEvent({
      title: '',
      start: slotInfo.start,
      end: slotInfo.end,
      location: '',
      audience: '',
      programs: '',
      description: '',
      host: '',
      contact: '',
      capacity: 0,
      allDay: view === Views.MONTH,
    });
    setShowEditor(true);
  };

  const handleSubmitEvent = (data: any) => {
    const calendarEvent = convertToCalendarEvent(data);
    
    if (selectedEvent && 'id' in selectedEvent) {
      // Update existing event
      setEvents(events.map(evt => 
        evt.id === selectedEvent.id ? { ...calendarEvent, id: selectedEvent.id } : evt
      ));
    } else {
      // Add new event
      const newEvent = { ...calendarEvent, id: Date.now().toString() };
      setEvents([...events, newEvent]);
    }
    
    setShowEditor(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && 'id' in selectedEvent) {
      setEvents(events.filter(evt => evt.id !== selectedEvent.id));
      setShowEditor(false);
      setSelectedEvent(null);
    }
  };

  // Type-safe view handler
  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <button
          onClick={() => {
            setSelectedEvent(null);
            setShowEditor(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Event
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setView(Views.DAY)}
            className={`px-4 py-2 rounded ${view === Views.DAY ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Day
          </button>
          <button
            onClick={() => setView(Views.WEEK)}
            className={`px-4 py-2 rounded ${view === Views.WEEK ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Week
          </button>
          <button
            onClick={() => setView(Views.MONTH)}
            className={`px-4 py-2 rounded ${view === Views.MONTH ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="flex-grow p-4">
        <Calendar<Event>
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          view={view}
          onView={handleViewChange}
          date={date}
          onNavigate={setDate}
          views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
          defaultView={Views.MONTH}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#3174ad',
              borderRadius: '4px',
              border: '0px',
              color: 'white',
            },
          })}
        />
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">
                {selectedEvent?.id ? 'Edit Event' : 'Create New Event'}
              </h2>
              <div className="flex gap-2">
                {selectedEvent?.id && (
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowEditor(false);
                    setSelectedEvent(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>
            <EventEditor
            defaultValues={{
                name: selectedEvent?.title || '',
                date: selectedEvent?.start ? toLocalISOString(selectedEvent.start) : '',
                location: selectedEvent?.location || '',
                audience: selectedEvent?.audience || '',
                programs: selectedEvent?.programs || '',
                description: selectedEvent?.description || '',
                host: selectedEvent?.host || '',
                contact: selectedEvent?.contact || '',
                capacity: selectedEvent?.capacity || 0,
            }}
            onSubmit={handleSubmitEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendarView;