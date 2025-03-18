// libraries
import { toast } from "react-toastify";

// Fetch data from the API
export const fetchArticles = async (typeName: String) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types/${typeName}`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            const errorData = data;
            return;
        }

        return data;

    } catch (error) {
        console.error(error);
        toast.error("Unknown error occurred fetching articles! : " + error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
};

// Fetch a single article by ID
export const fetchArticleById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            const errorData = data;
            return;
        }

        return data;

    } catch (error) {
        console.error(error);
        toast.error("Unknown error occurred fetching users! : " + error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
};

// Fetch articles types
export const fetchArticleTypes = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types`, {
            method: "GET",
            headers: {
            "content-type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            const errorData = data;
            return;
        }

        return data;

    } catch (error) {
        console.error(error);
        toast.error("Unknown error occurred fetching article types! : " + error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

// Fetch all articles

export const fetchAllArticles = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            const errorData = data;
            return;
        }

        return data;

    } catch (error) {
        console.error(error);
        toast.error("Unknown error occurred fetching articles! : " + error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
}