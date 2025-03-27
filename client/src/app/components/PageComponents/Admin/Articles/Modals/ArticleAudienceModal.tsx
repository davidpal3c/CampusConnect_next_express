import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type ArticleAudienceModalProps = {
    articleAudience: any;
    openArticleAudienceModal: boolean;
    handleArticleAudienceModalClose: () => void;
}

export default function ArticleAudienceModal({ articleAudience, openArticleAudienceModal, handleArticleAudienceModalClose }: ArticleAudienceModalProps) {
    return (
        <Modal 
            open={openArticleAudienceModal} 
            onClose={handleArticleAudienceModalClose} 
            aria-labelledby="article-audience-modal" 
            aria-describedby="article-audience-modal"
            id="article-audience-modal"
            BackdropProps={{
                sx: { backgroundColor: "rgba(0, 0, 0, 0.3)" }  
            }}
        >
            <Box sx={modalStyle}>
                <div className="flex flex-col items-center justify-center p-4 my-2">    
                    <p className="text-center">Are you sure you want to delete</p>
                    
                    <p className="text-center italic text-sm text-red-600 mt-2">( This operation can't be undone!! )</p>            
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