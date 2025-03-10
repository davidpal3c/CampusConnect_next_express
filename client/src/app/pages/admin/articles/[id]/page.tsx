"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { containsHTML } from "@/app/_utils/text-service";
import { formatToDateTime } from "@/app/_utils/dateUtils";
import OptionsButton from "@/app/components/Buttons/OptionsButton";
import { toast } from "react-toastify";

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Tooltip } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { BsShare } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";

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

    const [articleOptionHandlers] = useState([
    { title: "Edit", handler: () => console.log("Articles Data Analytics"), icon: <EditOutlinedIcon style={{ color: "#005795", fontSize: 20}} /> },
    { title: "Share", handler: () => console.log("Export to Excel"), icon: <BsShare style={{ color: "#005795", fontSize: 18}} /> },
    { title: "Export to PDF", handler: () => console.log("Export to PDF"), icon: <BsFiletypePdf style={{ color: "#005795", fontSize: 20}} /> },
    ]);

    useEffect(() => {
        fetchArticleData();
    }, []);

    // useEffect(() => {
    //     console.log("Article Data: ", articleData)
    // }, [articleData])

    return(
        <div className="p-4">
            <div className="flex justify-between items-center">
                <Tooltip title="Back to Articles" arrow>
                    <button onClick={() => router.push("/admin/articles")} className="flex items-center mb-6">
                        <ArrowBackIosRoundedIcon className="mr-4"/>
                    </button>
                </Tooltip>
            </div>
            
            <div className="flex flex-row justify-center space-x-4 w-full">
                <div className="bg-white p-7 rounded-lg shadow-md w-11/12">
                    {articleData ? (
                        <div>
                            <div className="flex justify-between items-center">
                                <h2 className="flex flex-wrap font-bold text-2xl mt-4 w-full">{articleData.title}</h2>
                                <OptionsButton icon={<MoreVertRoundedIcon />} optionHandler={articleOptionHandlers}/>           
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center flex-row">
                                    <img src="/avatar-generic.jpg" alt="article-author"
                                        className="object-contain mr-1" style={{ maxHeight: 60 }}></img>
                                    <div className="-space-y-1">
                                        <p className="text-lg">{articleData.author}</p>
                                        <p className="text-saitGray ">{formatToDateTime(articleData.datePublished)}</p>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="flex flex-col mb-4 mt-4 -space-y-1">
                                {articleData.status === "Published" ? 
                                    (<p className="font-semibold text-lg">Status:<span className="text-saitBlue font-semibold font-serif text-md"> {articleData.status}</span></p>)
                                    : (<p className="font-semibold text-lg">Status:<span className="text-saitPurple font-semibold"> {articleData.status}</span></p>)}
                                <p className="font-semibold text-lg">Article Type: <span className="font-normal font-serif text-md">{articleData.type?.name || ""} </span></p>
                            </div>

                            <div className="w-full flex max-w-full h-auto object-contain mb-4 mt-6">
                                <img src={articleData?.imageUrl || null} alt={articleData.title} 
                                    style={{ maxHeight: "400px"}} className="w-10/12 h-96 object-cover rounded-md"    
                                />
                                {/* <caption></caption> */}
                            </div>
                            

                            {containsHTML(articleData.content) ? (
                                <div dangerouslySetInnerHTML={{__html: articleData.content}}></div>
                            ) : (
                                <div className="mt-8">                                    
                                    <p className="flex justify-center items-center">{articleData.content}</p> 
                                </div>
                            )}
                            
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="bg-white p-4 pt-8 rounded-lg shadow-md w-4/12">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="font-bold text-xl">Article Analysis</h2>

                        <button className="w-full h-96">
                            <img src="/article-analysis.png" alt="article-analysis"
                                className="w-full h-full object-contain" style={{ minHeight: 100 }} ></img>
                        </button>
                    </div>
                    <div className="mt-10 flex flex-col">
                        <p>Article Audience: {articleData.audience}</p>
                        <p className="font-semibold">Read Time</p>
                        <p className="font-semibold">Readability</p>
                        <p className="font-semibold">SEO Score</p>
                        <p className="font-semibold">Word Count</p>
                        <p className="font-semibold">Article Tags:</p>
                        <p className="font-thin">{articleData.tags}</p>
                        
                        <div className="flex justify-center items-center">
                            <button className="flex flex-wrap w-64 justify-center items-center border border-saitBlue rounded-full p-2 mt-4">
                                <p className="font-semibold">Preview as User</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* TODO: edit, share, delete buttons, article data analysis placeholder  */}
        </div>

        
    );
}