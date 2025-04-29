"use client";

import { useState, useEffect } from "react";
import { ArticleCard, ArticleFeaturedCard } from "./ArticleCard";
import { ArticleInterface } from "@/app/api/users/props";

export default function ArticleList({ articles }: { articles: ArticleInterface[] }) {

    const mostRecentArticle = articles.reduce((latest, article) =>
        new Date(article.created_at) > new Date(latest.created_at) ? article : latest,
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

