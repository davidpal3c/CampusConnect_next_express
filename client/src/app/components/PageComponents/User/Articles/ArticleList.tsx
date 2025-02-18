"use client";

import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
    return (
        <div className="py-6 px-16">
            <div 
                className="grid gap-6"
                style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`
                }}
            >
                {articles.map((article, index) => (
                <div key={index} className="flex">
                    <ArticleCard
                    id={article.article_id}
                    title={article.title}
                    author={article.author}
                    type={article.type}
                    datePublished={article.datePublished}
                    imageUrl={article.imageUrl}
                    />
                </div>
                ))}
            </div>
        </div>
  );
}