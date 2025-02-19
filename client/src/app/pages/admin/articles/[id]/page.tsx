"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";



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
            <Tooltip title="Back to Articles" arrow>
                <button onClick={() => router.push("/admin/articles")} className="flex items-center mb-6">
                    <ArrowBackIosRoundedIcon className="mr-4"/>
                </button>
            </Tooltip>

            <h1>Article Page</h1>
            <div>
                {articleData ? (
                    <div>
                        <img src={articleData.imageURL} alt={articleData.title} />
                        <h2>{articleData.title}</h2>
                        <p>{articleData.content}</p>
                        
                        <p>{articleData.audience}</p>
                        <p>{articleData.status}</p>
                        <p>{articleData.type}</p>
                        <p>{articleData.author}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

            </div>
            {/* TODO: edit, share, delete buttons, article data analysis placeholder  */}
        </div>

        
    );
}