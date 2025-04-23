"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
    const [articleTypes, setArticleTypes] = useState([]);
    const [allArticles, setAllArticles] = useState([]);

    // Fetch all articles
    useEffect(() => {
        // Fetch article types
        const fetchTypes = async () => {
          try {
            const data = await fetchArticleTypes();
            if (data) setArticleTypes(data);
          } catch (error) {
            console.error("Error fetching article types:", error);
          }
        };
    
        // Fetch all articles once
        const fetchArticles = async () => {
          try {
            const data = await fetchAllArticles();
            if (data) setAllArticles(data);
          } catch (error) {
            console.error("Error fetching articles:", error);
          }
        };
        
        fetchTypes();
        fetchArticles();
      }, []);

    return (
        <ArticlesContext.Provider value={{ articleTypes, allArticles }}>
            {children}
        </ArticlesContext.Provider>
    );
};


export const useArticlesContext = () => {
    const context = useContext(ArticlesContext);
    if (!context) {
        throw new Error("useArticleData must be used within a ArticlesProvider");
    }
    return context;
};



// Fetch

export const fetchAllArticles = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        return await handleApiResponse(response);

    } catch (error) {
        toast.error("Unknown error occurred fetching articles!");
        console.error("Error fetching articles:", error);
        return null;
    }
  };
  
export const fetchArticleTypes = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();
        return data;


    } catch (error) {
        toast.error("Unknown error occurred fetching article types!");
        console.error("Error fetching article types:", error);
        return null;
    }
  };


export const handleApiResponse = async (response) => {
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

