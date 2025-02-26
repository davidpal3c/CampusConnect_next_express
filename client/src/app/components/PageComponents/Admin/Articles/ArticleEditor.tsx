"use client"

import React, { useState, useEffect, useRef } from 'react';
import { set, useForm } from "react-hook-form";
import ActionButton from "@/app/components/Buttons/ActionButton";
import { getTodayDate, formatToDateOnly } from "@/app/_utils/dateUtils";
import { useUserData } from '@/app/_utils/userData-context';
import ArticleDeleteModal from './ArticleDeleteModal';
import RichTextEditor from './RichTextEditor';

import { toast } from "react-toastify";

//mui
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Value } from '@radix-ui/react-select';

type CreateArticleProps = { 
    closeOnClick: any,
    articleTypes: string[], 
    action: string,
    articleObject?: any,
    closeArticleEditor: any,
    reFetchArticles?: any,
};


const ArticleEditor: React.FC<CreateArticleProps> = ({ closeOnClick, articleTypes, action, articleObject, closeArticleEditor, reFetchArticles }) => {

    const { userData } = useUserData();
    const [ userFullName, setUserFullName ] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [contentMode, setContentMode] = useState("simplified");   
    const [articleContent, setArticleContent] = useState("");

    // image upload
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [backdrop, setBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLoaderOpen = () => {
        setBackdrop(true);
        setLoading(true);
    }

    const handleLoaderClose = () => {
        setBackdrop(false);
        setLoading(false);
        closeArticleEditor();
    }

    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);
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
                type: articleObject.type || "",
                audience: articleObject.audience || "",
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


    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

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

    const handleImageUpload = async(file: File) => {
        if (!file) {
            return null;
        }

        const formData = new FormData();
        formData.append("image", file);

        // const base64image = await fileToBase64(file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            });

            const responseData = await response.json();

            if(!response.ok) {
                console.log("Error uploading image: ", responseData);
                toast.error("An error occurred uploading image");
                return;
            }

            // console.log("Image upload response: ", responseData)
            if (responseData.success) {
                return responseData.data.url; // Return the image URL
            } else {
                console.log(responseData.error?.message || 'Image upload failed');
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("An error occurred uploading image");
            // return null;
        }
        // finally {
        //     // set loader to false
        // }
    }

    const submitForm = async (data: any, type:  "publish" | "save-preview" | "update" ) => {

        handleLoaderOpen();
        // console.log("Type: ", type);
        const authorName = data.author.trim() || userFullName;
        const selectedDate = data.datePublished || getTodayDate();
        const formattedDate = new Date(selectedDate).toISOString();
        const content = contentMode === "richText" ? articleContent : data.content;

        let imageUrl = data.imageUrl;

        if (data.imageUrl && data.imageUrl[0] instanceof File) {        //only runs if a new image is uploaded
            imageUrl = await handleImageUpload(data.imageUrl[0]);
            if (!imageUrl) {
                toast.error('Failed to upload image');
                return; 
            }
        }

        const articleData = {
            title: data.title,
            datePublished: formattedDate,
            type: data.type,
            audience: data.audience,
            tags: data.tags,
            content: content,
            // content: data.content ? data.content : articleContent,
            status: type === "update" ? data.status : type === "publish" ? "Published" : "Draft",
            author: authorName,
            imageUrl: imageUrl,
        }

        console.log("Entered Article Data: ", articleData);

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

    return(
        <main className="h-full w-full">
            <header className="flex justify-between items-center bg-white p-5 rounded-lg mb-6 shadow-md">
                {action === "Create" ? 
                    <h1 className="font-semibold">Create Article</h1> 
                    : <h1 className="font-semibold">Edit Article</h1>
                }
                <Tooltip title="Close Editor" arrow>
                    <button onClick={closeOnClick}>
                        <CloseIcon />
                    </button>
                </Tooltip>
            </header>
            <section className="relative flex items-center bg-white p-4 rounded-lg mb-6 shadow-md">
                {/* <form onSubmit={handleSubmit(action === "Create" ? handleCreate : handleUpdate) } className="flex flex-row flex-wrap w-full"> */}
                <form onSubmit={handleSubmit((data) => submitForm(data, ))} className="flex flex-row flex-wrap w-full">
                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">

                        {/* title */}
                        <div>
                            <label className={formStyling.labelStyling} htmlFor="title">Title</label>
                            <input className={formStyling.inputStyling} type="text" id="title" 
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
                                    isImage: (value: FileList) => {
                                        if (!value || value.length === 0 || typeof value === 'string') return true;
                                        
                                        const file = value[0];
                                        // if (!file) return false;
                                        return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type) || 'Only image files (jpeg, png, gif) are allowed';
                                    },
                                    isSizeValid: (value: FileList) => {
                                        if (!value || typeof value === 'string') return true;

                                        const file = value[0];
                                         // if (!file) return 'Please select a file';
                                        return file.size <= 5 * 1024 * 1024 * 6 || 'File size must not exceed 32 MB';
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
                                <label className={formStyling.labelStyling} htmlFor="author">Author</label>
                                <input className={formStyling.inputStyling} type="text" id="author" placeholder={userFullName || "Enter Author's Name" }
                                    {...register("author")}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={formStyling.labelStyling} htmlFor="author">Author</label>
                                    <input className={formStyling.inputStyling} type="text" id="author" placeholder={userFullName || "Enter Author's Name" }
                                        {...register("author")}
                                    />
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
                            <label className={formStyling.labelStyling} htmlFor="Audience">Audience (*select modal)</label>
                            <input className={formStyling.inputStyling} type="audience" id="audience" 
                                // {...register("audience", { required: 'Audience is Required' })}
                            />
                            {/* {errors.audience && <p className={formStyling.errorStyle}>{errors.audience.message}</p>} */}
                        </div>
                        <div>
                            <label className={formStyling.labelStyling} htmlFor="tags">Tags</label>
                            <input className={formStyling.inputStyling} type="text" id="tags"
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
                                    maxLength: { value: 15000, message: 'Content should not exceed 6000 characters' }
                                })}
                            />
                            {errors.content && <p className={formStyling.errorStyle}>{errors.content.message}</p>}
                            
                        </div>                            
                    )}

                    {action === "Create" ? (
                        <div className="flex flex-row items-center justify-between w-full space-x-5">
                            <ActionButton title="Publish" onClick={handleSubmit((data) => submitForm(data, "publish"))}    
                            textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite" />
                            <ActionButton title="Save & Preview" onClick={handleSubmit((data) => submitForm(data, "save-preview"))}
                                textColor="text-saitDarkRed" borderColor="border-saitDarkRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>  
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-between w-full">
                            <div className=""></div>

                            <div className="flex flex-row items-center space-x-4">
                                <ActionButton title="Submit Update" onClick={handleSubmit((data) => submitForm(data, "update"))}
                                    textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"/>                            
                                <ActionButton title="Cancel" onClick={closeOnClick} type="button" 
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
    inputStyling: "font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent",
    errorStyle: "text-red-500 text-sm",
}
