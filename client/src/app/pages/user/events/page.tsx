"use client";

import { useEffect, useState } from "react";
import EventList from "@/app/components/PageComponents/User/Events/EventList";
import UserPageMenu from "@/app/components/PageComponents/User/UserPageMenu";
import { fetchEvents } from "@/app/api/users/events"; 

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      if (fetchedEvents) {
        setEvents(fetchedEvents);
      }
      setIsLoading(false);
    };

    loadEvents();
  }, []);

  function onClickAllEvents() {
    // TODO: 
  }

  function onClickMyEvents() {
    // TODO: 
  }

  function onClickMyCalendar() {
    // TODO: 
  }

  return (
    <div className="flex-col px-6 py-4">
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
}

// TO DO: Move to a folder with the articles one

const EventCardSkeleton = () => {
  return (
    <div className="animate-pulse p-4 border rounded-lg shadow-sm bg-white space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  );
}
