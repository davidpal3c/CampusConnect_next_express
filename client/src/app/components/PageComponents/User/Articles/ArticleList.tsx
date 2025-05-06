"use client";

import { ArticleCard, ArticleFeaturedCard } from "./ArticleCards";
import { Article } from "@/app/types/Article/articleTypes";

export default function ArticleList({ articles }: { articles: Article[] }) {

    const mostRecentArticle = articles.reduce((latest, article) =>
        new Date(article.datePublished ?? article.created_at) > new Date(latest.datePublished ?? latest.created_at)
          ? article
          : latest,
        articles[0]
      );
      

    return (
        <div className="py-6 space-y-8">
            <ArticleFeaturedCard {...mostRecentArticle} />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article.article_id} {...article} />
                ))}
            </div>
        </div>
    );
}

