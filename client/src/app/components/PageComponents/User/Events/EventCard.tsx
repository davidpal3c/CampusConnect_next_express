import { EventInterface } from "@/app/pages/user/props";

import PermIdentityIcon from '@mui/icons-material/PermIdentity';import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {getTime, formatToLongDate} from '@/app/_utils/dateUtils';

import { toast } from "react-toastify";
 
export default function EventCard(props: EventInterface ) {
  let { event_id, name, date, location, audience, host, contact, capacity, current_attendees } = props;
  let readableDate = formatToLongDate(date);
  let readableTime = getTime(date);

  // Calendar Logic
  const newEvent = {
    summary: "",
    description: "Event created with CampusConnect",
    start: {
      dateTime: "",
      timeZone: "America/Edmonton"
    }
  };

  return (
    <div className="border-gray-100 rounded-2xl shadow-lg border-2 transition-transform transform hover:scale-[1.03] hover:shadow-xl overflow-hidden">
      <div className="w-full h-40 overflow-hidden">
        <img
          src={"/img_placeholder.png"}
          alt="Event"
          className="w-full h-full object-cover rounded-t-2xl transition-all hover:opacity-80"
        />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-row items-center">
          <h2 className="text-lg font-bold text-gray-900 mr-auto">{name}</h2>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex flex-row items-center gap-2">
            <CalendarMonthIcon/>
            <p>{readableDate}</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <AccessTimeIcon/>
            <p>{readableTime}</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <LocationOnIcon/>
            <p>{location}</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <PermIdentityIcon/>
            <p>{current_attendees}/{capacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
