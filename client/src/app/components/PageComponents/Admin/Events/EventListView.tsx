import React, { useState } from "react";

const EventListView = ({ events, onEventSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <ul>
        {currentEvents.map((event, index) => (
          <li key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold">{event.name}</h3>
            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
            <p className="text-sm">{event.location}</p>
            <button onClick={() => onEventSelect(event)} className="text-saitBlue hover:underline">
              Edit
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center m-4 py-8">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EventListView;