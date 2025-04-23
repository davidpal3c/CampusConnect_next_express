import Link from "next/link";

import { EventInterface } from "@/app/api/users/props";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getTime, formatToLongDate } from '@/app/_utils/dateUtils';

export default function EventCard(props: EventInterface) {
  const { event_id, name, date, location, capacity, current_attendees } = props;

  const readableDate = formatToLongDate(date);
  const readableTime = getTime(date);

  const isFull = current_attendees >= capacity;
  const isAlmostFull = current_attendees / capacity >= 0.8 && !isFull;

  return (
    <div className="relative border-gray-100 rounded-2xl shadow-lg border-2 transition-transform transform hover:scale-[1.03] hover:shadow-xl overflow-hidden">
      <Link href={`events/${event_id}`} passHref>

        {/* TAGS */}
        {isFull && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
            Full
          </div>
        )}
        {!isFull && isAlmostFull && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full z-10">
            Few Spots Left
          </div>
        )}
        {new Date(date).toDateString() === new Date().toDateString() && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full z-10">
            Today
          </div>
        )}

        {/* Event DETAILS */}
        <div className="w-full h-40 overflow-hidden">
          <img
            src={"/img_placeholder.png"}
            alt="Event"
            className="w-full h-full object-cover rounded-t-2xl transition-all hover:opacity-80"
          />
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <h2 className="text-lg font-bold text-gray-900 mr-auto line-clamp-2">{name}</h2>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex flex-row items-center gap-2">
              <CalendarMonthIcon fontSize="small" />
              <p>{readableDate}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <AccessTimeIcon fontSize="small" />
              <p>{readableTime}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <LocationOnIcon fontSize="small" />
              <p>{location}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PermIdentityIcon fontSize="small" />
              <p>{current_attendees}/{capacity}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
