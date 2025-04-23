// libraries
import { toast } from "react-toastify";

// Helper function to handle API response
export const handleApiResponse = async (response: Response) => {
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

    // If the response contains articles, filter out unpublished ones
    if (Array.isArray(data)) {
        return data.filter(article => article.status === "Published");
    }

    // If it's a single article, check its status
    if (data.status !== "Published") {
        return null;
    }

    return data;
};

// Fetch articles by type
export const fetchArticlesByType = async (typeName: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types/${typeName}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        return await handleApiResponse(response);

    } catch (error) {
        toast.error("Unknown error occurred fetching article by type!");
        return null;
    }
};

// Fetch a single article by ID
export const fetchArticleById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        return await handleApiResponse(response);

    } catch (error) {
        toast.error("Unknown error occurred fetching article by ID!");
        return null;
    }
};


