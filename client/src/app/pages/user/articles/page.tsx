"use client";

import React, { useState, useEffect, useMemo } from "react";
import ArticleList from "@/app/components/PageComponents/User/Articles/ArticleList";
import { useArticlesContext } from "@/app/_utils/articles-context";
import ArticlesLayout from "./ArticlesLayout";
import { ArticleTypeInterface } from "../../../api/users/props";
import ArticleTypeButton from "@/app/components/PageComponents/User/Articles/ArticleTypeButton";

type TypesCount = {
  [key: string]: number;
};

const Articles = () => {
  const [typeName, setTypeName] = useState("All Articles");
  const { allArticles, articleTypes } = useArticlesContext();

  const [articleCounts, setArticleCounts] = useState<TypesCount>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allArticles.length > 0 && articleTypes.length > 0) {
      setArticleCounts(getArticleCountsByType(allArticles, articleTypes));
      setLoading(false);
    }
  }, [allArticles, articleTypes]);

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

  const filteredArticles = useMemo(() => {
    if (typeName === "All Articles") return allArticles;
    const selectedType = articleTypes.find((t) => t.name === typeName);
    return selectedType ? allArticles.filter(article => article.type_id === selectedType.type_id) : [];
  }, [typeName, allArticles, articleTypes]);

  const skeletonArray = Array(4).fill(null);

  return (
    <div className="m-8">
      {loading ? (
        <>
          <div className="flex flex-wrap gap-2 mb-8">
            {skeletonArray.map((_, i) => (
              <div key={i} className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
            ))}
          </div>

          <div className="mb-6 w-full h-[250px] bg-gray-200 rounded-xl animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skeletonArray.map((_, index) => (
              <div key={index} className="h-[220px] bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-8">
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

          <ArticleList articles={filteredArticles} />
        </>
      )}
    </div>
  );
};

const ArticlesPage = () => (
  <ArticlesLayout>
    <Articles />
  </ArticlesLayout>
);

export default ArticlesPage;
