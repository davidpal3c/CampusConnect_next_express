import { EventInterface } from "@/app/pages/user/props";

import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useGoogleCalendar } from "@/app/hooks/useGoogleCalentar";

import { toast } from "react-toastify";
 
export default function EventCard(props: EventInterface ) {
  let { event_id, name, date, location, audience, host, contact, capacity, current_attendees } = props;

  const parsedDate = new Date(date);

  const readableDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long", 
  }).format(parsedDate);

  const readableTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(parsedDate);

  // Calendar Logic
  const { addEvent } = useGoogleCalendar();
  const newEvent = {
    summary: "",
    description: "Event created with CampusConnect",
    start: {
      dateTime: "",
      timeZone: "America/Edmonton"
    }
  };

  const handleAddEventGoogle = async () => {

    if (!name || name.trim() === "") {
      console.error("Event name is empty or null.");
      toast.error("There was an error with the Event data");
      return;
    }

    if (!readableTime || readableTime.trim() === "") {
      console.error("Event time is required.");
      toast.error("There was an error with the Event data");
      return;
    }

    newEvent.summary = name;
    newEvent.start.dateTime = date;

    try {
      const response = await addEvent(newEvent);
      console.log(response);
      toast.success("Event created");
    } catch (error) {
      toast.error("Failed to create event");
      console.error("Failed to create event", error);
    }
  }
  

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
          <PersonIcon/>
          <p>{current_attendees}/{capacity}</p>

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
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 text-saitBlue border border-saitBlue px-4 py-2 rounded-md hover:bg-saitBlue hover:text-white transition-colors duration-300"
            onClick={handleAddEventGoogle}
          >
            Add to Calendar
          </button>
          <button
            className="flex-1 bg-saitBlue text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-300"
          >
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
}
