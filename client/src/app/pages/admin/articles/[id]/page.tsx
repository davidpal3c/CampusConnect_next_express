"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { containsHTML } from "@/app/_utils/text-service";
import { formatToDateTime } from "@/app/_utils/dateUtils";
import OptionsButton from "@/app/components/Buttons/OptionsButton";
import Loader from "@/app/components/Loader/Loader";
import ArticleEditor from "@/app/components/PageComponents/Admin/Articles/ArticleEditor";
import ResourceShareModal from "@/app/components/PageComponents/Admin/ResourceShareModal";
import ArticleContent from "@/app/components/PageComponents/Admin/Articles/ArticleContent";

import DOMpurify from 'dompurify';
import { renderToString } from 'react-dom/server';
import parse from 'html-react-parser';
import domToReact from 'html-react-parser';
// dynamic imports : code splitting
// import dynamic from 'next/dynamic';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Tooltip } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';

// audience grouping dropdown
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { BsShare } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { Label } from "@radix-ui/react-select";

export default function Article() {

    // const ArticleEditor = dynamic(
    //     () => import('@/app/components/PageComponents/Admin/Articles/ArticleEditor'),
    //         { 
    //         loading: () => <Loader isLoading={true} />,
    //         ssr: false 
    //         }
    // );
      
    // const ResourceShareModal = dynamic(
    //     () => import('@/app/components/PageComponents/Admin/ResourceShareModal'),
    //     { 
    //         loading: () => <Loader isLoading={true} />,
    //         ssr: false 
    //     }
    // );

    const [articleData, setArticleData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditPanelVisible, setIsEditPanelVisible] = useState(false);

    const [articleUrl, setArticleUrl] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const articleEditorRef = useRef(null);

    // Edit Panel
    const handleOpenEditPanel = () => setIsEditPanelVisible(true);
    const handleCloseEditPanel = () => setIsEditPanelVisible(false);  

    // Share Modal
    const [openShareModal, setShareModal] = useState(false);
    const handleShareModalOpen = () => setShareModal(true);
    const handleShareModalClose = () => setShareModal(false);
    
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
    { title: "Edit", handler: () => handleOpenEditPanel(), icon: <EditOutlinedIcon style={{ color: "#005795", fontSize: 20}} /> },
    { title: "Share", handler: () => handleShareModalOpen(), icon: <BsShare style={{ color: "#005795", fontSize: 18}} /> },
    { title: "Export to PDF", handler: () => console.log("Export to PDF"), icon: <BsFiletypePdf style={{ color: "#005795", fontSize: 20}} /> },
    ]);

    const handleImageError = (e: any) => {
    // e.target.style.display = 'none';
        e.target.src = '/image_placeholder.png';
    };


    useEffect(() => {
        fetchArticleData();
    }, [id]);

    useEffect(() => {
        if (articleData) {
            setIsLoading(false);
            setArticleUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/user/articles/${id}`);
            setArticleTitle(articleData?.title);
        }

        // console.log("articleData: ", articleData);
    }, [articleData, id]);

    
    if (isLoading) {
        return <Loader isLoading={isLoading} />;
    }


    return(
        <div className="bg-saitWhite h-screen">
            {isLoading ? (
                <Loader isLoading={isLoading} />
            ) : (
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <Tooltip title="Back to Articles" arrow>
                            <IconButton onClick={() => router.push("/admin/articles")} className="flex items-center mb-6 hover:bg-opacity-10 hover:text-saitPurple">
                                <ArrowBackIosRoundedIcon />
                            </IconButton>
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
                                            <Image src="/avatar-generic.jpg" alt="article-author"
                                                className="object-contain mr-1" style={{ maxHeight: 60 }}
                                                width={60} 
                                                height={60}
                                                loading='lazy'
                                            >
                                            </Image>
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


                                    {articleData?.imageUrl && (
                                        <div className="w-full flex max-w-full h-auto object-contain mb-4 mt-6">
                                            <Image src={articleData.imageUrl} alt={articleData.title} 
                                                style={{ maxHeight: "400px"}} className="w-10/12 h-96 object-cover rounded-md"    
                                                loading='lazy'
                                                width={800}
                                                height={400}
                                            />
                                        </div>
                                    )}

                                    {containsHTML(articleData.content) ? (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(articleData.content) }}
                                            onError={(e) => handleImageError(e)}
                                        /> 
                                        // <ArticleContent content={articleData.content} />
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
                                <p className="font-semibold">Read Time</p>
                                <p className="font-semibold">Readability</p>
                                <p className="font-semibold">SEO Score</p>
                                <p className="font-semibold">Word Count</p>

                                <p className="font-semibold">Article Tags:</p>
                                <p className="font-thin">{articleData?.tags || ""}</p>
                                
                                <div className="flex flex-col my-4">
                                    <p className="font-semibold">Article Audience: </p>
                                    <InputLabel htmlFor="grouped-native-select">Select Audience</InputLabel>
                                    <Select native id="grouped-native-select" 
                                        className="mt-2" style={{ width: "100%" }}
                                    >
                                        <option aria-label="None" value="" />
                                        {articleData?.audience.userTypes && articleData?.audience.userTypes.length > 0 && (
                                            <optgroup label='User Types'>
                                                {articleData?.audience.userTypes.map((userType: any, index: number) => (
                                                    <option key={`userType.id-${index}`} value={userType}>{userType}</option>
                                                ))}
                                            </optgroup>
                                        )}
                                        {articleData?.audience.programs && articleData?.audience.programs.length > 0 && (
                                            <optgroup key='programs' label='Programs'>
                                                {articleData?.audience.programs.map((p: any) => (
                                                    <option key={p.program_id} value={p.program_id}>{p.name}</option>
                                                ))}
                                            </optgroup>
                                        )}
                                        {articleData?.audience.departments && articleData?.audience.departments.length > 0 && (
                                            <optgroup key='department' label="Departments">
                                                {articleData?.audience.departments.map((d: any) => (
                                                    <option key={d.department_id} value={d.department_id}>{d.name}</option>
                                                ))}
                                            </optgroup>
                                        )}
                                    </Select>
                                </div>


                                <div className="flex justify-center items-center">
                                    <button className="flex flex-wrap w-64 justify-center items-center border border-saitBlue rounded-full p-2 mt-4">
                                        <p className="font-semibold">Preview as User</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    {/* Create Article Panel */}
                    <AnimatePresence>
                        {isEditPanelVisible &&
                            <motion.div
                            ref={articleEditorRef}
                            initial={{ x: "100vh" }}
                            animate={{ x: 0 }}                                                        //final state of animation
                            exit={{ x: "100vh" }}                                                      // exit animation
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            // transition={{ type: "easing", stiffness: 150, damping: 40 }}
                            className="absolute top-0 right-0 h-full w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50"
                            >
                            <div className="">
                                <ArticleEditor closeOnClick={handleCloseEditPanel} action={'Edit'} 
                                closeArticleEditor={handleCloseEditPanel} articleObject={articleData} reFetchArticles={fetchArticleData} />
                            </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                    {articleUrl && (
                        <ResourceShareModal
                            resourceUrl={articleUrl} 
                            title={`${articleTitle}-SAIT`}
                            openShareModal={openShareModal}
                            handleShareModalOpen={handleShareModalOpen}
                            handleShareModalClose={handleShareModalClose}
                        />
                    )}
                </div>
            )};
        </div>
    );
}