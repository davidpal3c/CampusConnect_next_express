import {toast} from "react-toastify";

export const fetchById = async (id: string, parent: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${parent}/${id}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        return await handleApiResponse(response, parent);

    } catch (error) {
        toast.error("Unknown error occurred fetching by ID!");
        return null;
    }
};

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
}