"use client"

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import ActionButton from "@/app/components/Buttons/ActionButton";
import { getTodayDate } from "@/app/_utils/dateUtils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserData } from '@/app/_utils/userData-context';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

type CreateEventProps = {
  closeOnClick: any;
  action: string;
  eventObject?: any;
  closeEventEditor: any;
};

const EventEditor: React.FC<CreateEventProps> = ({ 
  closeOnClick, 
  action, 
  eventObject, 
  closeEventEditor 
}) => {
  const { userData } = useUserData();
  const [userFullName, setUserFullName] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      date: getTodayDate(),
      location: "",
      audience: "",
      host: "",
      contact: "",
      capacity: 0,
      current_attendees: 0
    },
  });

  useEffect(() => {
    if (action === "Edit" && eventObject) {
      reset({
        name: eventObject.name || "",
        date: eventObject.date || getTodayDate(),
        location: eventObject.location || "",
        audience: eventObject.audience || "",
        host: eventObject.host || "",
        contact: eventObject.contact || "",
        capacity: eventObject.capacity || 0,
        current_attendees: eventObject.current_attendees || 0
      });
    }
  }, [action, eventObject, reset]);

  const submitForm = async (data: any) => {
    const eventData = {
      name: data.name,
      date: new Date(data.date).toISOString(),
      location: data.location,
      audience: JSON.stringify(data.audience.split(',')),
      host: data.host,
      contact: data.contact,
      capacity: parseInt(data.capacity),
      current_attendees: parseInt(data.current_attendees)
    };

    if (action === "Create") {
      await processCreateEvent(eventData);
    } else {
      await processUpdateEvent(eventData);
    }
  };

  const processCreateEvent = async (eventData: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || "An Error occurred creating event.");
        return;
      }

      toast.success(data.message);
      closeEventEditor();

    } catch (error) {
      console.error(error);
      toast.error(`Error creating event: ${error}`);
    }
  };

  const processUpdateEvent = async (eventData: any) => {
    try {
      const eventId = eventObject.event_id;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || "An Error occurred updating event.");
        return;
      }

      toast.success(data.message);
      closeEventEditor();

    } catch (error) {
      console.error(error);
      toast.error(`Error updating event: ${error}`);
    }
  };

  return (
    <main className="h-full w-full">
      <header className="flex justify-between items-center bg-white p-5 rounded-lg mb-6 shadow-md">
        <h1 className="font-semibold">{action === "Create" ? "Create Event" : "Edit Event"}</h1>
        <Tooltip title="Close Editor" arrow>
          <button onClick={closeOnClick}>
            <CloseIcon />
          </button>
        </Tooltip>
      </header>
      
      <section className="bg-white p-4 rounded-lg shadow-md">
        
        {/**Form for event creation */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-light">Event Name</label>
              <input 
                {...register("name", { required: "Event name is required" })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-light">Date & Time</label>
              <input 
                type="datetime-local"
                {...register("date", { required: "Date is required" })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>

            <div>
              <label className="text-sm font-light">Location</label>
              <input 
                {...register("location", { required: "Location is required" })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div>
              <label className="text-sm font-light">Audience (comma-separated)</label>
              <input 
                {...register("audience", { required: "Audience is required" })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.audience && <p className="text-red-500 text-sm">{errors.audience.message}</p>}
            </div>

            <div>
              <label className="text-sm font-light">Host</label>
              <input 
                {...register("host")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-light">Contact</label>
              <input 
                {...register("contact", { required: "Contact is required" })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
            </div>

            <div>
              <label className="text-sm font-light">Capacity</label>
              <input 
                type="number"
                {...register("capacity", { 
                  required: "Capacity is required",
                  min: { value: 1, message: "Capacity must be at least 1" }
                })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
            </div>

            {action === "Edit" && (
              <div>
                <label className="text-sm font-light">Current Attendees</label>
                <input 
                  type="number"
                  {...register("current_attendees")}
                  className="w-full p-2 border rounded mt-1"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <ActionButton 
              title={action === "Create" ? "Create Event" : "Update Event"}
              onClick={handleSubmit(submitForm)}
              textColor="text-saitBlue"
              borderColor="border-saitBlue"
              hoverBgColor="bg-saitBlue"
              hoverTextColor="text-white"
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default EventEditor;