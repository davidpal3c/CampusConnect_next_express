"use client";

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const EventsCalendar: React.FC<{ events: Event[] }> = ({ events }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={isExpanded ? 'h-full w-full' : 'h-64 w-64'}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', width: '100%' }}
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleExpandClick}
      >
        {isExpanded ? 'Shrink Calendar' : 'Expand Calendar'}
      </button>
    </div>
  );
};

export default EventsCalendar;
