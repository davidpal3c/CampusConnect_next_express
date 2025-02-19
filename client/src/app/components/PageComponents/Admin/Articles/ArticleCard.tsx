
// TODO: import ActionButton component
import { useState } from "react";
import { adjustDateLetters, adjustDateOnlyNumerical } from "../../../../_utils/dateUtils"
import Link from 'next/link';


export default function ArticleCard({ article } : { article: any }) {

    const [dateReadable ] = useState(adjustDateLetters(article.datePublished) || "");   
    // const [contentReduced] = useState(article.content.substring(0, 54) || "Content not available");

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;    
        }
    }

    const [articleTitleReduced] = useState(truncateText(article.title, 32) || "Title not available");
    const [articleAuthorReduced] = useState(truncateText(article.author, 25) || "Author not available");

    // console.log(article);

    return (
        <Link href={`/admin/articles/${article.article_id}`}>
            <div className="flex flex-col p-4">
                {article ? (
                    <div>
                        <div className="rounded-lg overflow-hidden h-36">
                            <img
                                src={article.imageURL || "/img_placeholder.png"} // Use the correct `imageURL` field
                                alt={article.title || "Placeholder image"} // Add a fallback for the `alt` attribute
                                className="object-cover w-full"
                                onError={(e) => (e.currentTarget.src = "/img_placeholder.png")} // Handle image loading errors
                            />
                        </div>
                        <div className="flex flex-col h-16 ">
                            <div className="flex justify-between items-center mt-2">
                                <h2 className="text-lg font-bold flex flex-wrap">{articleTitleReduced}</h2>
                                <p className="text-sm text-gray-600">{dateReadable}</p>
                            </div>
                        </div>
   
                        <div className="flex flex-col justify-end mt-1">
                            <p className="text-sm text-gray-600 flex justify-start"><span className="font-semibold mr-4">Author:</span>{articleAuthorReduced}</p>        
                            <p className="text-sm text-gray-600 flex justify-start"><span className="font-semibold mr-4">Category:</span>{article.type}</p>        
                            {/* <div className="flex flex-wrap relative">
                                <p className="text-sm text-gray-600">{`${contentReduced}...`}</p>
                            </div> */}
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



