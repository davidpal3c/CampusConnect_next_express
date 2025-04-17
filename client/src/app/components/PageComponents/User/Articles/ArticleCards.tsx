"use client";

import { ArticleInterface } from "@/app/pages/user/props";
import Link from "next/link";

export function ArticleCard(props: ArticleInterface) {
    let { article_id, title, author, type, datePublished, imageUrl } = props;

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

    datePublished = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(new Date(datePublished));

    return (  
        <div className="w-full h-[500px] border-gray-100 hover:border-saitLighterBlue rounded-2xl shadow-lg border-2 overflow-hidden mb-8 transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
            <Link className="flex flex-col lg:flex-row h-full" href={`articles/${article_id}`} passHref>
                <img 
                    src={imageUrl || "/img_placeholder.png"} 
                    alt="Article Image" 
                    className="w-full lg:w-1/2 h-64 lg:h-auto object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none transition-all hover:opacity-80"
                />
                
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex flex-col mb-4">
                        <h2 className="lg:text-4xl text-lg font-bold text-gray-900 mb-4">{title}</h2>
                        <div className="flex items-center mb-4">
                            <div className="flex items-center rounded-md text-white font-semibold italic bg-saitLighterBlue px-3 py-1">
                                Most Recent
                            </div>
                            
                            <div className="ml-auto text-right">
                                <p className="lg:text-sm text-gray-500 italic">{datePublished}</p>
                                <p className="lg:text-sm text-gray-500 italic">Author: <span className="font-medium">{author}</span></p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-700">
                        {content.split(" ").length > 50
                            ? content.split(" ").slice(0, 50).join(" ") + "..."
                            : content}
                    </p>
                </div>
            </Link>
        </div>
    );
}
