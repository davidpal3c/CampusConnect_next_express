"use client";

import React, { useState, useEffect, use } from "react";
import { fetchArticleById } from "../articles";

export default function ArticleContent({ params }) {
    const unwrappedParams = use(params); // Unwrap params
    const articleId = unwrappedParams?.id; // Safely access id

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!articleId) return;

        const getArticle = async () => {
            try {
                setLoading(true);
                const data = await fetchArticleById(articleId);
                if (data) {
                    setArticle(data);
                } else {
                    setError("Article not found");
                }
            } catch (err) {
                setError("Failed to fetch article");
            } finally {
                setLoading(false);
            }
        };

        getArticle();
    }, [articleId]);

    if (loading) return <p className="py-6 px-16">Loading...</p>;
    if (error) return <p className="py-6 px-16 text-red-500">{error}</p>;

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full overflow-hidden">
                {/* Article Image with Fallback */}
                <img 
                    src={article.imageUrl || "/img_placeholder.png"} 
                    alt={article.title} 
                    className="w-full h-64 object-cover"
                />

                <div className="p-8">
                    {/* Date */}
                    <p className="text-gray-500 text-sm">
                        {new Date(article.datePublished).toLocaleDateString()}
                    </p>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>

                    {/* Author */}
                    <p className="text-gray-700 mb-6">
                        by <span className="font-semibold">{article.author}</span>
                    </p>

                    {/* Content */}
                    <p className="text-gray-800 leading-relaxed">{article.content}</p>

                    {/* Tags and ID */}
                    <div className="mt-6 flex justify-between text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                            {article.type}
                        </span>
                        <span>Article ID: {article.article_id}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
