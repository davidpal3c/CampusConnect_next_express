import React, { useEffect, useState } from 'react';    
// import ActionButton from "@/app/components/Buttons/ActionButton";
import ArticleTypeCard from './ArticleTypeCard';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
import { ActionCodeOperation } from 'firebase/auth';
import ActionButton from '@/app/components/Buttons/ActionButton';
import { useArticleTypes } from '@/app/_utils/articleTypes-context';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Tooltip } from '@mui/material';

type ArticleTypesModalProps = {
    openArticleTypesModal: boolean;
    setOpenArticleTypesModal: any;
};


export default function ArticleTypesModal({ openArticleTypesModal, setOpenArticleTypesModal }: ArticleTypesModalProps) {

    const { articleTypesData, fetchArticleTypes } = useArticleTypes();

    const handleArticleTypesModalClose = () => {
        console.log("on close handler");
        setOpenArticleTypesModal(false);
    }

    useEffect(() => {
        console.log("fetching article types: ", articleTypesData);
    }, []);

    // fetch article counts by type from the server and pass to ArticleTypeCard as prop

    return(
        <Modal 
            open={openArticleTypesModal} 
            onClose={handleArticleTypesModalClose} 
            aria-labelledby="article-types-modal" 
            aria-describedby="article-types-description"
            id="article-types-modal"
            BackdropProps={{
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }  
            }}
        >
            <Box sx={modalStyle}>
                <div className="flex flex-col items-center justify-center p-6 my-2 w-auto">    
                    <div className="flex flex-row items-center justify-between w-full">
                        <div></div>
                        <div>
                            <h1 className="text-xl font-bold">Article Types</h1>
                        </div>
                        <button onClick={handleArticleTypesModalClose} className="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-saitBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
   
                    {/* Table Container */}
                    <div className="flex flex-col items-center justify-center w-full mt-4 bg-saitWhite">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 gap-4 bg-saitLightBlue shadow-md border border-transparent p-4 rounded-lg w-full">
                            <div className="flex items-center justify-center">
                                <h1 className="text-lg font-semibold text-saitWhite">Type</h1>
                            </div>
                            <div className="flex items-center justify-center">
                                <h1 className="text-lg font-semibold text-saitWhite">Article Count</h1>
                            </div>
                            <div className="flex items-center justify-center">
                                <h1 className="text-lg font-semibold text-saitWhite">Actions</h1>
                            </div>
                        </div>

                        {/* Table Body */}
                        {/* <ArticleTypeCard /> */}
                        {articleTypesData && articleTypesData.length > 0 && articleTypesData.map((typeObj: any) => (
                                <ArticleTypeCard key={typeObj.type_id} articleTypeData={typeObj} />
                        ))}
                        <div className="flex items-center justify-end w-full mt-5">
                            <Tooltip title="Add New Type" arrow>
                                <div>
                                    <ActionButton   
                                        title="Add"
                                        onClick={() => console.log("add article type")}
                                        hoverBgColor="bg-saitPurple"
                                        borderColor="border-saitPurple"
                                        textColor="text-saitPurple"
                                        icon={<AddRoundedIcon sx={{ fontSize: 23 }} />}
                                    />
                                </div>
                            </Tooltip>
                            {/* <ActionButton   
                                title="Save Changes"
                                onClick={() => console.log("add article type")}
                                hoverBgColor="bg-saitBlue"
                                borderColor="border-saitBlue"
                                textColor="text-saitBlue"
                            /> */}
                        </div>
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
    width: 500,
    bgcolor: 'background.paper',    // default value set by theme in the Modal component
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: 2,
    backgroundColor: "#f7f7f7",
  };

