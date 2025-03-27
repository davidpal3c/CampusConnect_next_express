"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import ArticleList from "@/app/components/PageComponents/User/Articles/ArticleList";
import { useArticlesContext} from "@/app/_utils/articles-context";
import ArticlesLayout from "./ArticlesLayout";
import { ArticleTypeInterface} from "../props";
import ArticleTypeButton from "@/app/components/PageComponents/User/Articles/ArticleTypeButton";

type TypesCount = {
  [key: string]: number;
};

const Articles = () => {
  const searchParams = useSearchParams();
  const paramsType = searchParams.get("type");

  const [typeName, setTypeName] = useState(paramsType || "All Articles");
  const { allArticles, articleTypes } = useArticlesContext();

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

    return result;
  };

  useEffect(() => {
    setArticleCounts(getArticleCountsByType(allArticles, articleTypes));
  }, [allArticles, articleTypes]);


  // Filter articles based on selected type (computed on re-render)
  const filteredArticles = useMemo(() => {                                                               
    if (typeName === "All Articles") return allArticles;

    const selectedType = articleTypes.find((t) => t.name === typeName);
    return selectedType ? allArticles.filter(article => article.type_id === selectedType.type_id) : [];
  }, [typeName, allArticles, articleTypes]);

  return (
    <div className="m-8">
      <div className="flex flex-row space-x-4">
        <ArticleTypeButton articleType={{ type_id: 0, name: "All Articles" }} type={typeName} setType={setTypeName} />
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
};

const ArticlesPage = () => (
  <ArticlesLayout>
    <Articles />
  </ArticlesLayout>
);

export default ArticlesPage;
