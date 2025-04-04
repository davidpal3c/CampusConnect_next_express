import React, { useState } from "react";
import { Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { DeleteIcon } from "lucide-react";

const EventListView = ({ events, onEventSelect, onEventDelete }) => {
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
      <ul className="space-y-4">
        {currentEvents.map((event, index) => (
          <li 
            key={index} 
            className="p-4 border rounded-lg hover:shadow-md transition-shadow relative"
          >
            {/* Event Info */}
            <div className="pr-12"> {/* Add padding to prevent overlap with buttons */}
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
              <p className="text-sm">{event.location}</p>
            </div>

            {/* Action Buttons - positioned absolutely at top-right */}
            <div className="absolute top-3 right-3 flex space-x-2">
              {/* Edit Button */}
              <Tooltip title="Edit Event" arrow>
                <button 
                  onClick={() => onEventSelect(event)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <EditRoundedIcon sx={{ fontSize: 20 }} />
                </button>
              </Tooltip>

              {/* Delete Button */}
              <Tooltip title="Delete Event" arrow>
                <button 
                  onClick={() => onEventDelete(event)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                >
                  <DeleteIcon size={18} />
                </button>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Pagination */}
      <div className="flex justify-between items-center m-4 py-8">
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

export default EventListView;