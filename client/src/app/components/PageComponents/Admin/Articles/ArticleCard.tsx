"use client";
import { useState, useEffect, MutableRefObject } from "react";
import { adjustDateLetters, adjustDateOnlyNumerical } from "@/app/_utils/dateUtils"
import Link from 'next/link';
import Image from 'next/image';
import { useLazyLoad } from "@/app/hooks/useLazyLoad";


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

    const [articleTitleReduced] = useState(truncateText(article.title, 36) || "Title not available");
    const [articleAuthorReduced] = useState(truncateText(article.author, 25) || "Author not available");
    const [ref, isVisible] = useLazyLoad(); 

    return (
        <Link href={`/admin/articles/${article.article_id}`}>
            <div className="flex flex-col p-4">
                {article ? (
                    <div>
                        <div className="rounded-lg overflow-hidden h-36">
                            <Image
                                ref={ref as MutableRefObject<HTMLImageElement | null>}
                                src={isVisible ? (article.imageUrl ? article.imageUrl : "/img_placeholder.png") : "/img_placeholder.png"}
                                alt={`${article.title}-image` || "Placeholder image"}
                                className="object-cover w-full h-full overflow-hidden"
                                width={300}
                                height={150}
                                loading='lazy'
                                onError={(e) => (e.currentTarget.src = "/img_placeholder.png")}
                            />
                            {/* <img
                                src={article.imageUrl ? article.imageUrl : "/img_placeholder.png"}
                                alt={`${article.title}-image` || "Placeholder image"} 
                                className="object-cover w-full h-full overflow-hidden"
                                onError={(e) => (e.currentTarget.src = "/img_placeholder.png")} 
                                loading="lazy"
                            /> */}
                        </div>
                        <div className="flex flex-col h-16 ">
                            <div className="flex justify-between items-center mt-2">
                                <h2 className="text-lg font-bold flex flex-wrap">{articleTitleReduced}</h2>
                                <p className="text-sm text-gray-600">{dateReadable}</p>
                            </div>
                        </div>
   
                        <div className="flex flex-col justify-end mt-1">
                            <p className="text-sm text-gray-600 flex justify-start"><span className="font-semibold mr-4">Author:</span>{articleAuthorReduced}</p>        
                            <p className="text-sm text-gray-600 flex justify-start"><span className="font-semibold mr-4">Category:</span>{article.type.name}</p>        
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



