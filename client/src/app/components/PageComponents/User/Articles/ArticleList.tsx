"use client";

import { useState, useEffect } from "react";
import { ArticleCard, ArticleFeaturedCard } from "./ArticleCards";
import { ArticleInterface } from "@/app/pages/user/props";
import Loader from "@/app/components/Loader/Loader";

export default function ArticleList({ articles }: { articles: ArticleInterface[] }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (articles.length > 0) {
            setLoading(false); // Stop loading when articles are available
        }
    }, [articles]);

    if (loading) {
        return <Loader isLoading={loading} />;
    }

    const mostRecentArticle = articles.reduce((latest, article) => 
        new Date(article.created_at) > new Date(latest.created_at) ? article : latest, articles[0]);

    console.log("Most recent article:", mostRecentArticle);

    return (
        <div className="py-6">
            <ArticleFeaturedCard {...mostRecentArticle} />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                    <ArticleCard key={article.article_id} {...article} />
                ))}
            </div>
        </div>
    );
}
