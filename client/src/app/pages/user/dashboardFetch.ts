// libraries
import { toast } from "react-toastify";

// Helper function to handle API response
export const handleApiResponse = async (response: Response, parent: string) => {
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

    if (parent == "articles"){
        // If the response contains articles, filter out unpublished ones
        if (Array.isArray(data)) {
            return data.filter(article => article.status === "Published");
        }

        // If it's a single article, check its status
        if (data.status !== "Published") {
            return null;
        }
    }

    return data;
};

// Fetch Recent Articles
export const fetchRecentArticles = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/recent/`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        return await handleApiResponse(response, "articles");

    } catch (error) {
        toast.error("Unknown error occurred fetching recent articles!");
        return null;
    }
};

// Fetch Recent Events
export const fetchRecentEvents = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/recent/`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        return await handleApiResponse(response, "events");

    } catch (error) {
        toast.error("Unknown error occurred fetching recent events!");
        return null;
    }
};
