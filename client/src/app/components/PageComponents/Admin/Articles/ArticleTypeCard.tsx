"use client";
import React, { useState } from "react";
import ActionButton from "@/app/components/Buttons/ActionButton";
import { useForm } from "react-hook-form";
import { useArticleTypes } from "@/app/_utils/articleTypes-context";

import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "react-toastify";

type ArticleTypeCardProps = {
    articleTypeData: any
    fetchArticleData?: any
}

export default function ArticleTypeCard({ articleTypeData, fetchArticleData }: ArticleTypeCardProps) {
    const { fetchArticleTypes } = useArticleTypes();

    const [isEditTypePanelVisible, setEditTypePanelVisible] = useState<boolean>(false);
    const handleEditTypePanelOpen = () => setEditTypePanelVisible(true);
    const handleEditTypePanelClose = () => {
        setEditTypePanelVisible(false);
        // reset();
    };

     const { register, handleSubmit, formState: { errors, touchedFields, isSubmitted }, reset } = useForm({
        defaultValues: {
            editArticleType: "",
        },
        mode: "onSubmit"
    });

    const handleEditArticleType = async (articleData: any) => {
        handleEditTypePanelOpen();
    };

    const processEditArticleType = async (data: any) => {
        const typeName = articleTypeData.typeName;
        const newTypeName = data.editArticleType;
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types/${typeName}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newTypeName: newTypeName}),
                credentials: "include", 
            });
            
            const responseData = await response.json();

            if(!response.ok) {
                if (response.status === 409) {
                    toast.error(responseData.message || "An article type with this name already exists.");
                    return;
                } else {
                    toast.error(responseData.message || "An error occurred while updating the article type.");
                    return;
                }
            }

            toast.success("Article type updated successfully");
            await fetchArticleData()
            await fetchArticleTypes();

        } catch (error: any) {
            toast.error("Error updating article type", error);
        } finally {
            handleEditTypePanelClose();
        }
    }

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!isEditTypePanelVisible ? (
                    // Card Content
                    <motion.div
                        key="card"
                        initial={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="grid grid-cols-3 gap-4 mt-2 bg-white shadow-md border border-transparent p-2 rounded-lg w-full"
                    >
                        <div className='flex flex-wrap items-center justify-start'>
                            <h1 className="ml-4 text-md font-semibold truncate">{articleTypeData?.typeName || ""}</h1>
                        </div>
                        <div className='flex items-center justify-center'>
                            <h1 className="text-md font-semibold">{articleTypeData?.count}</h1>
                        </div>
                        <div className='flex items-center justify-end w-full'>
                            <Tooltip title="Edit Type" arrow>
                                <IconButton onClick={() => handleEditArticleType(articleTypeData)}
                                    sx={{
                                        color: '#666666',
                                        '&:hover': {
                                            color: '#5c2876',
                                            '& .MuiSvgIcon-root': {
                                                color: '#5c2876',
                                            },
                                        },
                                    }}
                                >
                                    <EditRoundedIcon sx={{ fontSize: 23, color: '#666666' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Type" arrow>
                                <IconButton onClick={() => console.log("Delete Article Type:", articleTypeData.typeName)}
                                    sx={{
                                        color: '#666666',
                                        '&:hover': {
                                            color: '#932728',
                                            '& .MuiSvgIcon-root': {
                                                color: '#932728',
                                            },
                                        },
                                    }}
                                >
                                    <DeleteRoundedIcon sx={{ fontSize: 23, color: '#666666' }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </motion.div>
                ) : (
                    // Edit Form
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-row items-center justify-between w-full mt-[0.4rem] bg-white shadow-md border border-transparent p-2 rounded-lg"
                    >
                        <form className="flex flex-row items-center justify-between w-full" onSubmit={handleSubmit((data) => processEditArticleType(data))}>
                            <input
                                type="text"
                                className="w-3/5 h-10 px-3 border border-gray-300 rounded-xl bg-saitWhite"
                                placeholder={articleTypeData?.typeName || ""}
                                {...register("editArticleType", { required: true })}
                            />
                            <ActionButton
                                title="Submit Edit"
                                type="submit"
                                hoverBgColor="bg-saitBlue"
                                borderColor="border-saitBlue"
                                textColor="text-saitBlue"
                                // onClick={handleSubmit(processEditArticleType)}
                            />
                        </form>
                        <Tooltip title="Cancel" arrow>
                            <button onClick={handleEditTypePanelClose} className={customButton}>
                                <CloseRoundedIcon sx={{
                                    fontSize: '1.3rem', 
                                    transition: 'color 300ms ease-in',
                                    transitionDelay: '75ms', 
                                    '&:hover': {
                                        color: '#f7f7f7', 
                                    },
                                }} />
                            </button>
                        </Tooltip>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const customButton = "group text-saitDarkRed border border-saitDarkRed bg-saitWhite font-normal w-12 h-9 flex ml-3 flex-row items-center justify-center h-9 py-2 px-4 rounded-full hover:bg-saitDarkRed hover:border-saitGray hover:text-white hover:shadow-2xl active:scale-75 transition delay-150 transition-colors transition-transform duration-300 ease-in-out";




