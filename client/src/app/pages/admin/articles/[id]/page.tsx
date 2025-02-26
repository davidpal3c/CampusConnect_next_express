"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { containsHTML } from "@/app/_utils/text-service";

import { toast } from "react-toastify";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Tooltip } from '@mui/material';


export default function Article() {

    const [articleData, setArticleData] = useState([]);
    const router = useRouter();

    const params = useParams();
    const id = params?.id;

    const fetchArticleData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
            });

            const articleData = await response.json();

            if (!response.ok) {
                const errorData = articleData;
                toast.error(errorData.message || "An Error occurred fetching articles.");
                return;
            }
            // console.log(articleData);
            setArticleData(articleData);

        } catch (error) {
            console.error(error);
            toast.error("Unknown error occurred fetching articles! : " + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    useEffect(() => {
        fetchArticleData();
    }, []);

    return(
        <div className="p-4">
            <div className="flex justify-between items-center">
                <Tooltip title="Back to Articles" arrow>
                    <button onClick={() => router.push("/admin/articles")} className="flex items-center mb-6">
                        <ArrowBackIosRoundedIcon className="mr-4"/>
                    </button>
                </Tooltip>
                <h1>Edit, Share, Export to PDF</h1>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
                {articleData ? (
                    <div>
                        <h2>{articleData.title}</h2>
                        <p>{articleData.audience}</p>
                        <p>{articleData.status}</p>
                        <p>{articleData.type}</p>
                        <p>{articleData.author}</p>
                        <div className="w-1/2">
                            <img src={articleData?.imageUrl || null} alt={articleData.title} />
                        </div>
                        <p>{articleData.datePublished}</p>

                        {containsHTML(articleData.content) ? (
                            <div dangerouslySetInnerHTML={{__html: articleData.content}}></div>
                        ) : (
                            <p>{articleData.content}</p> 
                        )}
                        
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

            </div>
            {/* TODO: edit, share, delete buttons, article data analysis placeholder  */}
        </div>

        
    );
}