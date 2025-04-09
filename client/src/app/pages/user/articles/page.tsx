"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import ArticleList from "@/app/components/PageComponents/User/Articles/ArticleList";
import { fetchArticleTypes, fetchAllArticles } from "../articles/articles";
import { ArticleTypeInterface} from "../props";
import ArticleTypeButton from "@/app/components/PageComponents/User/Articles/ArticleTypeButton";

type TypesCount = {
  [key: string]: number;
};

export default function Articles() {
  const searchParams = useSearchParams();
  const paramsType = searchParams.get("type");

  const [typeName, setTypeName] = useState(paramsType || "All");
  const [articleTypes, setArticleTypes] = useState([]);
  const [allArticles, setAllArticles] = useState([]); 

  const [articleCounts, setArticleCounts] = useState<TypesCount>({});

  const getArticleCountsByType = (allArticles: any, articleTypes: any) => {
    const countsByType = new Map();

    articleTypes.forEach((type: any) => {                                       
        countsByType.set(type.type_id, 0);
    });

    allArticles.forEach((article: any) => {
        const typeId = article.type_id;
        if (countsByType.has(typeId)) {
            countsByType.set(typeId, countsByType.get(typeId) + 1);
        }
    });

    const result: TypesCount = {};
    countsByType.forEach((count, typeId) => {
        result[typeId] = count;
    });

    // console.log(">>>> result: ", result);
    return result;
  };

  useEffect(() => {
    setArticleCounts(getArticleCountsByType(allArticles, articleTypes));
  }, [allArticles, articleTypes]);

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
  const filteredArticles = useMemo(() => {                                                                //useMemo is used to memoize the result of a function. Memoize is
    if (typeName === "All") return allArticles;
    const selectedType: any = articleTypes.find((t: any) => t.name === typeName);
    return selectedType ? allArticles.filter((article: any) => article.type_id === selectedType.type_id) : [];
  }, [typeName, allArticles, articleTypes]);

  return (
    <div className="m-8">
      <div className="flex flex-row space-x-4">
        {articleTypes.map((articleType: ArticleTypeInterface) => (
          articleCounts[articleType.type_id] > 0 && (
            <ArticleTypeButton
              key={articleType.type_id}
              articleType={articleType}
              type={typeName}
              setType={setTypeName}
            />
          )
        ))}
      </div>
      
      <h1 className="text-4xl font-bold mt-8">{typeName}</h1>
      <ArticleList articles={filteredArticles} />
    </div>
  );
}
