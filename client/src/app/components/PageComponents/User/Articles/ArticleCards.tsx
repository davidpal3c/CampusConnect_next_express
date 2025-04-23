"use client";

import { ArticleInterface } from "@/app/pages/user/props";
import Link from "next/link";

export function ArticleCard(props: ArticleInterface) {
    let { article_id, title, author, type_id, datePublished, imageUrl } = props;

  datePublished = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(
    new Date(datePublished)
  );

    return (  
        <div className="border-gray-100 rounded-2xl shadow-lg border-2 transition-transform transform hover:scale-[1.03] hover:shadow-xl overflow-hidden">
            <Link href={`/user/articles/${article_id}`} passHref>
                <img 
                    src={imageUrl || "/img_placeholder.png"}
                    alt="Article Image" 
                    className="w-full h-40 object-cover rounded-t-2xl transition-all hover:opacity-80"
                />
                <div className="p-4">
                    <div className="flex items-center mb-3">
                        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                        <span className="text-xs text-gray-500 ml-auto italic">{datePublished}</span>
                    </div>
                    <p className="text-sm text-gray-600">Author: <span className="font-medium">{author}</span></p>
                </div>
            </Link>    
        </div>
    );
}

export function ArticleFeaturedCard(props: ArticleInterface) {
    let { article_id, title, author, type, datePublished, imageUrl, content } = props;

    const wordCount = content.split(" ").length;
    const readingTime = Math.ceil(wordCount / 200);
    const formattedDate = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(new Date(datePublished));
    const shortContent = wordCount > 50 ? content.split(" ").slice(0, 50).join(" ") + "..." : content;

    return (
        <div className="w-full h-[500px] border-gray-100 hover:border-saitLighterBlue rounded-2xl shadow-lg border-2 overflow-hidden mb-8 transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
            <Link className="flex flex-col lg:flex-row h-full" href={`articles/${article_id}`} passHref>
                
                {/* Image with optional overlay */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
                    <img 
                        src={imageUrl || "/img_placeholder.png"} 
                        alt="Article Image" 
                        className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none transition-all hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex flex-col mb-4 gap-2">
                        <h2 className="lg:text-4xl text-2xl font-bold text-gray-900">{title}</h2>

                        {/* Badge and Meta Info */}
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="rounded-md text-white font-semibold italic bg-saitLighterBlue px-3 py-1">
                                Most Recent
                            </div>
                        </div>

                        {/* Author + Reading time */}
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-saitBlue text-white flex items-center justify-center font-semibold">
                                    {author[0]}
                                </div>
                                <span className="text-sm text-gray-700 italic">{author}</span>
                            </div>
                            <div className="text-right text-sm text-gray-500 italic">
                                <p>{formattedDate}</p>
                                <p>{readingTime} min read</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Preview - hide on small screens */}
                    <p className="text-gray-700 hidden lg:block">
                        {shortContent}
                    </p>

                    {/* Call to Action */}
                    <div className="mt-4">
                        <span className="text-saitBlue font-semibold hover:underline">Continue Reading →</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}


