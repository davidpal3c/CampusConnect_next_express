import React, { useState } from 'react';    
// import ActionButton from "@/app/components/Buttons/ActionButton";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";

type ArticleTypesModalProps = {
    // articleId: string;
    // openDeleteModal: boolean;

    // handleDeleteModalClose: () => void;
    // closeArticleEditor?: any;
    // noEditor?: boolean
    // reFetchArticles?: any;
};


export default function ArticleTypesModal({  }: ArticleTypesModalProps) {
    
    // return(
    //     <Modal 
    //         open={openDeleteModal} 
    //         onClose={handleDeleteModalClose} 
    //         aria-labelledby="delete-article-modal" 
    //         aria-describedby="delete-article-modal-description"
    //         id="delete-article-modal"
    //         BackdropProps={{
    //             sx: { backgroundColor: noEditor ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.5)" }  
    //         }}
    //     >
    //         <Box sx={modalStyle}>
    //             <div className="flex flex-col items-center justify-center p-4 my-2">    
    //                 <p className="text-center">Are you sure you want to delete this article?</p>
    //                 <p className="text-center">Article ID: {articleId}</p>
    //                 <p className="text-center italic text-sm">This operation can't be undone!</p>            
    //                 <div className="flex items-center justify-center w-full space-x-5 mt-4">
    //                 <ActionButton title="Delete" onClick={submitDelete}
    //                             textColor="text-saitDarkRed" borderColor="border-saitDarkRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>                            
    //                 <ActionButton title="Cancel" onClick={handleDeleteModalClose}
    //                             textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"/>                                                          
    //                 </div>
    //             </div>
    //         </Box>   
    //     </Modal>    
    // );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',    // default value set by theme in the Modal component
    border: '1px solid #000',
    borderRadius: 8,
    boxShadow: 2,
    backgroundColor: "#f7f7f7",
  };