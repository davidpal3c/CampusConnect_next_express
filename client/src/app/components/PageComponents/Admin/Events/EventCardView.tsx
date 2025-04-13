import React, { useState } from "react";
import EventCard from "./EventCard";


const EventCardView = ({ events, onEventSelect, onEventDelete, isAdminView = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(8);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentEvents.map((event, index) => (   
          <EventCard 
            key={index}
            event={event}
            onEventSelect={onEventSelect}
            onEventDelete={onEventDelete}
            isAdminView={isAdminView}            
          />    
        ))}
      </div>

      
      
      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventCardView;