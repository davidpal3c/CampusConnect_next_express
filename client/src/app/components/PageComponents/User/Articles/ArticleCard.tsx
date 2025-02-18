"use client";

import Link from "next/link";


export default function ArticleCard(props) {
    let {id, title, author, type, datePublished, imageUrl} = props;

    datePublished = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(new Date(datePublished))

      return (  
        <div className="w-96 border-gray-100 rounded-2xl shadow-lg border-2">
            <Link href={`articles/${id}`} passHref>
                <img src={imageUrl || "/img_placeholder.png"}
                    alt="Article Image" 
                    className="w-full h-40 object-cover rounded-t-2xl" />
                <div className="p-4">
                    <div className="flex items-center mb-4">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <span className="text-sm text-gray-500 ml-auto italic">{datePublished}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Author: {author}</p>
                </div>
            </Link>    
        </div>
      );
}