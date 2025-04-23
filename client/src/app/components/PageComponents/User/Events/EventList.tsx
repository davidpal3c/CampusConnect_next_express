"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { EventInterface } from "@/app/api/users/props";
import Loader from "@/app/components/Loader/Loader";

export default function EventList({ events }: { events: EventInterface[] }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("All");

  useEffect(() => {
    if (events.length > 0) {
      setLoading(false);
    }
  }, [events]);

  const uniqueAudiences = ["All", ...new Set(events.map(e => e.audience).filter(a => a))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    const matchesAudience = audienceFilter === "All" || event.audience === audienceFilter;
    return matchesSearch && matchesAudience;
  });

  if (loading) return <Loader isLoading={true} />;

  return (
    <div className="py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search for events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={audienceFilter}
          onChange={(e) => setAudienceFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {uniqueAudiences.map((aud, index) => (
            <option key={index} value={aud}>
              {aud || "General"}
            </option>
          ))}
        </select>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.event_id} {...event} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12 text-lg">No events found matching your filters.</div>
      )}
    </div>
  );
}
