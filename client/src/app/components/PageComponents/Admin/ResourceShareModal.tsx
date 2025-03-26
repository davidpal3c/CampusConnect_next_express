
import React, { useState } from 'react';    
// import ActionButton from "@/app/components/Buttons/ActionButton";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ActionButton from '../../Buttons/ActionButton';
import ResourceShare from './ResourceShare';

type ShareModalProps = {
    resourceUrl: string;
    title: string;
    openShareModal: boolean;
    handleShareModalOpen: () => void;
    handleShareModalClose: () => void;
}

export default function ShareModal({ resourceUrl, title, openShareModal, handleShareModalOpen, handleShareModalClose }: ShareModalProps) {
    
    return(
        <Modal 
            open={openShareModal} 
            onClose={handleShareModalClose} 
            aria-labelledby="delete-article-modal" 
            aria-describedby="delete-article-modal-description"
            id="delete-article-modal"
            BackdropProps={{
                sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" }  
            }}
        >
            <Box sx={modalStyle}>
                <div className="flex flex-col items-center justify-center p-4 my-2">    
                    <ResourceShare 
                        resourceUrl={resourceUrl} 
                        title={`${title}-SAIT`}
                    />
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