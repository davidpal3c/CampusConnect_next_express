"use client"

import React, { useState, useEffect, useRef } from 'react';
import useAsyncState from '@/app/hooks/useAsyncState';
import { useForm } from "react-hook-form";
import { compressImage } from '@/app/_utils/image-service';
import ActionButton from "@/app/components/Buttons/ActionButton";
import { getTodayDate, formatToDateOnly } from "@/app/_utils/dateUtils";
import { useUserData } from '@/app/_utils/userData-context';
import { useArticleTypes } from "@/app/_utils/articleTypes-context";
import ArticleDeleteModal from './Modals/ArticleDeleteModal';
import RichTextEditor from './RichTextEditor';
import AudienceSelectionModal from '@/app/components/PageComponents/Admin/Articles/AudienceSelectionModal';
import CriteriaAccordion from './CriteriaAccordion';
import { uploadImage } from '@/app/api/upload-image'
import { toast } from "react-toastify";
import { UserData } from '@/app/types/userTypes';
//mui
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';

type CreateArticleProps = { 
    closeOnClick?: any,
    action: string,
    articleObject?: any,
    closeArticleEditor: any,
    reFetchArticles?: any,
};


const ArticleEditor: React.FC<CreateArticleProps> = ({ closeOnClick, action, articleObject, closeArticleEditor, reFetchArticles }) => {

    const { articleTypesData } = useArticleTypes();

    const { userData }: { userData: UserData } = useUserData();
    const [ userFullName, setUserFullName ] = useState("");
    const [contentMode, setContentMode] = useState("simplified");   
    const [articleContent, setArticleContent] = useState("");
    const [articleTypes, setArticleTypes] = useState<string[]>([]);

    useEffect(() => {
        if(articleTypesData) setArticleTypes(articleTypesData.map((type: any) => type.name));
    }, [articleTypesData]);

    // image upload
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [backdrop, setBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);

    // loader functions
    const handleLoaderOpen = () => {
        setBackdrop(true);
        setLoading(true);
    }
    const handleLoaderClose = () => {
        setBackdrop(false);
        setLoading(false);
        closeArticleEditor();
    }

    // Delete Modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    // Audience Modal
    const [openAudienceSelectionModal, setOpenAudienceSelectionModal] = useState(false);
    const handleAudienceSelectionOpen = () => setOpenAudienceSelectionModal(true);

    // Audience Criteria
    const [audienceCriteria, setAudienceCriteria] = useState({});
    // const [audienceCriteria, setAudienceCriteria] = useAsyncState<Record<string, any>>({});  
    const [showAccordion, setShowAccordion] = useState(false);

    const saveAudienceCriteria = async (audienceCriteria: any) => {
        setShowAccordion(false);                                             // disable accordion while updating
        setAudienceCriteria((prev) => ({...prev, ...audienceCriteria}));                                   
        setTimeout(() => setShowAccordion(true), 0);                                       
    }

    const toggleContentMode = () => {
        setContentMode(contentMode === "simplified" ? "richText" : "simplified");
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: "",
            datePublished: getTodayDate(),
            type: "",
            audience: "",
            tags: "",
            content: "",
            author: userFullName,
            status: "",
            imageUrl: "",  
        },
    });
    

    useEffect(() => {
        if (action === "Edit" && articleObject) {
            reset({
                title: articleObject.title || "",
                datePublished: formatToDateOnly(articleObject.datePublished) || getTodayDate(),
                type: articleObject.type.name || "",
                audience: articleObject.audience || "All",
                tags: articleObject.tags || "",
                content: articleObject.content || "",
                author: articleObject.author || userFullName,
                status: articleObject.status || "",
                imageUrl: articleObject.imageUrl || "",
            });

            setPreviewUrl(articleObject.imageUrl || null);
            setArticleContent(articleObject.content || "");
        }
    }, [action, articleObject, reset, userFullName]);

    // sets preview image
    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.size > 5 * 1024 * 1024 * 4) {    
            toast.error("File size must not exceed 20 MB");
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    // removes preview image
    const handleRemoveImage = () => {   
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        
        if (articleObject) {
            articleObject.imageUrl = null;
        } 
        reset({ ...articleObject, imageUrl: null });
    }

    const submitForm = async (data: any, type:  "publish" | "save-preview" | "update" ) => {
        handleLoaderOpen();

        const authorName = data.author.trim() || userFullName;
        const selectedDate = data.datePublished || getTodayDate();
        const formattedDate = new Date(selectedDate).toISOString();
        const content = contentMode === "richText" ? articleContent : data.content;

        let imageUrl = data.imageUrl;
        // let compressedBlob;

        if (data.imageUrl && data.imageUrl[0] instanceof File) {                                        //only runs if a new image is uploaded
            
            try {
                
                const compressedBlob = await compressImage(data.imageUrl[0], { maxDimension: 1024, quality: 0.7 });

                const compressedFile = new File(
                    [compressedBlob as Blob],
                    `${data.imageUrl[0].name}-compressed`,                                                              // retain original file name (or modify if desired)
                    { type: "image/jpeg" }
                );

                imageUrl = await uploadImage(compressedFile);

                if (!imageUrl) {
                    toast.error('Failed to upload image. creating article without image. Please contact support.');
                    return; 
                }
    
                if (typeof imageUrl === 'object' && imageUrl.error) {
                    toast.error(imageUrl.error || 'Failed to upload image. creating article without image. Please contact support.');
                    return;  
                }
                // toast.success('Image compressed and uploaded successfully');

            } catch (error) {
                console.log("Error uploading image: ", error);
                toast.error('An error occurred while compressing the image');
                return; 
            }
        }

        const type_id = articleTypesData.find((type: any) => type.name === data.type)?.type_id;         //returns object with type_id matching selected type

        const articleData = {
            title: data.title,
            datePublished: formattedDate,
            type_id: type_id,
            audience: audienceCriteria || "All",
            tags: data.tags,
            content: content,
            status: type === "update" ? data.status : type === "publish" ? "Published" : "Draft",
            author: authorName,
            imageUrl: imageUrl,
        }

        // console.log("Entered Article Data: ", articleData);

        if (action === "Create") {
            processCreateArticle(articleData);
        } else {
            processUpdateArticle(articleData);
        }

        handleLoaderClose();
    }

    async function processCreateArticle(articleData: any) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(articleData),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorData = data;
                toast.error(errorData.message || "An Error occurred creating article.");
                return;
            }

            toast.success(data.message);
            reFetchArticles();

        } catch (error) {
            console.log("Error: ", error);  
            
            toast.error(`Unknown error occurred ${action === "Create" ? "creating" : "updating"} article! : ` + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }         
    }

    const processUpdateArticle = async (articleData: any) => {
        try {
            const articleId = articleObject.article_id;

            if (!articleId) {
                console.log("Article ID not found. Please refresh the page and try again.");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${articleId}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(articleData),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorData = data;
                toast.error(errorData.message || "An Error occurred updating article.");
                return;
            }

            toast.success(data.message);
            reFetchArticles();

        } catch (error) {
            toast.error(`Unknown error occurred ${action === "Create" ? "creating" : "updating"} article! : ` + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        } 
    };

    const handleDelete = () => {
        handleDeleteModalOpen();        
    };

    // if (type === "save-preview") {
    //     router.push(`/articles/preview?data=${encodeURIComponent(JSON.stringify(articleData))}`);
    // }

    useEffect(() => {
        setUserFullName(`${userData?.first_name || ""} ${userData?.last_name || ""}`.trim());
    }, []);

    useEffect(() => {
        setShowAccordion(false);                                             
        // setAudienceCriteria(articleObject?.audience || {});
        setAudienceCriteria((prev) => ({...prev, ...articleObject?.audience || {}}));                                   
        setTimeout(() => setShowAccordion(true), 0);       
    }, [articleObject]);

    // useEffect(() => {
    //     // console.log("Article Object: ", articleObject);
    //     console.log("Audience Criteria: ", audienceCriteria);   
    // }, [audienceCriteria]);

    return(
        <main className="h-full w-full">
            <header className="flex justify-between items-center bg-white p-5 rounded-lg mb-6 shadow-md">
                {action === "Create" ? 
                    <h1 className="font-semibold">Create Article</h1> 
                    : <h1 className="font-semibold">Edit Article</h1>
                }
                <Tooltip title="Close Editor" arrow>       
                    <IconButton onClick={closeOnClick} >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </header>
            <section className="relative flex items-center bg-white p-4 rounded-lg mb-6 shadow-md">
                {/* <form onSubmit={handleSubmit(action === "Create" ? handleCreate : handleUpdate) } className="flex flex-row flex-wrap w-full"> */}
                <form onSubmit={handleSubmit((data: any) => submitForm(data, "publish"))} className="flex flex-row flex-wrap w-full">
                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">

                        {/* title */}
                        <div>
                            <label className={formStyling.labelStyling} htmlFor="title">Title</label>
                            <input className={formStyling.inputStyling} type="text" id="title" placeholder="Enter Title"    
                                {...register("title", { 
                                    required: 'Title is Required',
                                    maxLength: { value: 100, message: 'Title should not exceed 100 characters' }
                                })}
                            />
                            {errors.title && <p className={formStyling.errorStyle}>{errors.title.message}</p>}    
                        </div>
                    
                        {/* thumbnail upload */}
                        <div className="flex flex-row items-center justify-between">
                        <div className="w-72">
                            <label className={formStyling.labelStyling} htmlFor="imageUrl">Thumbnail</label>
                            <input
                                className={formStyling.inputStyling}
                                type="file"
                                id="imageUrl"
                                {...register('imageUrl', {
                                    required: false,
                                    validate: {
                                    isImage: (value: any) => {
                                        if (!value || value.length === 0 || typeof value === 'string') return true;
                                        
                                        const file = value[0];
                                        // if (!file) return false;
                                        return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type) || 'Only image files (jpeg, png, gif) are allowed';
                                    },
                                    isSizeValid: (value: any) => {
                                        if (!value || typeof value === 'string') return true;

                                        const file = value[0];
                                         // if (!file) return 'Please select a file';
                                        return file.size <= 5 * 1024 * 1024 * 4 || 'File size must not exceed 20MB';
                                    },
                                    },
                                })}
                                ref={(e) => {
                                    register('imageUrl').ref(e);                    // assign ref from react-hook-form
                                    fileInputRef.current = e;                       // assign custom ref
                                }}
                                onChange={(event) => {
                                    handleImageFileChange(event);                   // Call your custom onChange handler
                                    register('imageUrl').onChange(event);           // Call the default onChange handler from react-hook-form
                                }}
                            />
                            {errors.imageUrl && <p className={formStyling.errorStyle}>{errors.imageUrl.message}</p>}
                        </div>
                            <div className="mr-8 p-2">
                                {previewUrl && (
                                    <div className="flex flex-col items-center">
                                        <img src={previewUrl} 
                                        alt="thumbnail" 
                                        className="w-14 h-14 object-cover rounded-lg" />
                                        <IconButton onClick={() => handleRemoveImage()} size="small">
                                            <CloseRoundedIcon /> 
                                            <p className="text-sm">Remove</p>
                                        </IconButton>
                                    </div>    
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 ">
                            {/* date, type */}
                            <div>
                                <label className={formStyling.labelStyling} htmlFor="datePublished">Date Published</label>
                                {/* default to current date */}
                                <input className={formStyling.inputStyling} type="date" id="datePublished" min={getTodayDate()} 
                                {...register("datePublished")}
                                // defaultValue={articleObject?.datePublished || getTodayDate()}
                                />
                            </div>

                            {/* article type */}
                            <div>
                                <label className={formStyling.labelStyling} htmlFor="Type">Type</label>
                                {/* fetch available article categories from db */}
                                <select className={formStyling.inputStyling} id="Type"
                                    {...register("type", { required: 'Type is Required' })}
                                >
                                    {articleTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}       
                                </select>
                                {errors.type && <p className={formStyling.errorStyle}>{errors.type.message}</p>}
                            </div>
                        </div>
                        

                        {/* author name */}
                        {action === "Create" ? (
                            <div>
                                <label className={formStyling.labelStyling} htmlFor="author">Author <span className="text-saitRed text-xs italic">(*defaults to user)</span></label>
                                <input className={formStyling.inputStyling} type="text" id="author" placeholder={userFullName || "Enter Author's Name" }
                                    {...register("author", {
                                        required: false,
                                        pattern: {
                                            value: /^[a-zA-Z\s]*$/,
                                            message: "Author name should only contain letters and spaces",
                                        }
                                    })}
                                />
                                {errors.author && (<p className={formStyling.errorStyle}>{errors.author.message}</p>)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={formStyling.labelStyling} htmlFor="author">Author</label>
                                    <input className={formStyling.inputStyling} type="text" id="author" placeholder={articleObject.author || "Enter Author's Name" }
                                        {...register("author", {
                                            required: false,
                                            pattern: {
                                                value: /^[a-zA-Z\s]*$/,
                                                message: "Author name should only contain letters and spaces",
                                            }
                                        })}
                                    />
                                    {errors.author && (<p className={formStyling.errorStyle}>{errors.author.message}</p>)}
                                </div>
                                <div>
                                    <label className={formStyling.labelStyling} htmlFor="status">Status</label>
                                    <select className={formStyling.inputStyling} id="status"
                                        {...register("status", { required: 'Status is Required' })}
                                    >
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                    </select>
                                    {errors.status && <p className={formStyling.errorStyle}>{errors.status.message}</p>}
                                </div>
                            </div>    
                        )}

                        {/* audience and tags */}
                        <div>
                            <label className={formStyling.labelStyling} htmlFor="Audience">Audience <span className="text-saitRed text-xs italic">(*defaults to 'All')</span></label>
                            <div className="flex items-center justify-center gap-2 relative mt-[0.27rem]"> {/* Use flexbox to align items horizontally */}
                                {/* {audienceCriteria.length > 0 ? (
                                
                                ) : (
                                )} */}
                                
                                {/* <CriteriaAccordion criteria={audienceCriteria} />  */}
                                {showAccordion ? (
                                    <div className="flex w-full items-center justify-center gap-2">                                       
                                        <Tooltip title="Select Audience" arrow>
                                            <div>
                                                <ActionButton onClick={handleAudienceSelectionOpen} type="button" icon={<PersonSearchRoundedIcon sx={{ fontSize: 23 }}/>}
                                                    bgColor="bg-saitWhite" textColor="text-saitBlue" borderColor="border-saitBlue" 
                                                    hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"
                                                />
                                            </div>
                                        </Tooltip>
                                        <div className="relative w-full mb-10">
                                            <CriteriaAccordion criteria={audienceCriteria} /> 
                                        </div>  
                                    </div>
                                ) : (
                                    <div className="flex w-full items-center justify-center gap-2 relative -mt-1"> {/* Use flexbox to align items horizontally */}
                                        <Tooltip title="Select Audience" arrow>
                                            <div className="mt-1">
                                                <ActionButton onClick={handleAudienceSelectionOpen} type="button" icon={<PersonSearchRoundedIcon sx={{ fontSize: 23 }}/>}
                                                    bgColor="bg-saitWhite" textColor="text-saitBlue" borderColor="border-saitBlue" 
                                                    hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"
                                                />
                                            </div>
                                        </Tooltip>
                                        <input
                                        className={audienceInput} 
                                        type="text" 
                                        placeholder="Select Audience"
                                        readOnly 
                                        {...register("audience", { required: false })}
                                        />
                                    </div>
                                )}
                                
                            </div>
                                                        
                            {/* {errors.audience && <p className={formStyling.errorStyle}>{errors.audience.message}</p>} */}
                        </div>
                        <div>
                            <label className={formStyling.labelStyling} htmlFor="tags">Tags</label>
                            <input className={`${formStyling.inputStyling} h-[3.4rem]`} type="text" id="tags" placeholder="Enter Tags"
                                {...register("tags", { required: false })}
                            />
                            {errors.tags && <p className={formStyling.errorStyle}>{errors.tags.message}</p>}
                        </div>
                    </div>

                    {/* toggle content editor: simplified and richText*/}
                    {contentMode === "richText" ? (            
                        <div className="w-full mt-6 mb-6">
                            <div className="flex justify-end w-full">
                                <button onClick={toggleContentMode} className="text-saitBlue mb-2"> Switch to Simple Text Editor
                                </button>
                            </div>
                            <RichTextEditor article={articleObject} setContent={setArticleContent} />
                            {/* {action === "Create" ? (
                                <RichTextEditor setContent={setArticleContent} />
                            ) : (
                                <RichTextEditor article={articleObject} setContent={setArticleContent} />
                            )}                */}
                        </div>
                    ) : (
                        <div className="w-full mt-6">
                            <div className="flex justify-between">
                                <label className={formStyling.labelStyling} htmlFor="content">Content</label>
                                <button onClick={toggleContentMode} className="text-saitBlue">Switch to Rich Text Editor
                                </button>
                            </div>

                            <textarea className={formStyling.inputStyling} id="content" cols={200} rows={10}
                                {...register("content", { 
                                    required: 'Content is Required',
                                    // maxLength: { value: 15000, message: 'Content should not exceed 15000 characters' }
                                })}
                            />
                            {errors.content && <p className={formStyling.errorStyle}>{errors.content.message}</p>}
                            
                        </div>                            
                    )}

                    {action === "Create" ? (
                        <div className="flex flex-row items-center justify-between w-full space-x-5">
                            <ActionButton title="Publish" onClick={handleSubmit((data: any) => submitForm(data, "publish"))}    
                            textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite" />

                            <Tooltip title="Save as Draft" arrow>
                                <div>
                                    <ActionButton title="Save & Preview" onClick={handleSubmit((data: any) => submitForm(data, "save-preview"))}
                                        textColor="text-saitDarkRed" borderColor="border-saitDarkRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>  
                                </div>
                            </Tooltip>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-between w-full ">
                            <div className=""></div>

                            <div className="flex flex-row items-center space-x-4">
                                <ActionButton title="Submit Update" onClick={handleSubmit((data: any) => submitForm(data, "update"))}
                                    textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"/>                            
                                <ActionButton title="Cancel" onClick={closeOnClick} type="button"       // type button to prevent form submission
                                    textColor="text-slate-800" borderColor="border-slate-800" hoverBgColor="bg-saitBlack" hoverTextColor="text-saitDarkRed"/>
                            </div>

                            <div>
                                <ActionButton title="Delete" onClick={handleDelete} type="button" icon={DeleteRoundedIcon}
                                textColor="text-saitDarkRed" borderColor="border-saitDarkRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>  
                            </div>
                        </div>
                    )}                                 
                </form>      
                <ArticleDeleteModal     
                    articleId={articleObject?.article_id} 
                    openDeleteModal={openDeleteModal} 
                    handleDeleteModalClose={handleDeleteModalClose}        
                    closeArticleEditor={closeArticleEditor}    
                    reFetchArticles={reFetchArticles}         
                />
                <AudienceSelectionModal 
                    openAudienceSelectionModal={openAudienceSelectionModal}
                    setOpenAudienceSelectionModal={setOpenAudienceSelectionModal}
                    saveAudienceCriteria={saveAudienceCriteria}
                    currentAudienceCriteria={audienceCriteria}
                    setShowAccordion={setShowAccordion}
                />
            </section>
            
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>  
        </main>
    );
}

export default ArticleEditor;



const formStyling = {
    labelStyling: "text-sm font-light text-saitBlack",
    inputStyling: "font-light w-full px-3 p-2 mb-3 border border-gray-400 bg-saitWhite mt-1 rounded-xl focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent",
    errorStyle: "text-red-500 text-sm",
}

const audienceInput = "font-light w-full h-[3.3rem] px-3 p-2 border border-gray-400 bg-saitWhite mt-1 rounded-xl focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent";
