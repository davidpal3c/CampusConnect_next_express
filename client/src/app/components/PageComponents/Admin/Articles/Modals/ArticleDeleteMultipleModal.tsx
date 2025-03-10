import React, { useState, useEffect, use } from 'react';    
import ActionButton from "@/app/components/Buttons/ActionButton";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
import { set } from 'react-hook-form';

type ArticleDeleteModalProps = {
    articleIds: string[];
    articlesData: any;
    openDeleteModal: boolean;

    handleDeleteModalClose: () => void;
    closeArticleEditor?: any;
    noEditor?: boolean
    reFetchArticles?: any;
};


export default function ArticleDeleteMultipleModal({ articlesData, articleIds, openDeleteModal, handleDeleteModalClose, closeArticleEditor, noEditor, reFetchArticles }: ArticleDeleteModalProps) {

    const processDeleteArticle = async (articleIds: string[]) => {
        try {
            console.log("Article Ids - pre-Fetch: ", articleIds);
            
            if (articleIds.length === 0) {
                toast.error("No articles selected for deletion.");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ articleIds: articleIds }),
                
            });       

            const data = await response.json();
            console.log("Data: ", data);

            if (!response.ok) {
                const errorData = data;
                toast.error(errorData.message || "An error occurred deleting articles.");
                return;
            }

            toast.success(data.message);      
            if(reFetchArticles) reFetchArticles();
        } catch (error) {
            toast.error(`Unknown error occurred deleting article! : ` + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };    

    const submitDelete = async () => {
        await processDeleteArticle(articleIds);
        handleDeleteModalClose();

        if(noEditor) return;            // only close editor if noEditor is false (using component with editor)
        closeArticleEditor();
    };
    

    return(
        <Modal 
            open={openDeleteModal} 
            onClose={handleDeleteModalClose} 
            aria-labelledby="delete-article-modal" 
            aria-describedby="delete-article-modal-description"
            id="delete-article-modal"
            BackdropProps={{
                sx: { backgroundColor: noEditor ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.5)" }  
            }}
        >
            <Box sx={modalStyle}>
                <div className="flex flex-col items-center justify-center p-4 my-2">    
                    <p className="text-center">Are you sure you want to delete {articleIds.length > 1 ? ('these articles?') : ('this article?')}</p>
                    <div className="flex flex-col items-center justify-center w-full mt-4">
                        {articleIds.length > 1 ? <p className="text-center font-semibold italic text-sm mb-2">You are about to delete <span className='text-lg text-red-500'>{articleIds.length}</span> articles.</p> : null}    
                        {articlesData.map((data, index) => {
                            return (
                                <p key={index} className="text-center italic text-sm text-color-500">
                                    {`Article Title: ${data.title}`}
                                </p>
                            );
                        })}
                    </div>
                    <p className="text-center italic text-sm text-red-600 mt-2">( This operation can't be undone!! )</p>            
                    <div className="flex items-center justify-center w-full space-x-5 mt-4">
                    <ActionButton title="Delete" onClick={submitDelete}
                                textColor="text-saitRed" borderColor="border-saitRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>                            
                    <ActionButton title="Cancel" onClick={handleDeleteModalClose}
                                textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"/>                                                          
                    </div>
                </div>
            </Box>   
        </Modal>    
    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',    // default value set by theme in the Modal component
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: 2,
    backgroundColor: "#f7f7f7",
  };