"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";



import { toast } from "react-toastify";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Tooltip } from '@mui/material';


export default function Event() {

    const [eventData, setEventData] = useState([]);
    const router = useRouter();

    const params = useParams();
    const id = params?.id;

    const fetchEventData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
            });

            const eventData = await response.json();

            if (!response.ok) {
                const errorData = eventData;
                toast.error(errorData.message || "An Error occurred fetching events.");
                return;
            }
            console.log(eventData);
            setEventData(eventData);

        } catch (error) {
            console.error(error);
            toast.error("Unknown error occurred fetching events, sorry! : " + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    useEffect(() => {
        fetchEventData();
    }, []);

    return(
        <div className="p-4">
            <Tooltip title="Back to Events" arrow>
                <button onClick={() => router.push("/admin/events")} className="flex items-center mb-6">
                    <ArrowBackIosRoundedIcon className="mr-4"/>
                </button>
            </Tooltip>

            <h1>Article Page</h1>
            <div>
                {eventData ? (
                    <div>
                        <h2>{eventData.name}</h2>
                        <p>{eventData.date}</p>
                        
                        <p>{eventData.location}</p>
                        <p>{eventData.audience}</p>
                        <p>{eventData.capacity}</p>
                        <p>{eventData.current_attendees}</p>
                        <p>{eventData.host}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

            </div>
        </div>

        
    );
}