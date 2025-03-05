import React from "react";
import ActionButton from "@/app/components/Buttons/ActionButton";
import { Box, Modal } from "@mui/material";
import { toast } from "react-toastify";

type ArticleTypeDeleteModalProps = {
    articleType: any;
    openDeleteModal: boolean;
    handleDeleteModalClose: any;
    reFetchArticleTypes?: any;
    reFetchArticleData?: any;  
};

export default function ArticleTypeDeleteModal({ articleType, openDeleteModal, handleDeleteModalClose, reFetchArticleTypes, reFetchArticleData }: ArticleTypeDeleteModalProps) {
    
    const processDeleteArticleType = async () => {
        try {
            const typeId = articleType.id;
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types/${typeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const responseData = await response.json();
            console.log("response: ", responseData);

            if (!response.ok) {
                const errorData = responseData;
                toast.error(errorData.message || "An Error occurred deleting article type.");
                return;
            }

            toast.success(responseData.message);         
            console.log("Article type deleted successfully", responseData);

            await reFetchArticleTypes();  
            await reFetchArticleData();

        } catch (error) {
            toast.error(`Unknown error occurred deleting article type! : ` + error, {
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
        await processDeleteArticleType();
        handleDeleteModalClose();
    };
    
    return(
        <Modal
            open={openDeleteModal}
            onClose={handleDeleteModalClose}
            aria-labelledby="article-types-modal"
            aria-describedby="article-types-description"
            id="article-types-modal"
            BackdropProps={{
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
            }}  
        >
            <Box sx={modalStyle} className="modal">
            <div className="flex flex-col items-center justify-center p-6 my-2 w-auto">                    
                <p className="text-center">Are you sure you want to delete this Article Type?</p>
                <p className="text-center mt-3"><span className="font-semibold text-saitBlue">Note:</span> Any current articles of this type will be assigned to <span className="italic text-saitBlue">default</span> type</p>
                <div className="flex flex-wrap items-center justify-center mt-3 bg-white p-4">
                    <div className="flex justify-between w-full">
                        <p>Type Name:</p>
                        <p className="font-semibold text-saitRed">{articleType.name}</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <p>Article Count:</p>
                        <p className="font-semibold text-saitRed">{articleType.count}</p>
                    </div>
                    
                </div>
                <p className="text-center italic text-sm text-saitDarkRed mt-2">* This operation can't be undone! *</p>              
                <div className="flex items-center justify-center w-full space-x-5 mt-4">
                    <ActionButton title="Delete" onClick={submitDelete}
                                textColor="text-saitDarkRed" borderColor="border-saitDarkRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>                            
                    <ActionButton title="Cancel" onClick={handleDeleteModalClose}
                                textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"/>                                                          
                </div>
            </div>

            </Box>
        </Modal>
    )
}


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        'xs': 360,
        'sm': 450,
        'md': 520,
        'lg': 700,
        'xl': 800,
    },
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: 2,
    backgroundColor: "#f7f7f7",
};