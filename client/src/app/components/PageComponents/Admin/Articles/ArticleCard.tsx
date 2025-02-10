
// TODO: import ActionButton component
import { useState } from "react";
import { adjustDateLetters, adjustDateOnlyNumerical } from "../../../../_utils/dateUtils"
import Link from 'next/link';


export default function ArticleCard({ article } : { article: any }) {

    const [dateReadable ] = useState(adjustDateLetters(article.datePublished) || "");   
    const [contentReduced] = useState(article.content.substring(0, 54) || "Content not available");


    return (
        <Link href={`/admin/articles/${article.article_id}`}>
            <div className="flex flex-col p-4">
                {article ? (
                    <div>
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={article.imageURL || "/img_placeholder.png"} // Use the correct `imageURL` field
                                alt={article.title || "Placeholder image"} // Add a fallback for the `alt` attribute
                                className="h-32 object-cover w-full"
                                onError={(e) => (e.currentTarget.src = "/img_placeholder.png")} // Handle image loading errors
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{article.title}</h2>
                            <p className="text-sm text-gray-600">{dateReadable}</p>
                        </div>
                        
                        <p className="text-sm text-gray-600">{article.author}</p>        
                        <div className="flex flex-wrap relative">
                            <p className="text-sm text-gray-600">{`${contentReduced}...`}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 w-40 bg-gray-200 rounded-lg">
                        Article Data Not Available
                    </div>
                )}
            </div>
        </Link>
    );
}



