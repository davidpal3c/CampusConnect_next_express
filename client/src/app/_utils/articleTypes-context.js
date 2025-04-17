"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ArticleTypesContext = createContext();

export const ArticleTypesProvider = ({ children }) => {
    const [articleTypesData, setArticleTypesData] = useState([]);
    const [articleTypes, setArticleTypes] = useState([]);

    const fetchArticleTypes = async() => { 
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types`, {
              method: "GET",
              headers: {
                "content-type": "application/json",
              },
              credentials: "include",   
            });
      
            const articleTypesData = await response.json();
      
            if (!response.ok) {
              console.error("Error fetching article types: articleTypes context error");
              // throw new Error("An Error occurred fetching article types.");
              return;
            }
      
            setArticleTypesData(articleTypesData);
            // console.log("Article Types fetched (context): ", articleTypesData);
            
            setArticleTypes(articleTypesData.map((type) => type.name));   
          } catch (error) {
            console.error(error);
            // throw new Error("An Error occurred fetching article types.");
            return;
          }
    };

    useEffect(() => {
        fetchArticleTypes();
    }, []);

    return (
        <ArticleTypesContext.Provider value={{ articleTypes, articleTypesData, fetchArticleTypes }}>
            {children}
        </ArticleTypesContext.Provider>
    );
};


export const useArticleTypes = () => {
    const context = useContext(ArticleTypesContext);
    if (!context) {
        throw new Error("useArticleTypes must be used within a ArticleTypesProvider");
    }
    return context;
};

