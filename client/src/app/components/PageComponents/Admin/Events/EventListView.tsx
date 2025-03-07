import ActionButton from "@/app/components/Buttons/ActionButton";
import React, { useState } from "react";

import { Tooltip } from '@mui/material';

import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
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
      <ul>
        {currentEvents.map((event, index) => (
          <li key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold">{event.name}</h3>
            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
            <p className="text-sm">{event.location}</p>

            {/** Edit Button */}
            <button className="group absolute top-2 border right-2 z-10 shadow-md bg-saitWhite text-saitBlue p-1 rounded-full hover:scale-125 hover:bg-saitBlue hover:border-saitLighterBlueOg hover:shadow-2xl active:scale-90 transition-transform transition-shadow duration-300 ease-in-out" 
            onClick={() => onEventSelect(event)}>
            <Tooltip title="Edit Event">    
                <EditRoundedIcon sx={{ fontSize: 21, color: 'inherit' }} className="group-hover:text-[#f7f7f7] transition-colors duration-300" />
            </Tooltip>
            </button>

            {/** Delete Button */}
            <button className="group absolute top-2 border right-2 z-10 shadow-md bg-saitWhite text-saitBlue p-1 rounded-full hover:scale-125 hover:bg-saitBlue hover:border-saitLighterBlueOg hover:shadow-2xl active:scale-90 transition-transform transition-shadow duration-300 ease-in-out" 
            onClick={() => onEventDelete(event)}>
            <Tooltip title="Delete Event">    
                <DeleteIcon className="group-hover:text-[#f7f7f7] transition-colors duration-300" />
            </Tooltip>
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