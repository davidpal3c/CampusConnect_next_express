"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import ArticleList from "@/app/components/PageComponents/User/Articles/ArticleList";
import { fetchArticleTypes, fetchAllArticles } from "../articles/articles";
import { ArticleTypeInterface} from "../props";
import ArticleTypeButton from "@/app/components/PageComponents/User/Articles/ArticleTypeButton";

export default function Articles() {
  const searchParams = useSearchParams();
  const paramsType = searchParams.get("type");

  const [typeName, setTypeName] = useState(paramsType || "All");
  const [articleTypes, setArticleTypes] = useState([]);
  const [allArticles, setAllArticles] = useState([]); // Store all articles only once

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

  // Filter articles based on selected type (computed on re-render)
  const filteredArticles = useMemo(() => {
    if (typeName === "All") return allArticles;
    const selectedType = articleTypes.find((t) => t.name === typeName);
    return selectedType ? allArticles.filter(article => article.type_id === selectedType.type_id) : [];
  }, [typeName, allArticles, articleTypes]);

  return (
    <div className="m-8">
      <div className="flex flex-row space-x-4">
        {articleTypes.map((articleType: ArticleTypeInterface) => (
          <ArticleTypeButton
            key={articleType.type_id}
            articleType={articleType}
            type={typeName}
            setType={setTypeName}
          />
        ))}
      </div>
      
      <h1 className="text-4xl font-bold mt-8">{typeName}</h1>
      <ArticleList articles={filteredArticles} />
    </div>
  );
}
