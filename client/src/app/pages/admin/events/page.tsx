import React from 'react';
import EventsCalendar from '../../../components/Calendar/EventsCalendar';

const events = [
  {
    title: 'Meeting',
    start: new Date(2025, 0, 25, 10, 0), // Month is 0-indexed
    end: new Date(2025, 0, 25, 11, 0),
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 0, 25, 12, 0),
    end: new Date(2025, 0, 25, 13, 0),
  },
];

const Events = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">Events</h1>
      <EventsCalendar events={events} />
    </div>
  );
};

export default Events;
