"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

import { fetchEventById } from "@/app/api/users/events";
import { formatDateForCalendar } from "@/app/_utils/dateUtils"
import Loader from "@/app/components/Loader/Loader";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchEventData(id as string);
        }
    }, [id]);

    const fetchEventData = async (eventId: string) => {
        try {
            const data = await fetchEventById(eventId);
            setEvent(data);
        } catch (error) {
            toast.error("Error fetching event data");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loader isLoading={isLoading} />;
    if (!event) return <p className="px-8 py-4 text-red-500">Event not found.</p>;

    const {
        name,
        date,
        location,
        host,
        contact,
        capacity,
        current_attendees,
    } = event;


    // ADD CALENDAR
    const { start, end } = formatDateForCalendar(date);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(name)}&details=${encodeURIComponent(
        `Hosted by ${host}. Contact: ${contact || "N/A"}.`
    )}&dates=${start}/${end}&location=${encodeURIComponent(location)}`;


    return (
        <main className="flex flex-col items-center py-12 px-4 md:px-8 bg-gray-50 min-h-screen">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
                    <p className="text-sm text-gray-600">
                        {new Date(date).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{location}</p>
                    {host && (
                        <p className="text-sm text-gray-700 mt-2">Hosted by: {host}</p>
                    )}
                </header>

                {/* Image */}
                <div className="mb-8">
                    <img
                        src="/img_placeholder.png"
                        alt={name}
                        className="w-full rounded-lg shadow-md object-cover max-h-[400px]"
                    />
                </div>

                {/* Details */}
                <div className="bg-white p-6 rounded-lg shadow mb-10">
                    {contact && (
                        <p className="text-sm text-gray-700 mb-2">
                            Contact: <a href={`mailto:${contact}`} className="text-blue-600 underline">{contact}</a>
                        </p>
                    )}
                    {capacity && (
                        <p className="text-sm text-gray-700">
                            Capacity: {current_attendees} / {capacity}
                        </p>
                    )}

                    <a
                    href={googleCalendarUrl}

                    className="mt-6 inline-flex items-center px-4 py-2 bg-saitWhite border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                    >
                    <img
                        src="/google-logo.png"
                        alt="Google logo"
                        className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Add to Google Calendar</span>
                    </a>

                </div>

                


                {/* Navigation */}
                <Link
                    href="/user/events"
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← Back to all events
                </Link>
            </div>
        </main>
    );
};

export default EventDetails;
