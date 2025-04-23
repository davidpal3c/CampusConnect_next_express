// libraries
import { toast } from "react-toastify";


// Fetch articles by type
export const fetchEvents = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            toast.error(`Error: ${data.message || "Failed to fetch data"}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return null;
        }

        return data;

    } catch (error) {
        toast.error("Unknown error occurred fetching events!");
        return null;
    }
};

// Fetch a single article by ID
export const fetchEventById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            toast.error(`Error: ${data.message || "Failed to fetch data"}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return null;
        }

        return data;

    } catch (error) {
        toast.error("Unknown error occurred fetching event by ID!");
        return null;
    }
};


