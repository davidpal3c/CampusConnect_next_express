"use client";
// TODO: import ActionButton component
import { useState, useEffect } from "react";
import { adjustDateLetters, adjustDateOnlyNumerical } from "@/app/_utils/dateUtils"
// import { adjustDateLetters, adjustDateOnlyNumerical } from "../../../../_utils/dateUtils"
import Link from 'next/link';


export default function EventCard({ event } : { event: any }) {

    const [dateReadable ] = useState(adjustDateLetters(event.date) || "");   
    // const [contentReduced] = useState(article.content.substring(0, 54) || "Content not available");

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;    
        }
    }

    const [eventTitleReduced] = useState(truncateText(event.title, 32) || "Title not available");
    const [eventAuthorReduced] = useState(truncateText(event.author, 25) || "Author not available");


    // useEffect(() => {
    //     if(article.imageUrl) {
    //         console.log("ArticleCard article", article);
    //     }
    // }, []);

    return (
        <Link href={`/admin/articles/${event.event_id}`}>
            <div className="flex flex-col p-4">
                {event ? (
                    <div>
                        <div className="rounded-lg overflow-hidden h-36">
                            <img
                                src={event.imageUrl ? event.imageUrl : "/img_placeholder.png"} // Use the correct `imageURL` field
                                alt={`${event.title}-image` || "Placeholder image"} // Add a fallback for the `alt` attribute
                                className="object-cover w-full h-full overflow-hidden"
                                onError={(e) => (e.currentTarget.src = "/img_placeholder.png")} // Handle image loading errors
                            />
                        </div>
                        <div className="flex flex-col h-16 ">
                            <div className="flex justify-between items-center mt-2">
                                <h2 className="text-lg font-bold flex flex-wrap">{eventTitleReduced}</h2>
                                <p className="text-sm text-gray-600">{dateReadable}</p>
                            </div>
                        </div>
   
                        <div className="flex flex-col justify-end mt-1">
                            <p className="text-sm text-gray-600 flex justify-start"><span className="font-semibold mr-4">Author:</span>{eventAuthorReduced}</p>        
                            <p className="text-sm text-gray-600 flex justify-start"><span className="font-semibold mr-4">Category:</span>{event.category}</p>        
                            {/* <div className="flex flex-wrap relative">
                                <p className="text-sm text-gray-600">{`${contentReduced}...`}</p>
                            </div> */}
                        </div>      
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 w-40 bg-gray-200 rounded-lg">
                        Event Data Not Available
                    </div>
                )}
            </div>
        </Link>
    );
}



