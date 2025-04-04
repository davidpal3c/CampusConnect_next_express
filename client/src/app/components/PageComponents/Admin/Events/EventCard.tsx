"use client";
import { useState } from "react";
import { adjustDateLetters } from "@/app/_utils/dateUtils";
import { Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { DeleteIcon } from "lucide-react";

type EventCardProps = {
  event: any;
  onEventSelect?: (event: any) => void;
  onEventDelete?: (event: any) => void;
  isAdminView?: boolean;
};

export default function EventCard({ event, onEventSelect, onEventDelete, isAdminView = false }: EventCardProps) {
  const [dateReadable] = useState(adjustDateLetters(event.date) || "");
  
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "Not available";
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const eventNameReduced = truncateText(event.name, 32);
  const eventLocationReduced = truncateText(event.location, 25);
  const eventHostReduced = truncateText(event.host, 25);

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
      {event ? (
        <div className="flex flex-col h-full">
          {/* Status and Date */}
          <div className="flex justify-between items-start mb-2">
            
            {/* Have to make the change in the database to allow for drafts */}
            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded">
              Published
            </span>
            <p className="text-sm text-gray-600">{dateReadable}</p>
          </div>

          {/* Category/Tag */}
          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded mb-3 self-start">
            {event.departments || "General"}
          </span>

          {/* Event Content */}
          <div className="flex-grow">
            <h2 className="text-lg font-bold mb-2">{eventNameReduced}</h2>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Location:</span> {eventLocationReduced}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Host:</span> {eventHostReduced}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Capacity:</span> {event.capacity || "N/A"}
              </p>
            </div>
          </div>

          {/* Admin Actions */}
          {isAdminView && (
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                className="group border p-1 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                onClick={() => onEventSelect?.(event)}
              >
                <Tooltip title="Edit Event" arrow>
                  <EditRoundedIcon sx={{ fontSize: 18 }} />
                </Tooltip>
              </button>
              <button 
                className="group border p-1 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                onClick={() => onEventDelete?.(event)}
              >
                <Tooltip title="Delete Event" arrow>
                  <DeleteIcon size={18} />
                </Tooltip>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
          Event Data Not Available
        </div>
      )}
    </div>
  );
}