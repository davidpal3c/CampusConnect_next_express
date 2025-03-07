"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import ActionButton from "../../../Buttons/ActionButton";
import EventForm from "./EventForm";

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
  closeEventEditor,
}) => {
  const [step, setStep] = useState(1); // Step 1: EventEditor form, Step 2: EventForm multi steps woop woop
  const [eventEditorData, setEventEditorData] = useState(null); // Store EventEditor form data hopefully

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      date: new Date().toISOString().slice(0, 16), 
      location: "",
      audience: "",
      host: "",
      contact: "",
      capacity: 0,
      current_attendees: 0,
    },
  });

  // Handle EventEditor form submission
  const handleEventEditorSubmit = async (data) => {
    try {
      //Make sure the capacity is int
      const eventData = {
        ...data,
        date: new Date(data.date).toISOString(),

        capacity: parseInt(data.capacity, 10),
        current_attendees: parseInt(data.current_attendees, 10),
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(eventData), // Use the parsed eventData
      });
  
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "An error occurred submitting the event.");
        return;
      }
  
      toast.success("Event created successfully!");
      setEventEditorData(eventData); // Save the parsed event data
      setStep(2); // Move to the next step
    } catch (error) {
      console.error(error);
      toast.error(`Error submitting event: ${error}`);
    }
  };

  // Handle EventForm submission
  const handleEventFormSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forms/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "An error occurred submitting the form.");
        return;
      }

      toast.success("Form submitted successfully!");
      closeEventEditor(); // Close the editor after both forms are submitted
    } catch (error) {
      console.error(error);
      toast.error(`Error submitting form: ${error}`);
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
        {step === 1 ? (
          // Step 1: EventEditor form
          <form onSubmit={handleSubmit(handleEventEditorSubmit)} className="space-y-4">
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
                    min: { value: 1, message: "Capacity must be at least 1" },
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
                title="Next"
                type="submit"
                textColor="text-saitBlue"
                borderColor="border-saitBlue"
                hoverBgColor="bg-saitBlue"
                hoverTextColor="text-saitWhite"
              />
            </div>
          </form>
        ) : (
          // Step 2: EventForm
          <EventForm onSubmit={handleEventFormSubmit} onBack={() => setStep(1)} />
        )}
      </section>
    </main>
  );
};

export default EventEditor;